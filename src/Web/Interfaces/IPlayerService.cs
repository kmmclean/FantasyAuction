using System.Collections.Generic;
using System.Threading.Tasks;
using Web.ViewModels;

namespace Web.Interfaces
{
    public interface IPlayerService
    {
        Task<List<Player>> GetAllPlayersAsync(int budget);
    }
}