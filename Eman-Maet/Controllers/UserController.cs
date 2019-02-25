using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.EventController
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public UserController()
        {
            
        }



        [HttpGet]
        public ActionResult<List<UserModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM user");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<UserModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM user WHERE userID=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }

        //Austin's function
        [HttpGet("{username}/{password}", Name = "Login")]
        public ActionResult<UserModel> GetResult(string username, string password)
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> test = connection.Query<UserModel>("SELECT userID from user WHERE email=(@_email) AND password=(@_password)", new { _email = username, _password = password });
                if (test.Count() == 1)
                {
                    IEnumerable<UserModel> result = connection.Query<UserModel>("SELECT * from user WHERE email=(@_email) AND password=(@_password)", new { _email = username, _password = password });
                    int userid = result.First().userId;
                    int companyid = result.First().companyId;
                    HttpContext.Session.Set("sessionUserID", System.BitConverter.GetBytes(userid));
                    HttpContext.Session.Set("sessionCompanyID", System.BitConverter.GetBytes(companyid));

                    //I don't know what to return here to have the Login.js page continue redirecting to EventList.js
                    //Some things may need to be changed in Login.js as well...
                    return something;
                }
                return NotFound();
            }
        }

        //[HttpGet("range", Name = "GetEventRange")]
        //public ActionResult<List<Event>> GetByRange(float min, float max)
        //{

        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<Event> output = connection.Query<Event>("SELECT * FROM Event WHERE Gpa>=(@_min) AND Gpa<=(@_max)", new { _min = min, _max = max });
        //        if (output.Count() == 0)
        //        {
        //            return NotFound();
        //        }
        //        return output.ToList();
        //    }
        //}

        //[HttpPost]
        //public IActionResult Create(Event item)
        //{

        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<Event> output = connection.Query<Event>("INSERT INTO Event (Id, Name, Gpa) VALUES ((@_Id), (@_Name), (@_Gpa))", new { _Id = item.Id, _Name = item.Name, _Gpa = item.Gpa });
        //        return CreatedAtRoute("GetEvent", new { id = item.Id }, item);
        //    }

        //}

        //[HttpDelete("{id}")]
        //public IActionResult Delete(string id)
        //{
        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<Event> output = connection.Query<Event>("DELETE FROM Event WHERE Id=(@_id)", new { _id = id });
        //        return NoContent();
        //    }
        //}
    }
}
