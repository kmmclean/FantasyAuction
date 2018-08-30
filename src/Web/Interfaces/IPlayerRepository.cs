using System.Collections.Generic;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Web.ViewModels;

namespace Web.Interfaces
{
    public interface IPlayerRepository
    {
        Task<Dictionary<int, Player>> GetPlayersAsync();
        Task<Dictionary<int, int>> GetPlayerAuctionValuesAsync();
    }
}