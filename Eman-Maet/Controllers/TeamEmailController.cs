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


       

        [HttpGet("{id}", Name = "GetTeamEmail")]
        public ActionResult<List<EmailModel>> GetById(int id)
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
                    System.Console.WriteLine(team.ToString());
                    IEnumerable<UserTeamModel> user = connection.Query<UserTeamModel>("SELECT userID FROM userTeam WHERE teamID=(@_id)", new { _id = id });
                    if (user.Count() == 0)
                    {
                        return NotFound();
                    }
                    else
                    {
                        System.Console.WriteLine(user.ToString());
                        List<UserTeamModel> userList = new List<UserTeamModel>(user.ToList());
                        IEnumerable<EmailModel> userEmails = connection.Query<EmailModel>("SELECT email FROM user WHERE userID IN (SELECT userID FROM userTeam WHERE teamID=(@_id))", new { _id = id });
                        if (userEmails.Count() == 0)
                        {
                            return NotFound();
                        }
                        else
                        {
                            System.Console.WriteLine(userEmails.ToString());
                            return userEmails.ToList();
                        }
                    }
                    //return team.FirstOrDefault();
                }
            }
        }


        
    }
}
