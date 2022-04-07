using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace BLL.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILikesRepository LikesRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}