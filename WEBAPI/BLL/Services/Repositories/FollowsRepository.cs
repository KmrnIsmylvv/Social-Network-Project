using System.Linq;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Extensions;
using BLL.Helpers.Utils;
using BLL.Interfaces;
using DAL.Data;
using EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic.CompilerServices;

namespace BLL.Services.Repositories
{
    public class FollowsRepository : IFollowsRepository
    {
        private readonly DataContext _context;

        public FollowsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserFollowing> GetUserFollow(int observerId, int targetId)
        {
            return await _context.UserFollowings.FindAsync(observerId, targetId);
        }

        public async Task<AppUser> GetUserWithFollows(int userId)
        {
            return await _context.Users
                .Include(u => u.Followings)
                .FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<PagedList<FollowDto>> GetUserFollows(FollowsParams followsParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var follows = _context.UserFollowings.AsQueryable();

            if (followsParams.Predicate == "following")
            {
                follows = follows.Where(follow => follow.ObserverId == followsParams.UserId);
                users = follows.Select(follow => follow.Target);
            }

            if (followsParams.Predicate == "followers")
            {
                follows = follows.Where(follow => follow.TargetId == followsParams.UserId);
                users = follows.Select(follow => follow.Observer);
            }

            var followers = users.Select(user => new FollowDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Id = user.Id
            });

            return await PagedList<FollowDto>.CreateAsync(followers,
                followsParams.PageNumber, followsParams.PageSize);
        }
    }
}