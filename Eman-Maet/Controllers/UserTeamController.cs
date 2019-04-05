using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.UserTeamController
{
    [Route("api/userteam")]
    [ApiController]
    public class UserTeamController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public UserTeamController()
        {
            
        }


        [HttpGet]
        public ActionResult<List<UserTeamModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserTeamModel> output = connection.Query<UserTeamModel>("SELECT * FROM UserTeam");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetUserTeams")]
        public ActionResult<List<UserTeamModel>> GetByUserId(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserTeamModel> output = connection.Query<UserTeamModel>("SELECT teamID FROM UserTeam WHERE userId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        [HttpGet("byIDs")]
        public ActionResult<UserTeamModel> GetWithTwoIDs(long teamID, long userID)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserTeamModel> output = connection.Query<UserTeamModel>("SELECT * FROM UserTeam WHERE teamID=(@_teamid) AND userID=(@_userID)", new { _teamid = teamID, _userID = userID });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }

        [HttpPost]
        public IActionResult Create(UserTeamModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserTeamModel> output = connection.Query<UserTeamModel>("INSERT INTO UserTeam (teamID, userID) VALUES ((@_teamID), (@_userID))", new { _teamID = item.teamID, _userID = item.userID});
                return NoContent();
            }

        }

        [HttpDelete("{id}")]
        public IActionResult MarkAsInactive(long id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<UserTeamModel> output = connection.Query<UserTeamModel>("DELETE FROM userteam WHERE userTeamID = @_id", new {_id = id});
                return NoContent();
            }
        }
    }
}
