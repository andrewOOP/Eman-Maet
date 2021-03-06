﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.TeamController
{
    [Route("api/team")]
    [ApiController]
    public class TeamController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public TeamController()
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

        [HttpGet("{id}", Name = "GetTeam")]
        public ActionResult<TeamModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = connection.Query<TeamModel>("SELECT * FROM Team WHERE teamID=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }


        [HttpPost]
        public ActionResult<int> Create(TeamModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = connection.Query<TeamModel>("INSERT INTO Team (teamName, teamJob, inactive) VALUES ((@_teamName), (@_teamJob), 0)", new { _teamName = item.teamName, _teamJob = item.teamJob});
                IEnumerable<int> id = connection.Query<int>("SELECT MAX(teamID) FROM Team");
                return id.FirstOrDefault();
            }

        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, TeamModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = connection.Query<TeamModel>("UPDATE Team SET teamName = @_teamName, teamJob = @_teamJob WHERE teamID = @_id", new { _teamName = item.teamName, _teamJob = item.teamJob, _id = id });
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult MarkAsInactive(long id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = connection.Query<TeamModel>("UPDATE Team SET inactive = 1 WHERE teamID = @_id", new { _id = id });
                return NoContent();
            }
        }

        [HttpGet("byuser/{id}", Name = "GetTeamByUserID")]
        public ActionResult<List<TeamModel>> GetTeamsByIds(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<TeamModel> output = null;

                    output = connection.Query<TeamModel>("SELECT team.teamID, teamName, teamJob, inactive FROM team INNER JOIN userteam ON team.teamID = userteam.teamID WHERE inactive = 0 AND userID = (@_id)", new { _id = id });
                    if (output.Count() == 0)
                    {
                        return NotFound();
                    }
                return output.ToList();
            }
        }
    }
}
