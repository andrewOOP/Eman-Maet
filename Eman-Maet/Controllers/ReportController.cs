using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using MySql.Data.MySqlClient;
using Dapper;

namespace Eman_Maet.Controllers
{
    [Route("api/getreport")]
    [ApiController]
    public class ReportController : Controller
    {
        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";
        public ReportController()
        {}
        
        [HttpGet]
        public ActionResult<List<EventModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventModel> output = connection.Query<EventModel>("SELECT eventDescription, visitorCount FROM Event");
                return output.ToList();
            }
        }
        
        
    }
}