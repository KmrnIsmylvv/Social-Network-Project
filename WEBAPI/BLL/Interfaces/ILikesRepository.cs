using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Utils;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}