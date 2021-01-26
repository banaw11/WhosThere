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
        private static readonly Dictionary<int, List<string>> OnlineUsers = new Dictionary<int, List<string>>();
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
                    OnlineUsers[userId].Add(connectionId);
                }
                else
                {
                    OnlineUsers.Add(userId, new List<string> { connectionId });
                }
            }

            return Task.CompletedTask;
        }

        public async Task<Task> UserDisconnected(int userId, string connectionId)
        {
            lock (OnlineUsers)
            {
                if (!OnlineUsers.ContainsKey(userId)) return Task.CompletedTask;

                OnlineUsers[userId].Remove(connectionId);
                if(OnlineUsers[userId].Count == 0)
                {
                    OnlineUsers.Remove(userId);
                }
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
    }
}
