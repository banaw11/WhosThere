using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ChatRepository : IChatRepository
    {
        private readonly DataContext _context;

        public ChatRepository(DataContext context)
        {
            _context = context;
        }

        public Group CreateGroup(string callerConnectionId, string otherConnectionId, int callerId, int otherId)
        {
            var group = new Group();
            var name = GetGroupName(callerId, otherId);
            if(!IfGroupExist(name))
            {
                group.CallerConnectionID = callerConnectionId;
                group.OtherConnectionID = otherConnectionId;
                group.Name = name;
            }

            _context.Groups.Add(group);
            return group;
        }

        public void DeleteGroup(Group group)
        {
            _context.Groups.Remove(group);
        }

        public async Task<Group> GetGroupByNameAsync(string groupName)
        {
            return await _context.Groups.FindAsync(groupName); 
        }

        public string GetGroupName(int callerId, int otherId)
        {
            var stringCompare = String.CompareOrdinal(callerId.ToString(), otherId.ToString()) < 0;
            return stringCompare ? $"{callerId}-{otherId}" : $"{otherId}-{callerId}";
        }


        public bool IfGroupExist(string groupName)
        {
            return _context.Groups.Any(g => g.Name == groupName);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}
