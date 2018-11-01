using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Web.Interfaces;
using Web.ViewModels;

namespace Web.Controllers
{
    [Route("api/players")]
    public class PlayerController : Controller
    {
        public IPlayerService PlayerService { get; }

        public PlayerController(IPlayerService playerService)
        {
            this.PlayerService = playerService;
        }

        [HttpGet]
        public async Task<List<Player>> AllPlayers([FromQuery] int budget = 100)
        {
            return await this.PlayerService.GetAllPlayersAsync(budget);
        }
    }
}