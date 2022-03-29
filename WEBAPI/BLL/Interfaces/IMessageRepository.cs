using System.Collections.Generic;
using System.Threading.Tasks;
using BLL.DTOs;
using BLL.Helpers.Utils;
using CloudinaryDotNet.Actions;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername);
        Task<bool> SaveAllAsync();
    }
}