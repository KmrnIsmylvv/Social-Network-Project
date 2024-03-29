﻿using BLL.Helpers.Utils;
using BLL.Interfaces;
using BLL.Services;
using BLL.Services.Repositories;
using BLL.SignalR;
using DAL.Data;
using EntityLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BLL.Helpers.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddSingleton<PresenceTracker>();

            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IPhotoService, PhotoService>();
            services.AddScoped<IGoogleAuthService, GoogleAuthService>();
            services.AddScoped<LogUserActivity>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            var emailConfig = config
                .GetSection("EmailConfiguration")
                .Get<EmailConfiguration>();
            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}