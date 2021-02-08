using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ITokenService _tokenService;

        public UsersController(IUserRepository userRepository, IMapper mapper, ITokenService tokenService)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _userRepository = userRepository;

        }
        
        [HttpPost("join")]
        public async Task<ActionResult<UserDto>> AddUser(JoinToChatDto joinToChatDto)
        {
            var user = _mapper.Map<AppUser>(joinToChatDto);
            _userRepository.AddUser(user);
            var result = await _userRepository.SaveAllAsync();
            if (!result) return BadRequest("Failed to join to the chat");
            return new UserDto
            {
                Id = user.Id,
                Token = _tokenService.CreateToken(user),
                Avatar = user.Avatar,
                Nick = user.Nick
            };
        }

        [HttpGet]
        public async Task<ActionResult<int>> GetQuantityOfUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            return Ok(users.ToList().Count);
        }

        [HttpGet("avatars")]
        public AvatarDto[] GetAvatars()
        {
            return LoadAvatars();
        }

        [HttpPost("change")]
        public async Task<ActionResult> ChangeUserParams(AppUser user)
        {
            _userRepository.Update(user);
            var result = await _userRepository.SaveAllAsync();
            return Ok(result);
        }

        private AvatarDto[] LoadAvatars()
        {
            AvatarDto[] avatars = new AvatarDto[9];
            for (int i = 0; i < 9; i++)
            {
                AvatarDto avatar = new AvatarDto { Id = i, Url = "https://randomuser.me/api/portraits/lego/" + i + ".jpg" };
                avatars[i] = avatar;
            }
            return avatars;
        }
    }
}