using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Interfaces;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;

namespace BLL.Services
{
    public class GoogleAuthService : IGoogleAuthService
    {
        private readonly IConfiguration _googleSettings;

        public GoogleAuthService(IConfiguration config)
        {
            _googleSettings = config.GetSection("GoogleAuthSettings");
        }

        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(GoogleAuthDto googleAuthDto)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() {_googleSettings.GetSection("clientId").Value}
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(googleAuthDto.IdToken, settings);
                return payload;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}