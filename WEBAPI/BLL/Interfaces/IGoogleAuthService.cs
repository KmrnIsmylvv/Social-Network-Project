using System.Threading.Tasks;
using BLL.DTOs;
using Google.Apis.Auth;

namespace BLL.Interfaces
{
    public interface IGoogleAuthService
    {
        Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(GoogleAuthDto googleAuthDto);
    }
}