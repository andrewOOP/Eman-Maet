using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class EventModel
    {
        public int eventID { get; set; }
        public int companyID { get; set; }
        public String eventDate { get; set; }
        public String eventDescription { get; set; }
        public int visitorCount { get; set; }
        public String startTime { get; set; }
        public int inactive { get; set; }


    }
}
