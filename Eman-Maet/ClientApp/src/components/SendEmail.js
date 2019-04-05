
import React, { Component } from 'react';
import './AppStyle.css'

export class SendEmail extends Component
{
    displayName = SendEmail.name

    constructor(props)
    {
        super(props);
        this.state =
        {
        }
    }

    renderEmail()
    {
        return
        (
            <a>Send Mail</a>
        );
    }


    render()
    {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderEmail();

        return (
            <div>
                {contents}
            </div>
        );
    }
}
