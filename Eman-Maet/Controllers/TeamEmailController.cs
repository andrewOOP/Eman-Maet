using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.TeamEmailController
{
    [Route("api/teamemail")]
    [ApiController]
    public class TeamEmailController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public TeamEmailController()
        {
            
        }


        [HttpGet]
        public ActionResult<List<TeamModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = connection.Query<TeamModel>("SELECT * FROM Team WHERE inactive = 0");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetTeamEmail")]
        public ActionResult<List<UserModel>> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> team = connection.Query<TeamModel>("SELECT teamID FROM Team WHERE teamID=(@_id)", new { _id = id });
                if (team.Count() == 0)
                {
                    return NotFound();
                }
                else
                {
                    IEnumerable<UserTeamModel> user = connection.Query<UserTeamModel>("SELECT userID FROM userTeam WHERE teamID=(@id)", new { _id = team.FirstOrDefault() });
                    if (user.Count() == 0)
                    {
                        return NotFound();
                    }
                    else
                    {
                        List<UserTeamModel> userList = new List<UserTeamModel>(user.ToList());
                        IEnumerable<UserModel> userEmails = connection.Query<UserModel>("SELECT email FROM user WHERE userID IN (@ids)", new { _ids = userList });
                        if (userEmails.Count() == 0)
                        {
                            return NotFound();
                        }
                        else
                        {
                            System.Console.WriteLine("here");
                            return userEmails.ToList();
                        }
                    }
                    //return team.FirstOrDefault();
                }
            }
        }
        
    }
}
