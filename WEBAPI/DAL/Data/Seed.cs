using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("../../WEBAPI/DAL/Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();

                context.Add(user);
            }

            await context.SaveChangesAsync();
        }
    }
}