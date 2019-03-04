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
        public DateTime eventDate { get; set; }
        public String formattedEventDate { get; set; }
        public String eventDescription { get; set; }
        public int visitorCount { get; set; }
        public DateTime startTime { get; set; }
        public String formattedStartTime { get; set; }
        public int inactive { get; set; }


    }
}
