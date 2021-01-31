using API.Data;
using API.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class OnlineTracker
    {
        private static readonly Dictionary<int, string> OnlineUsers = new Dictionary<int, string>();
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public OnlineTracker(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        public Task UserConnected(int userId, string connectionId)
        {
            lock (OnlineUsers)
            {
                if (OnlineUsers.ContainsKey(userId))
                {
                    OnlineUsers[userId]=connectionId;
                }
                else
                {
                    OnlineUsers.Add(userId,  connectionId );
                }
            }

            return Task.CompletedTask;
        }

        public async Task<Task> UserDisconnected(int userId, string connectionId)
        {
            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(userId)) return Task.CompletedTask;

                    OnlineUsers.Remove(userId);
            }
            var result = Task.FromResult(OnlineUsers);
            if (result.IsCompletedSuccessfully)
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var _userRepository = scope.ServiceProvider.GetService<IUserRepository>();
                var user = await _userRepository.GetUserByIdAsync(userId);
                _userRepository.RemoveUser(user);
                var resultDbContext = await _userRepository.SaveAllAsync();
                if (!resultDbContext) return Task.FromResult<bool>(resultDbContext);
            }

            return Task.CompletedTask;
        }

        public Task<int[]> GetOnlineUsers()
        {
            int[] onlineUsers;
            lock (OnlineUsers)
            {
                onlineUsers = OnlineUsers.OrderBy(k => k.Key).Select(k => k.Key).ToArray();
            }
            return Task.FromResult(onlineUsers);
        }

        public string GetConnectionId(int userId)
        {
            lock (OnlineUsers)
            {
                return OnlineUsers[userId];
            }
        }

        
    }
}
