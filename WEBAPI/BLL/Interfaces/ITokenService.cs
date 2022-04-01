using System.Threading.Tasks;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}