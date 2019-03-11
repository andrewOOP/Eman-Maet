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
            redirect: false,
            showError: false
        }
    }

    handleFormSubmit(event) {
        var url = 'api/user/' + this.state.username + '/' + this.state.password;
        fetch(url)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log("Here Data:" + data);
                sessionStorage.setItem('myData', data);
                let dataone = sessionStorage.getItem('myData');
                console.log("Here Data in Login:" + dataone.userId);
                this.setState({ redirect: true });
            })
            .catch((error) => {
                console.log('Error from fetch in login.js: ' + error);
                this.setState({ showError: true})
            });
        event.preventDefault();
    }

    renderLogin() {
        var error;
        if (this.state.showError) {
            error = <label>Invalid username or password!</label>
        }
        else {
            error = <div></div>
        }
        
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
                        {error}
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
