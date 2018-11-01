using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.ViewModels;

namespace Web.Interfaces
{
    public class PlayerService : IPlayerService
    {
        public IPlayerRepository PlayerRepository { get; }

        public PlayerService(IPlayerRepository playerRepository)
        {
            this.PlayerRepository = playerRepository;
        }

        public async Task<List<Player>> GetAllPlayersAsync(int budget)
        {
            var players = await this.PlayerRepository.GetPlayersAsync();
            var playerValues = await this.PlayerRepository.GetPlayerAuctionValuesAsync(budget);

            var valuedPlayers = MergePlayerValues(players, playerValues);

            return valuedPlayers;
        }

        private List<Player> MergePlayerValues(Dictionary<int, Player> players, Dictionary<int, int> values)
        {
            foreach (var player in values)
            {
                if (players.ContainsKey(player.Key))
                {
                    players[player.Key].Value = player.Value;
                }
            }

            return players.Values.ToList();
        }
    }
}