﻿namespace BLL.Helpers.Utils
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }
        public string Container { get; set; } = "unread";
    }
}