using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class SessionModel
    {
        public int sessionID { get; set; }
        public int eventID { get; set; }
        public String sessionName { get; set; }
        public DateTime sessionDate { get; set; }
        public String formattedSessionDate { get; set; }
        public DateTime startTime { get; set; }
        public String formattedStartTime { get; set; }
        public DateTime endTime { get; set; }
        public String formattedEndTime { get; set; }
        public int locationID { get; set; }
        public int companyID { get; set; }


    }
}
