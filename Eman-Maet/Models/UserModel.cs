using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Eman_Maet.Models
{
    public class UserModel
    {
        public int userId { get; set; }
        public int companyId { get; set; }
        public String fName { get; set; }
        public String lName { get; set; }
        public String securityRole { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public int inactive { get; set; }


    }
}
