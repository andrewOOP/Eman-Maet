﻿using Microsoft.AspNetCore.Mvc;
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

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


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

        [HttpGet("{id}", Name = "GetSession")]
        public ActionResult<SessionModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<SessionModel> output = connection.Query<SessionModel>("SELECT * FROM Session WHERE sessionId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return formatDatesAndTimes(output).FirstOrDefault();
            }
        }


        //[HttpPost]
        //public IActionResult Create(SessionModel item)
        //{

        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<SessionModel> output = connection.Query<SessionModel>("INSERT INTO Event (eventDate, eventDescription, startTime) VALUES ((@_eventDate), (@_eventDescription), (@_startTime))", new { _eventDate = item.eventDate, _eventDescription = item.eventDescription, _startTime = item.startTime});
        //        return CreatedAtRoute("GetSession", new { id = item.sessionID }, item);
        //    }

        //}

        //[HttpPut("{id}")]
        //public IActionResult Update(long id, SessionModel item)
        //{

        //    using (MySqlConnection connection = new MySqlConnection(defaultConnection))
        //    {
        //        IEnumerable<SessionModel> output = connection.Query<SessionModel>("UPDATE Event SET eventDate = @_eventDate, eventDescription = @_eventDescription, startTime = @_startTime WHERE eventID = @_id", new { _eventDate = item.eventDate, _eventDescription = item.eventDescription, _startTime = item.startTime, _id = id });
        //        return NoContent();
        //    }
        //}

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
