using System.Threading.Tasks;
using BLL.DTOs;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface ICommentRepository
    {
        void CreateComment(Comment comment);
        Task<Comment> GetComment(int id);
    }
}