using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace EntityLayer.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}