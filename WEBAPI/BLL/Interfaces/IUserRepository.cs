using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Utils;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserById(int id);
        Task<AppUser> GetUserByUsername(string username);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<MemberDto> GetMemberAsync(string username);
    }
}