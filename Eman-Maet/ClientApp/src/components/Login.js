import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Login.css';
import './AppStyle.css'

export class Login extends Component {
    displayName = Login.name

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
    }

    handleFormSubmit(event) {
        //this.state = { userModel: null, redirect: false };
        console.log("Step 1:");
        var url = 'api/user/' + this.state.username + '/' + this.state.password;
        console.log("Step 1.5:" + url + ".");
        fetch(url)
            .then((response) => {
                console.log("Step 2:");
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log("Step 3:");
                console.log(data);
               // this.setState({ userModel: data });
                this.setState({ redirect: true });
            })
            .catch((error) => {
                console.log("Step 4:");
                console.log('Error from fetch in login.js: ' + error);
            });
        console.log("Step 5:");
        event.preventDefault();
        //console.log(this.state);

    }

    renderLogin() {
        return (
            <div className="Login background">
                <div className="Login main">
                    {this.renderRedirect()}
                    <h1>Login</h1>
                    <form action="#" >
                        <div className="row">
                            <input type="text" id="username" name="username" placeholder="Username"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })} />
                        </div>
                        <div className="row">
                            <input type="password" id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })} />
                        </div>
                        <input class="submit" id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Sign In" />
                    </form >
                </div>
            </div>
        );
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/eventlist' />
        }
    }

    render() {
        return (
            <div>
                {this.renderLogin()}
                {this.renderRedirect()}
            </div>
        );
    }

       

}
