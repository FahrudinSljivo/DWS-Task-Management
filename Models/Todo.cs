using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace todoapp.Models
{
    public class Todo
    {

        [Key]
        public int TaskId { get; set; }

        [MaxLength(20)]
        public string TaskName { get; set; }

        [MaxLength(250)]
        public string? TaskDescription { get; set; }

        public DateTime DateOfCreation { get; set; }

        public DateTime? DateOfExpiry { get; set; }

        public bool IsDone { get; set; }

        public int? GroupId { get; set; }
        [ForeignKey("GroupId")]
        public Group Group { get; set; }

        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        public int PriorityId { get; set; }
        [ForeignKey("PriorityId")]
        public Priority Priority { get; set; }


    }
}
