using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void AddUser(AppUser user);
        void AddGroupName(string groupName, int callerId, int otherId);
        void CleanGroupName(int callerId);
        void Update(AppUser user);
        void RemoveUser(AppUser user);
        void ChangStatus(AppUser user, bool status);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByGroupNameAsync(string groupName, int id);
        Task<IEnumerable<AppUser>> GetUsersByParamsAsync(AppUser user);
        
    }
}