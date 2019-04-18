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

        string defaultConnection = "Server=localhost; Port = 3307; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";


        public LocationController()
        {
            
        }



        [HttpGet]
        public ActionResult<List<LocationModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("SELECT * FROM Location WHERE inactive = 0");
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

        [HttpPost]
        public IActionResult Create(LocationModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("INSERT INTO Location (locationName, address, city, state, zip) VALUES ((@_locationName), (@_address), (@_city), (@_state), (@_zip))", new { _locationName = item.locationName, _address = item.address, _city = item.city, _state = item.state, _zip = item.zip });
                return CreatedAtRoute("GetLocation", new { id = item.locationID }, item);
            }

        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, LocationModel item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<LocationModel> output = connection.Query<LocationModel>("UPDATE Location SET locationName = @_locationName, address = @_address, city = @_city, state = @_state, zip = @_zip WHERE locationID = @_id", new { _locationName = item.locationName, _address = item.address, _city = item.city, _state = item.state, _zip = item.zip, _id = id });
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult MarkAsInactive(long id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EventModel> output = connection.Query<EventModel>("UPDATE Location SET inactive = 1 WHERE locationID = @_id", new { _id = id });
                return NoContent();
            }
        }
    }
}
