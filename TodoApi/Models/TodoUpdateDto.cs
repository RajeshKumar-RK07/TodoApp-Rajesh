using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class TodoUpdateDto
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public string Priority { get; set; } = string.Empty;
        
        [Required]
        public string Category { get; set; } = string.Empty;
        
        public bool IsCompleted { get; set; }
    }
}
