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
        public String sessionDate { get; set; }
        public String startTime { get; set; }
        public String endTime { get; set; }
        public int locationID { get; set; }
        public int companyID { get; set; }


    }
}
