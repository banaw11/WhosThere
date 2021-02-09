using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using API.SignalR;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<OnlineTracker>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository,UserRepository>();
            services.AddScoped<IChatRepository, ChatRepository>();
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
             services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });

            return services;
        }
    }
}