using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Utils;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface IFollowsRepository
    {
        Task<UserFollowing> GetUserFollow(int observerId, int targetId);
        Task<AppUser> GetUserWithFollows(int userId);
        Task<PagedList<FollowDto>> GetUserFollows(FollowsParams followsParams);
    }
}