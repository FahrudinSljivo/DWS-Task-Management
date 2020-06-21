using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
//using System.Threading.Tasks;

namespace todoapp.Models
{
    public class Group
    {
        [Key]
        public int GroupId { get; set; }

        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        public int? NumberOfPeople { get; set; }

        //public List<UserGroup> UserGroup { get; set; }

        public List<Todo> ListOfTasks { get; set; }
    }
}
