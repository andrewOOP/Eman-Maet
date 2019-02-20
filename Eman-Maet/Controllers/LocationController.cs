using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;



namespace Eman_Maet.LocationController
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public LocationController()
        {
            
        }



        [HttpGet]
        public ActionResult<List<LocationModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("SELECT * FROM Location");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetLocation")]
        public ActionResult<LocationModel> GetById(int id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("SELECT * FROM Location WHERE locationId=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
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
        public IActionResult Create(LocationModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("INSERT INTO Event (locationName, address, city, state, zip) VALUES ((@_locationName), (@_address), (@_city), (@_state), (@_zip))", new { _locationName = item.locationName, _address = item.address, _city = item.city, _state = item.state, _zip = item.zip });
                return CreatedAtRoute("GetLocation", new { id = item.locationId }, item);
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
