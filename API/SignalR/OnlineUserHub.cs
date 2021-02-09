using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public OnlineUserHub(OnlineTracker tracker, IUserRepository userRepository, IChatRepository chatRepository, IMapper mapper)
        {
            _tracker = tracker;
            _userRepository = userRepository;
            _chatRepository = chatRepository;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            await _tracker.UserConnected(Context.User.GetUserId(), Context.ConnectionId);
            SendOnlineUsers();
            
            await FindChatMate();
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
        public async Task FindChatMate()
        {
            waitingList = await _userRepository.GetUsersByParamsAsync(await _userRepository.GetUserByIdAsync(Context.User.GetUserId()));
            if (waitingList.Count() > 0)
            {
                var chatMate = waitingList.ElementAt((new Random()).Next(0, waitingList.Count()));
                var mate = _mapper.Map<MateDto>(chatMate);
                await Clients.Caller.SendAsync("FittedMate", mate);
                var caller = _mapper.Map<MateDto>(await _userRepository.GetUserByIdAsync(Context.User.GetUserId()));
                await Clients.Client(_tracker.GetConnectionId(chatMate.Id)).SendAsync("FittedMate", caller);
                await CreateGroup(mate.Id);
                await ChangeStatus(true, mate.Id);
            }
            else
            {
                await ChangeStatus(false);
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
        public async Task ChangeStatus(bool status, int mateId=0)
        {
            var user = await _userRepository.GetUserByIdAsync(Context.User.GetUserId());
            _userRepository.ChangStatus(user, status);
            if(mateId != 0)
            {
                var mate = await _userRepository.GetUserByIdAsync(mateId);
                _userRepository.ChangStatus(mate, status);
            }
            await _userRepository.SaveAllAsync();
        }

        public async Task ChangedParams(AppUser user, int mateId)
        {
            var mateConnection = _tracker.GetConnectionId(mateId);
            var caler = _mapper.Map<MateDto>(user);
            await Clients.Client(mateConnection).SendAsync("MateChangedParams", caler);
        }

        public async Task EndChatSession(int mateId)
        {
            var caller = await _userRepository.GetUserByIdAsync(Context.User.GetUserId());
            var mateConnection = _tracker.GetConnectionId(mateId);
            var group = await GetGroupAsync();
            if (group != null)
            {
                _userRepository.CleanGroupName(mateId);
                await _userRepository.SaveAllAsync();
                await DeleteGroup(group, caller);
                await Clients.Client(mateConnection).SendAsync("MateDisconnected");
            }

        }

    }
}
