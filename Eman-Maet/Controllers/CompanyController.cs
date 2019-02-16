using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;



namespace Eman_Maet.CompanyController
{
    [Route("api/stu")]
    [ApiController]
    public class CompanyController : ControllerBase
    {

        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=; SslMode=none;";

        public CompanyController()
        {

        }



        [HttpGet]
        public ActionResult<List<Company>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<Company> output = connection.Query<Company>("SELECT * FROM COMPANY");
                return output.ToList();
            }
        }

        [HttpGet("{id}", Name = "GetCOMPA ")]
        public ActionResult<Company> GetById(string id)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<Company> output = connection.Query<Company>("SELECT * FROM COMPANY WHERE Id=(@_id)", new { _id = id });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.FirstOrDefault();
            }
        }

        [HttpGet("range", Name = "GetCompanyRange")]
        public ActionResult<List<Company>> GetByRange(float min, float max)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<Company> output = connection.Query<Company>("SELECT * FROM COMPANY WHERE Gpa>=(@_min) AND Gpa<=(@_max)", new { _min = min, _max = max });
                if (output.Count() == 0)
                {
                    return NotFound();
                }
                return output.ToList();
            }
        }

        [HttpPost]
        public IActionResult Create(Company item)
        {

            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<Company> output = connection.Query<Company>("INSERT INTO COMPANY (Id, Name, Gpa) VALUES ((@_Id), (@_Name), (@_Gpa))", new { _Id = item.Id, _Name = item.Name, _Gpa = item.Gpa });
                return CreatedAtRoute("GetCompany", new { id = item.Id }, item);
            }

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<Company> output = connection.Query<Company>("DELETE FROM COMPANY WHERE Id=(@_id)", new { _id = id });
                return NoContent();
            }
        }
    }
}
