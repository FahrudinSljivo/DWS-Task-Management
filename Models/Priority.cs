using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace todoapp.Models
{
    public class Priority
    {
        [Key]
        public int PriorityId { get; set; }

        public int PriorityValue { get; set; }
    }
}
