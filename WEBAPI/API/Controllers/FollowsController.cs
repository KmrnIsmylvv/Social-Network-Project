using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Extensions;
using BLL.Helpers.Utils;
using BLL.Interfaces;
using EntityLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class FollowsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public FollowsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost("follow/{username}")]
        public async Task<ActionResult> Follow(string username)
        {
            var observerId = User.GetUserId();
            var target = await _unitOfWork.UserRepository.GetUserByUsername(username);
            var observer = await _unitOfWork.FollowsRepository.GetUserWithFollows(observerId);

            if (target == null) return NotFound();

            if (observer.UserName == username) return BadRequest("You cannot follow yourself");

            var followingUser = await _unitOfWork.FollowsRepository.GetUserFollow(observerId, target.Id);

            if (followingUser == null)
            {
                followingUser = new UserFollowing
                {
                    ObserverId = observerId,
                    TargetId = target.Id
                };
                
            }
            else
            {
                
            }

            

            

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to follow");
        }

        [HttpPost("unfollow/{username}")]
        public async Task<ActionResult> Unfollow(string username)
        {
            var observerId = User.GetUserId();
            var target = await _unitOfWork.UserRepository.GetUserByUsername(username);
            var observer = await _unitOfWork.FollowsRepository.GetUserWithFollows(observerId);

            if (target == null) return NotFound();

            if (observer.UserName == username) return BadRequest("You cannot unfollow yourself");

            var followingUser = await _unitOfWork.FollowsRepository.GetUserFollow(observerId, target.Id);

            if (followingUser == null) return BadRequest("You already unfollow this user");

            followingUser = new UserFollowing
            {
                ObserverId = observerId,
                TargetId = target.Id
            };

            

            if (await _unitOfWork.Complete()) return Ok();

            return BadRequest("Failed to unfollow");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FollowDto>>> GetUserFollows([FromQuery] FollowsParams followsParams)
        {
            followsParams.UserId = User.GetUserId();
            var users = await _unitOfWork.FollowsRepository.GetUserFollows(followsParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}