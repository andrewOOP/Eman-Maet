using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class LocationModel
    {
        public int locationId { get; set; }
        public int companyId { get; set; }
        public String locationName { get; set; }
        public String address { get; set; }
        public String city { get; set; }
        public String state { get; set; }
        public String zip { get; set; }
        public int inactive { get; set; }


    }
}
