using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using BLL.DTOs;
using BLL.Helpers.Utils;
using BLL.Interfaces;
using BLL.Services;
using DAL.Data;
using EntityLayer.Entities;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.ObjectPool;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IEmailSender _emailSender;
        private readonly IConfiguration _config;
        private readonly IGoogleAuthService _googleAuthService;
        private readonly HttpClient _httpClient;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
            ITokenService tokenService, IMapper mapper, IEmailSender emailSender, IConfiguration config,
            IGoogleAuthService googleAuthService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _emailSender = emailSender;
            _config = config;
            _googleAuthService = googleAuthService;
            _httpClient = new HttpClient
            {
                BaseAddress = new System.Uri("https://graph.facebook.com")
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            var user = _mapper.Map<AppUser>(registerDto);

            user.UserName = registerDto.Username.ToLower();

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            // Email confirmation
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var param = new Dictionary<string, string>
            {
                {"token", token},
                {"email", user.Email}
            };
            var callBack = QueryHelpers.AddQueryString(registerDto.ClientURI, param);

            var message = new EmailMessage(new string[] {user.Email}, "Email Confirmation token",
                callBack, null);
            await _emailSender.SendEmailAsync(message);

            // Roles
            var roleResult = await _userManager.AddToRoleAsync(user, "Member");

            if (!roleResult.Succeeded) return BadRequest(result.Errors);

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(u => u.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid Username or Password");

            if (!await _userManager.IsEmailConfirmedAsync(user))
                return Unauthorized("Email is not confirmed");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized();

            return new UserDto
            {
                Username = user.UserName,
                Token = await _tokenService.CreateToken(user),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                KnownAs = user.KnownAs,
                Gender = user.Gender
            };
        }

        [HttpPost("GoogleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleAuthDto googleAuthDto)
        {
            var payload = await _googleAuthService.VerifyGoogleToken(googleAuthDto);

            if (payload == null) return BadRequest("Invalid Google Authentication");

            var info = new UserLoginInfo(googleAuthDto.Provider, payload.Subject, googleAuthDto.Provider);

            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);


            if (user == null)
            {
                user = new AppUser {Email = payload.Email, UserName = payload.Name};
                await _userManager.CreateAsync(user);

                await _userManager.AddToRoleAsync(user, "Member");
                await _userManager.AddLoginAsync(user, info);
            }
            else
            {
                await _userManager.AddLoginAsync(user, info);
            }

            // if (user == null) return BadRequest("Invalid Google Authentication");

            var token = await _tokenService.CreateToken(user);

            return Ok(new AuthResponseDto {Username = user.UserName,Token = token, IsAuthSuccessful = true});
        }

        [HttpPost("fbLogin")]
        public async Task<ActionResult<UserDto>> FacebookLogin(string accessToken)
        {
            var fbVerifyKeys = _config["Facebook:AppId"] + "|" + _config["Facebook:AppSecret"];

            var verifyToken = await _httpClient
                .GetAsync($"debug_token?input_token={accessToken}&access_token={fbVerifyKeys}");

            if (!verifyToken.IsSuccessStatusCode) return Unauthorized();

            var fbUrl = $"me?access_token={accessToken}&fields=name,email,picture.width(100).height(100)";

            var response = await _httpClient.GetAsync(fbUrl);

            if (!response.IsSuccessStatusCode) return Unauthorized();

            var fbInfo = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());

            var username = (string) fbInfo.id;

            var user = await _userManager.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(u => u.UserName == username);

            if (user != null) return await CreateUserObject(user);

            user = new AppUser
            {
                KnownAs = (string) fbInfo.name,
                Email = (string) fbInfo.email,
                UserName = (string) fbInfo.id,
                Photos = new List<Photo>
                {
                    new Photo
                    {
                        Id = fbInfo.id,
                        Url = fbInfo.picture.data.url,
                        IsMain = true
                    }
                }
            };

            user.EmailConfirmed = true;

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return BadRequest("Problem creating user account");

            return await CreateUserObject(user);
        }

        private async Task<UserDto> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                KnownAs = user.KnownAs,
                PhotoUrl = user?.Photos?.FirstOrDefault(p => p.IsMain)?.Url,
                Token = await _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        [HttpGet("EmailConfirmation")]
        public async Task<IActionResult> EmailConfirmation([FromQuery] string email, [FromQuery] string token)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null) return BadRequest("Invalid Email Confirmation Request");

            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);

            if (!confirmResult.Succeeded) return BadRequest("Invalid Email Confirmation Request");

            return Ok();
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto forgotPasswordDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);

            if (user == null) return BadRequest("Invalid Request");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var param = new Dictionary<string, string>
            {
                {"token", token},
                {"email", forgotPasswordDto.Email}
            };

            var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientUri, param);

            var message = new EmailMessage(new string[] {user.Email}, "Reset password token", callback, null);

            await _emailSender.SendEmailAsync(message);

            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);

            if (user == null) return BadRequest("Invalid Request");

            var resetPasswordResult =
                await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.Password);

            if (!resetPasswordResult.Succeeded)
            {
                var errors = resetPasswordResult.Errors.Select(e => e.Description);

                return BadRequest(new {Errors = errors});
            }

            return Ok();
        }
    }
}