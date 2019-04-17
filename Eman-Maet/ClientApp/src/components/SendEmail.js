import React, { Component } from 'react';
<<<<<<< HEAD
import ReactTable from "react-table";
import { withRouter } from 'react-router';
=======
import { Redirect } from 'react-router-dom'
import * as qs from 'query-string';
>>>>>>> master
import './AppStyle.css'
import 'react-table/react-table.css'

export class SendEmail extends Component {
    displayName = SendEmail.name

<<<<<<< HEAD
    constructor(props)
    {
        super(props);
        this.state =
            {
            }
    }

    renderEmail(users)
    {    
        return (
            <div className="main">
                <h1>Create Email</h1>
                <a href="mailto:someone@example.com,test@gmail.com?Subject=Hello%20again" target="_top">Send Mail</a>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderEmail(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

=======
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            sessionid: '',
            message: '',
            sendTo: '',
            redirect: false,
        }

        fetch('api/')
    }



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
    }
});

var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
>>>>>>> master
