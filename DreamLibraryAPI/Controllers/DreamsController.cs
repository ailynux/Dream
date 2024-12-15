using DreamLibraryAPI.Models;
using DreamLibraryAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DreamLibraryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DreamsController : ControllerBase
    {
        private readonly DreamRepository _dreamRepository;

        public DreamsController(DreamRepository dreamRepository)
        {
            _dreamRepository = dreamRepository;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetDreams(int userId)
        {
            var dreams = await _dreamRepository.GetDreamsByUserId(userId);
            return Ok(dreams);
        }

        [HttpPost]
        public async Task<IActionResult> AddDream([FromBody] Dream dream)
        {
            if (dream == null)
            {
                return BadRequest("Dream is null.");
            }

            var userExists = await _dreamRepository.UserExists(dream.UserId);
            if (!userExists)
            {
                return BadRequest("User does not exist.");
            }

            await _dreamRepository.AddDream(dream);
            return Ok();
        }

        [HttpPut("{dreamId}")]
        public async Task<IActionResult> UpdateDream(int dreamId, [FromBody] Dream dream)
        {
            if (dream.DreamId != dreamId)
            {
                return BadRequest("Dream ID mismatch.");
            }

            await _dreamRepository.UpdateDream(dream);
            return Ok();
        }

        [HttpDelete("{dreamId}")]
        public async Task<IActionResult> DeleteDream(int dreamId)
        {
            await _dreamRepository.DeleteDream(dreamId);
            return Ok();
        }
    }
}