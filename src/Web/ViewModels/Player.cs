namespace Web.ViewModels
{
    public class Player
    {
        public string Name { get; set; }
        public string Team { get; set; }
        public string Position { get; set; }
        public int Rank { get; set; }
        public int Tier { get; set; }
        public int Value { get; set; } = 0;
    }
}