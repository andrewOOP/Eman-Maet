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
    [Route("api/event")]
    [ApiController]
    public class EventController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public EventController()
        {
            
        }

        IEnumerable<EventModel> formatDatesAndTimes(IEnumerable<EventModel> ienum)
        {
            foreach (EventModel x in ienum)
            {
                x.formattedEventDate = x.eventDate.ToString("MM/dd/yyyy");
                x.formattedStartTime = x.startTime.ToString("h:mm tt");
            }

            return ienum;

        }


        [HttpGet]
        public ActionResult<List<EventModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventModel> output = connection.Query<EventModel>("SELECT * FROM Event");
                return formatDatesAndTimes(output).ToList();
            }
        }

        [HttpGet("{id}", Name = "GetEvent")]
        public ActionResult<EventModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventModel> output = connection.Query<EventModel>("SELECT * FROM Event WHERE eventId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return formatDatesAndTimes(output).FirstOrDefault();
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

        [HttpPost]
        public IActionResult Create(EventModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventModel> output = connection.Query<EventModel>("INSERT INTO Event (eventDate, eventDescription, startTime) VALUES ((@_eventDate), (@_eventDescription), (@_startTime))", new { _eventDate = item.eventDate, _eventDescription = item.eventDescription, _startTime = item.startTime});
                return CreatedAtRoute("GetEvent", new { id = item.eventID }, item);
            }

        }

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
