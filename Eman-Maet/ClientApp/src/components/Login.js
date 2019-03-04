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
        //this.setState({ redirect: true });
        //event.preventDefault();
        //console.log(this.state);

        this.state = { userModel: null, redirect: false };

        fetch('api/user/username/password')
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log(data);
                this.setState({ userModel: data });
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ requestFailed: true });
            });

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
}
