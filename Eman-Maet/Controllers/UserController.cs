using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.UserController
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
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM User WHERE inactive = 0");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetUser")]
        public ActionResult<UserModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM User WHERE userId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }

        [HttpGet("GetNextUserId")]
        public ActionResult<UserModel> GetNextUserId()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT Max(userId)+1 as userID FROM User");
                return output.FirstOrDefault();
            }
        }

        [HttpGet("coordinator/{id}", Name = "GetUsersByEventID")]
        public ActionResult<List<UserModel>> GetUsersById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM user INNER JOIN eventcoordinator ON user.userID = eventcoordinator.userID WHERE inactive = 0 AND eventID = (@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        [HttpGet("eventRSVP/{id}", Name = "GetUsersByEventRSVP")]
        public ActionResult<List<UserModel>> GetUsersByEventRSVP(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM session AS table1 INNER JOIN sessionattendance AS table2 ON table1.sessionID = table2.sessionID INNER JOIN user ON user.userID = table2.userID WHERE inactive = 0 AND eventID = (@_id) GROUP BY user.userID", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        [HttpGet("sessionRSVP/{id}", Name = "GetUsersBySessionRSVP")]
        public ActionResult<List<UserModel>> GetUsersBySessionRSVP(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("SELECT * FROM user INNER JOIN sessionattendance ON user.userID = sessionattendance.userID WHERE inactive = 0 AND sessionID = (@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        //Find the user that is currently logged in
        [HttpGet("GetCurrentUser")]
        public ActionResult<UserModel> GetCurrentUser()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                System.Console.Write("In User Controller:");
                string id = this.HttpContext.Request.Cookies["CurrentID"];
                return GetById(int.Parse(id));
            }
        }

        [HttpPost]
        public IActionResult Create(UserModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("INSERT INTO User (userID, fName, lName, securityRole, email, password, inactive) VALUES ((@_userID), (@_fName), (@_lName), (@_securityRole), (@_email), (@_password), (@_inactive))",
                    new { _userID = item.userID, _fName = item.fName, _lName = item.lName, _securityRole = item.securityRole, _email = item.email, _password = item.password, _inactive = item.inactive });
                return CreatedAtRoute("GetUser", new { id = item.userID }, item);
            }

        }

        [HttpPost("{id}", Name = "EditUser")]
        public IActionResult Edit(UserModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("UPDATE User SET fName = (@_fName), lName = (@_lName), securityRole = (@_securityRole), email = (@_email), password = (@_password), inactive = (@_inactive) WHERE userID = (@_userID)",
                    new { _userID = item.userID, _fName = item.fName, _lName = item.lName, _securityRole = item.securityRole, _email = item.email, _password = item.password, _inactive = item.inactive });
                return CreatedAtRoute("GetUser", new { id = item.userID }, item);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult MarkAsInactive(long id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> output = connection.Query<UserModel>("UPDATE User SET inactive = 1 WHERE userID = @_id", new { _id = id });
                return NoContent();
            }
        }

        [HttpGet("{username}/{password}", Name = "Login")]
        public ActionResult<UserModel> GetResult(string username, string password)
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserModel> test = connection.Query<UserModel>("SELECT userID from user WHERE email=(@_email) AND password=(@_password)", new { _email = username, _password = password });
                if (test.Count() == 1)
                {
                    IEnumerable<UserModel> result = connection.Query<UserModel>("SELECT * from user WHERE email=(@_email) AND password=(@_password)", new { _email = username, _password = password });
                    //Set a cookie with the ID of logged in User
                    this.HttpContext.Response.Cookies.Append("CurrentID", result.First().userID.ToString());

                    return result.First();
                }
                return NotFound();
            }
        }
    }
}
