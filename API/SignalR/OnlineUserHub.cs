using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.SignalR
{
    [Authorize]
    public class OnlineUserHub : Hub
    {
        public IEnumerable<AppUser> waitingList;
        private readonly OnlineTracker _tracker;
        private readonly IUserRepository _userRepository;
        private readonly IChatRepository _chatRepository;

        public OnlineUserHub(OnlineTracker tracker, IUserRepository userRepository, IChatRepository chatRepository)
        {
            _tracker = tracker;
            _userRepository = userRepository;
            _chatRepository = chatRepository;
        }

        public override async Task OnConnectedAsync()
        {
            await _tracker.UserConnected(Context.User.GetUserId(), Context.ConnectionId);
            SendOnlineUsers();
            waitingList = await _userRepository.GetUsersByParamsAsync(await _userRepository.GetUserByIdAsync(Context.User.GetUserId()));
            FindChatMate();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var callerId = Context.User.GetUserId();
            var group = await GetGroupAsync();
            if(group != null)
            {
                var user = await _userRepository.GetUserByGroupNameAsync(group.Name, Context.User.GetUserId());
                SendDisconnectInfo(user);
                await DeleteGroup(group, user);
            }
            await _tracker.UserDisconnected(callerId, Context.ConnectionId);
            SendOnlineUsers();
            await base.OnDisconnectedAsync(exception);
        }
        private async void FindChatMate()
        {
            if (waitingList.Count() > 0)
            {
                var chatMate = waitingList.ElementAt((new Random()).Next(0, waitingList.Count()));
                await Clients.Caller.SendAsync("FittedMate", chatMate.Id);
                await Clients.Client(_tracker.GetConnectionId(chatMate.Id)).SendAsync("FittedMate", Context.User.GetUserId());
                await CreateGroup(chatMate.Id);
                await ChangeStatus(true);
            }
        }
        private async void SendDisconnectInfo(AppUser user)
        {
            var otherConnectionId = GetOtherConnectionId(user);
            await Clients.Client(otherConnectionId).SendAsync("MateDisconnected");
        }
        private async void SendOnlineUsers()
        {
            var onlineUsers = await _tracker.GetOnlineUsers();
            await Clients.All.SendAsync("GetOnlineUsers", onlineUsers);
        }
        private async Task<bool> CreateGroup(int otherId)
        {
            var callerId = Context.User.GetUserId();
            var group = _chatRepository.CreateGroup(Context.ConnectionId, _tracker.GetConnectionId(otherId), callerId, otherId);
            _userRepository.AddGroupName(group.Name, callerId, otherId);

            return await _chatRepository.SaveAllAsync() & await _userRepository.SaveAllAsync(); 
        }
        private async Task<bool> DeleteGroup(Group group, AppUser user)
        {
            _userRepository.CleanGroupName(user.Id);
            _chatRepository.DeleteGroup(group);
            return await _chatRepository.SaveAllAsync() & await _userRepository.SaveAllAsync();
        }
        private string GetOtherConnectionId(AppUser user)
        {
            return _tracker.GetConnectionId(user.Id);
        }
        private async Task<Group> GetGroupAsync()
        {
            var callerId = Context.User.GetUserId();
            var caller = await _userRepository.GetUserByIdAsync(callerId);
            return await _chatRepository.GetGroupByNameAsync(caller.GroupName);
        }

        public async Task SendMessage(MessageDto messageDto)
        {
            var user = await _userRepository.GetUserByIdAsync(Context.User.GetUserId());
            var message = new MessageObj
            {
                Message = messageDto.Message,
                Type = "text",
                Reply = false,
                Date = DateTime.Now,
                Name = user.Nick,
                Avatar = user.Avatar,
            };
            var recipientConnection = _tracker.GetConnectionId(messageDto.RecipientId);
            await Clients.Client(recipientConnection).SendAsync("GetMessage", message);
        }
        public async Task ChangeStatus(bool status)
        {
            var user = await _userRepository.GetUserByIdAsync(Context.User.GetUserId());
            _userRepository.ChangStatus(user, status);
            await _userRepository.SaveAllAsync();
        }

    }
}
