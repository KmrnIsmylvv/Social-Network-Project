using System;
using System.Reflection.Metadata.Ecma335;

namespace BLL.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
        public string Username { get; set; }
        public string KnownAs { get; set; }
        public string PhotoUrl { get; set; }
    }
}