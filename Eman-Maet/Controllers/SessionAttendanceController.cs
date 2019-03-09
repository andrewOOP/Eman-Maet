using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.SessionAttendanceController
{
    [Route("api/sessionattendance")]
    [ApiController]
    public class SessionAttendanceController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public SessionAttendanceController()
        {
            
        }


        [HttpGet]
        public ActionResult<List<SessionAttendanceModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionAttendanceModel> output = connection.Query<SessionAttendanceModel>("SELECT * FROM SessionAttendance");
                return output.ToList();
            }
        }

        [HttpGet("{sessionID}/{userID}", Name = "GetSessionAttendance")]
        public ActionResult<SessionAttendanceModel> GetById(int sessionID, int userID)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionAttendanceModel> output = connection.Query<SessionAttendanceModel>("SELECT * FROM SessionAttendance WHERE sessionID=(@_sessionID) AND userID=(@_userID)", new { _sessionID = sessionID, _userID = userID, });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }


        [HttpPost]
        public IActionResult Create(SessionAttendanceModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionAttendanceModel> output = connection.Query<SessionAttendanceModel>("INSERT INTO SessionAttendance (sessionID, userID, rsvpCheckin) VALUES ((@_sessionID), (@_userID), (@_rsvpCheckin))", new {_sessionID = item.sessionID, _userID = item.userID, _rsvpCheckin = item.rsvpCheckin });
                return CreatedAtRoute("GetSessionAttendance", new { sessionID = item.sessionID , userID = item.userID }, item);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, SessionAttendanceModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionAttendanceModel> output = connection.Query<SessionAttendanceModel>("UPDATE SessionAttendance SET sessionAttendanceID = @_sessionAttendanceID, sessionID = @_sessionID, userID = @_userID, rsvpCheckin = @_rsvpCheckin WHERE sessionAttendanceID = @_id", new { _sessionAttendanceID = item.sessionAttendanceID, _sessionID = item.sessionID, _userID = item.userID, _rsvpCheckin = item.rsvpCheckin });
                return NoContent();
            }
        }

        //[HttpDelete("{id}")]
        //public IActionResult MarkAsInactive(long id)
        //{

        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<EventModel> output = connection.Query<EventModel>("UPDATE Event SET inactive = 1 WHERE eventID = @_id", new { _id = id });
        //        return NoContent();
        //    }
        //}
    }
}
