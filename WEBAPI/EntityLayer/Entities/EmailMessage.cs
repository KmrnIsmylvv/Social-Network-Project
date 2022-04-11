using Microsoft.AspNetCore.Http;
using MimeKit;
using System.Collections.Generic;
using System.Linq;

namespace EntityLayer.Entities

{
    public class EmailMessage
    {
        public List<MailboxAddress> To { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }

        public IFormFileCollection Attachments { get; set; }

        public EmailMessage(IEnumerable<string> to, string subject, string content, IFormFileCollection attachments)
        {
            To = new List<MailboxAddress>();

            To.AddRange(to.Select(x => new MailboxAddress("name", x)));
            Subject = subject;
            Content = content;
            Attachments = attachments;
        }
    }
}