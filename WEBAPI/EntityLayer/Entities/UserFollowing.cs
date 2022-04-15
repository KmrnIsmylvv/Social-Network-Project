namespace EntityLayer.Entities
{
    public class UserFollowing
    {
        public int ObserverId { get; set; }
        public AppUser Observer { get; set; }
        public int TargetId { get; set; }
        public AppUser Target { get; set; }
    }
}