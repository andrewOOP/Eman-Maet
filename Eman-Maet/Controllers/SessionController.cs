using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.SessionController
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Port = 3307; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public SessionController()
        {
            
        }

        IEnumerable<SessionModel> formatDatesAndTimes(IEnumerable<SessionModel> ienum)
        {
            foreach (SessionModel x in ienum)
            {
                x.formattedSessionDate = x.sessionDate.ToString("MM/dd/yyyy");
                x.formattedStartTime = x.startTime.ToString("h:mm tt");
                x.formattedEndTime = x.endTime.ToString("h:mm tt");

            }

            return ienum;

        }


        [HttpGet]
        public ActionResult<List<SessionModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("SELECT * FROM Session");
                return formatDatesAndTimes(output).ToList();
            }
        }


        [HttpGet("byevent/{id}", Name = "GetSessionsByEvent")]
        public ActionResult<List<SessionModel>> GetByEvent(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("SELECT * FROM Session WHERE eventID=(@_id)", new { _id = id });
                this.HttpContext.Response.Cookies.Append("eventIDForSessionCreation", id.ToString());
                return formatDatesAndTimes(output).ToList();
            }
        }

        [HttpGet("{id}", Name = "GetSession")]
        public ActionResult<SessionModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("SELECT * FROM Session WHERE sessionID=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return formatDatesAndTimes(output).FirstOrDefault();
            }
        }


        [HttpPost]
        public string Create(SessionModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                string eventID = this.HttpContext.Request.Cookies["eventIDForSessionCreation"];
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("INSERT INTO Session (eventID, locationID, sessionName, sessionDate, startTime, endTime) VALUES ((@_eventID), (@_locationID), (@_sessionName), (@_sessionDate), (@_startTime), (@_endTime))", new { _eventID = eventID, _locationID = item.locationID, _sessionName = item.sessionName, _sessionDate = item.sessionDate, _startTime = item.startTime, _endTime = item.endTime });
                return eventID;
            }

        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, SessionModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("UPDATE Session SET locationID = @_locationID, sessionName = @_sessionName, sessionDate = @_sessionDate, startTime = @_startTime, endTime = @_endTime WHERE sessionID = @_id", new { _locationID = item.locationID, _sessionName = item.sessionName, _sessionDate = item.sessionDate, _startTime = item.startTime, _endTime = item.endTime, _id = id });
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
