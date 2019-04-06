import React, { Component } from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router';
import './AppStyle.css'
import 'react-table/react-table.css'

export class SendEmail extends Component {
    displayName = SendEmail.name

    constructor(props)
    {
        super(props);
        this.state =
            {
            }
    }

    renderUserTable(users)
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
            : this.renderUserTable(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

