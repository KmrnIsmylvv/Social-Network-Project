namespace BLL.DTOs
{
    public class AuthResponseDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public bool IsAuthSuccessful { get; set; }
    }
}