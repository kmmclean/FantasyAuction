using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Web.Interfaces;
using Web.ViewModels;

namespace Web.Repositories
{
    public class PlayerRepository : IPlayerRepository
    {
        private HtmlWeb HtmlWeb { get; }

        public PlayerRepository(HtmlWeb htmlWeb)
        {
            this.HtmlWeb = htmlWeb;
        }

        public async Task<Dictionary<int, Player>> GetPlayersAsync()
        {
            var document = await this.HtmlWeb.LoadFromWebAsync("https://www.fantasypros.com/nfl/rankings/consensus-cheatsheets.php");
            var playerRows = document.DocumentNode.SelectNodes("//table[@id='rank-data']//tbody//tr[contains(@class, 'tier-row') or contains(@class, 'player-row')]");
            var currentTier = "";
            var players = new Dictionary<int, Player>();

            foreach (var playerRow in playerRows)
            {
                if (playerRow.GetClasses().Contains("tier-row"))
                {
                    currentTier = new Regex(@"\d+").Match(playerRow.FirstChild.InnerHtml).Value;
                }
                else if (playerRow.GetClasses().Contains("player-row"))
                {
                    var playerId = playerRow.GetAttributeValue("data-id", 0);
                    var playerTier = Int32.Parse(currentTier);
                    var playerRank = Int32.Parse(playerRow.SelectSingleNode(".//td").InnerHtml);
                    var playerName = playerRow.SelectSingleNode(".//td[@class='player-label']//a//span[@class='full-name']").InnerHtml;
                    var playerPosition = new Regex(@"[a-zA-Z]+").Match(playerRow.SelectSingleNode(".//td[4]").InnerHtml).Value;
                    var playerTeam = "";
                    // There is no team listed for DSTs (since the team itself is the player name.) Extract the abbreviation from the "player" name.
                    if (playerPosition == "DST")
                    {
                        playerTeam = new Regex(@"(?<=\()([A-Z]+)(?=\))").Match(playerName).Value;
                    }
                    else
                    {
                        // Free agents have a link as a direct child of this node.
                        var playerTeamNode = playerRow.SelectSingleNode(".//td[@class='player-label']//small[@class='grey']");
                        playerTeam = playerTeamNode.Descendants("a").Count() > 0 ? "FA" : playerTeamNode.InnerHtml;
                    }


                    players.Add(playerId, new Player
                    {
                        Name = playerName,
                        Position = playerPosition,
                        Rank = playerRank,
                        Tier = playerTier,
                        Team = playerTeam
                    });
                }
            }

            return players;
        }

        public async Task<Dictionary<int, int>> GetPlayerAuctionValuesAsync()
        {
            var document = await this.HtmlWeb.LoadFromWebAsync("https://draftwizard.fantasypros.com/auction/fp_nfl.jsp?tab=tabP&C=0&1B=0&2B=0&SS=0&3B=0&OF=0&SP=0&RP=0&BN=6&Util=0&P=0&CI=0&MI=0&IF=0&LF=0&CF=0&RF=0&scoring=STD&teams=12&tb=100#tabO");

            var auctionValueRows = document.DocumentNode.SelectNodes("//table[@id='OverallTable']//tbody//tr");
            var playerValues = new Dictionary<int, int>();

            foreach (var auctionValueRow in auctionValueRows)
            {
                var playerId = auctionValueRow.GetAttributeValue("pid", 0);
                // For some reason, FantasyPros sometimes has negative dollar values for low-ranked players. Default to 0.
                var auctionValue = (Math.Max(auctionValueRow.GetAttributeValue("v", 0), 0));
                playerValues.Add(playerId, auctionValue);
            }

            return playerValues;
        }
    }
}