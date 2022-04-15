using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace BLL.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IMessageRepository MessageRepository { get; }
        ILikesRepository LikesRepository { get; }
        ICommentRepository CommentRepository { get; }
        IFollowsRepository FollowsRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}