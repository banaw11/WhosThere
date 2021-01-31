using API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IChatRepository
    {
        Group CreateGroup(string callerConnectionId, string otherConnectionId, int callerId, int otherId);
        bool IfGroupExist(string groupName);
        void DeleteGroup(Group group);
        Task<Group> GetGroupByNameAsync(string groupName);
        string GetGroupName(int callerId, int otherId);
        Task<bool> SaveAllAsync();
        
    }
}
