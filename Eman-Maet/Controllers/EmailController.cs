﻿using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Eman_Maet.Models;
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;
using Dapper;


namespace Eman_Maet.Controllers
{

    public class EmailController : Controller
    {
        string defaultConnection = "Server=localhost; Database=codeathon; UID=root; Password=iamroot; SslMode=none; allowPublicKeyRetrieval = true;";

        public IActionResult Index()
        {
            return View();
        }

        public EmailController()
        {

        }

        [HttpGet]
        public ActionResult<List<EmailModel>> GetAll()
        {
            using (MySqlConnection connection = new MySqlConnection(defaultConnection))
            {
                IEnumerable<EmailModel> output = connection.Query<EmailModel>("select user.email from event join session on session.eventID = event.eventID join sessionattendance on session.sessionID = sessionattendance.sessionID join user on sessionattendance.userID = user.userID");
                return string.Join(",", output);
            }
        }
    }
}

