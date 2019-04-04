import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as qs from 'query-string';
import './AppStyle.css'
import 'react-table/react-table.css'

export class SendEmail extends Component {
    displayName = SendEmail.name

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