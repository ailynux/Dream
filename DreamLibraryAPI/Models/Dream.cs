namespace DreamLibraryAPI.Models
{
    public class Dream
    {
        public int DreamId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public DateTime DreamDate { get; set; }
    }
}