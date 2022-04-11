using System.Threading.Tasks;
using DAL.Migrations;
using EntityLayer.Entities;

namespace BLL.Interfaces
{
    public interface IEmailSender
    {
        void SendEmail(EmailMessage emailMessage);
        Task SendEmailAsync(EmailMessage emailMessage);
    }
}