using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async void AddGroupName(string groupName, int callerId, int otherId)
        {
            var caller = await GetUserByIdAsync(callerId);
            var other = await GetUserByIdAsync(otherId);
            caller.GroupName = groupName;
            other.GroupName = groupName;
            Update(caller);
            Update(other);
        }

        public void AddUser(AppUser user)
        {
            _context.Users.Add(user);
        }

        public void ChangStatus(AppUser user, bool status)
        {
            user.IsChatting = status;
            Update(user);
        }

        public async void CleanGroupName(int callerId)
        {
            var caller = await GetUserByIdAsync(callerId);
            caller.GroupName = "";
            Update(caller);
        }

        public async Task<AppUser> GetUserByGroupNameAsync(string groupName, int id)
        {
            return await _context.Users.Where(u => u.GroupName == groupName).Where(u => u.Id != id).SingleAsync();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersByParamsAsync(AppUser user)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.IsChatting == false);
            query = query.Where(u => u.Id != user.Id);
            query = query.Where(u => u.Gender == user.SelectedGender);
            query = query.Where(u => u.SelectedGender == user.Gender);
            query = query.Where(u => u.Location == user.Location);
            query = query.Where(u => u.MinAge >= user.MinAge);

            return await query.ToListAsync();
        }

        public  void RemoveUser(AppUser user)
        {
            _context.Users.Remove(user);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}