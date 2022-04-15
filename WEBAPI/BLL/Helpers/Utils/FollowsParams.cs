namespace BLL.Helpers.Utils
{
    public class FollowsParams: PaginationParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
    }
}