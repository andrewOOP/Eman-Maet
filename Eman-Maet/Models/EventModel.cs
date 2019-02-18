using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class EventModel
    {
        public int eventId { get; set; }
        public int companyId { get; set; }
        public DateTime eventDate { get; set; }
        public String companyDescription { get; set; }
        public int inactive { get; set; }


    }
}
