using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.EventCoordinatorController
{
    [Route("api/eventcoordinator")]
    [ApiController]
    public class EventCoordinatorController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public EventCoordinatorController()
        {
            
        }


        [HttpGet]
        public ActionResult<List<EventCoordinatorModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventCoordinatorModel> output = connection.Query<EventCoordinatorModel>("SELECT * FROM EventCoordinator");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetEventCoordinator")]
        public ActionResult<List<EventCoordinatorModel>> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventCoordinatorModel> output = connection.Query<EventCoordinatorModel>("SELECT * FROM EventCoordinator WHERE eventId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        [HttpGet("byIDs")]
        public ActionResult<EventCoordinatorModel> GetWithTwoIDs(long eventID, long userID)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventCoordinatorModel> output = connection.Query<EventCoordinatorModel>("SELECT * FROM EventCoordinator WHERE eventID=(@_eventid) AND userID=(@_userID)", new { _eventid = eventID, _userID = userID });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }

        [HttpPost]
        public IActionResult Create(EventCoordinatorModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventCoordinatorModel> output = connection.Query<EventCoordinatorModel>("INSERT INTO EventCoordinator (eventID, userID) VALUES ((@_eventID), (@_userID))", new { _eventID = item.eventID, _userID = item.userID});
                return NoContent();
            }

        }

        [HttpDelete("{id}")]
        public IActionResult MarkAsInactive(long id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventCoordinatorModel> output = connection.Query<EventCoordinatorModel>("DELETE FROM eventcoordinator WHERE eventCoordinatorID = @_id", new {_id = id});
                return NoContent();
            }
        }
    }
}
