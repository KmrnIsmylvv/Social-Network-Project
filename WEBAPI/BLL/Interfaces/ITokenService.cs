using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}