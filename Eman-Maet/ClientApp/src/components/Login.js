import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Login.css';

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
        this.setState({ redirect: true });
        event.preventDefault();
        //console.log(this.state);
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }


  render() {
      return (
          <div id="LoginBack">
              <div id="LoginText">
                    {this.renderRedirect()}
                    <h1>Login</h1>
                    <form action="#" >
                        <br />
                        <input type="text" id="username" name="username" placeholder="Username"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                        /><br />
                        <input type="password" id="pasword" name="password" placeholder="Password"
                            value={this.state.password}
                            onChange={e => this.setState({ password: e.target.value })}
                        /> <br />
                        <br /><input type="submit" onClick={e => this.handleFormSubmit(e)} value="Sign In" />
                    </form >
            </div>
        </div>
    );
  }
}