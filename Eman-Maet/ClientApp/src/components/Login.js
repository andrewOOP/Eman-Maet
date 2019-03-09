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
        this.state = { userModel: null, redirect: false };
        console.log("Step 1:");
        fetch('api/user/' + this.state.username + '/' + this.state.password)
            .then((response) => {
                console.log("Step 2:");
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log("Step 3:");
                console.log(data);
                this.setState({ userModel: data });
                this.setState({ redirect: true });
            })
            .catch((error) => {
                console.log("Step 4:");
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });
        console.log("Step 5:");
        event.preventDefault();
        //console.log(this.state);

        }

        renderRedirect = () => {
            if (this.state.redirect) {
                return <Redirect to='/eventlist' />
            }
        }


        render() {
            return (
                <div className="Login background">
                    <div className="Login main">
                        {this.renderRedirect()}
                        <h1>Login</h1>
                        <form action="#" >
                            <br />
                            <input type="text" id="username" name="username" placeholder="Username"
                                value={this.state.username}
                                onChange={e => this.setState({ username: e.target.value })} />
                            <br />
                            <input type="password" id="password" name="password" placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })} />
                            <br />
                            <br />
                            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Sign In" />
                        </form >
                    </div>
                </div>
            );
        }

}
