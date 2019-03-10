using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class SessionAttendanceModel
    {
        public int sessionAttendanceID { get; set; }
        public int sessionID { get; set; }
        public int userID { get; set; }
        public int rsvpCheckin { get; set; }
        public bool formattedRsvpCheckin { get; set; }


    }
}
