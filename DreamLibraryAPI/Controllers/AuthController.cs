using DreamLibraryAPI.Models;
using DreamLibraryAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DreamLibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        public AuthController(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existingUser = await _userRepository.GetUserByUsername(user.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists.");
            }

            await _userRepository.AddUser(user);
            return Ok();
        }

        [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] User user)
{
    var existingUser = await _userRepository.GetUserByUsername(user.Username);
    if (existingUser == null)
    {
        return Unauthorized("Invalid username or password.");
    }

    // Check if stored password is hashed
    bool isPasswordValid;
    if (existingUser.PasswordHash.Length == 64) // SHA-256 hash length
    {
        // Compare hashed passwords
        isPasswordValid = existingUser.PasswordHash == _userRepository.HashPassword(user.PasswordHash);
    }
    else
    {
        // Compare plain text passwords
        isPasswordValid = existingUser.PasswordHash == user.PasswordHash;
    }

    if (!isPasswordValid)
    {
        return Unauthorized("Invalid username or password.");
    }

    var token = "dummy-token";
    return Ok(new { Token = token, UserId = existingUser.UserId });
}
    }
}