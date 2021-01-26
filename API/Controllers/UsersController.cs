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
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpGet]
        public async Task<ActionResult<int>> GetQuantityOfUsers()
        {
            var users = await _userRepository.GetUsersAsync();

            return Ok(users.ToList().Count);
        }
    }
}