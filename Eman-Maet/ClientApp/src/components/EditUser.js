﻿import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as qs from 'query-string';
import './AppStyle.css'
import 'react-table/react-table.css'

export class EditUser extends Component {
    displayName = EditUser.name

    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            fname: '',
            lname: '',
            securityrole: '',
            email: '',
            password: '',
            inactive: '',
            paramID: -1,
            redirect: false,
        }

        const params = qs.parse(this.props.location.search);

        fetch('api/user/'+params.id, {
            method: 'GET',
        }).then(res => res.json())
            .then(response =>
                this.setState({
                    userid: response.userID,
                    fname: response.fName,
                    lname: response.lName,
                    securityrole: response.securityRole,
                    email: response.email,
                    password: response.password,
                    inactive: response.inactive,
                    paramID: params.id,
                }))
            .catch(error => console.error('Error:', error));
        //change inactive to a boolean
        if (this.state.inactive === 1) { this.setState({ inactive: true }) }
        else { this.setState({ inactive: false }) }
    }

    handleFormSubmit(userEvent) {
        userEvent.preventDefault();

        //changinge inactive flag back to a integer value
        var inactiveFlag;
        if (this.state.inactive) { inactiveFlag = 1 }
        else { inactiveFlag = 0 }
        this.setState({ redirect: true });
        let submitState = {
            userID: this.state.userid,
            fName: this.state.fname,
            lName: this.state.lname,
            securityRole: this.state.securityrole,
            email: this.state.email,
            password: this.state.password,
            inactive: inactiveFlag,
        };
        this.editUser(submitState);
    }

    deleteUser(user) {
        user.preventDefault();

        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        } else {

            fetch('api/user/' + this.state.paramID, {
                method: 'DELETE'
            }).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
            });


            this.props.history.push('/userlist');
        }
    }

    editUser(data) {
        fetch('api/user/' + this.state.paramID, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
            console.log(err);
        });
    }

    renderEditUser() {
        return (
            <div className="main">
                <h1>Edit User</h1>
                <form action="#" >

                    <div className="row">
                        <div className="col-25">
                            <label>First Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="First Name"
                                value={this.state.fname}
                                onChange={e => this.setState({ fname: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Last Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Last Name"
                                value={this.state.lname}
                                onChange={e => this.setState({ lname: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Email:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Email Address"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Password:</label>
                        </div>
                        <div className="col-75">
                            <input type="password" placeholder="Password"
                                value={this.state.password}
                                onChange={e => this.setState({ password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Permission</label>
                        </div>
                        <div className="col-75">
                            <select value={this.state.securityrole} onChange={e => this.setState({ securityrole: e.target.value })} id="securityRole">
                                <option value="default">-------</option>
                                <option value="User">User</option>
                                <option value="Administrator">Administrator</option>
                            </select>
                        </div>
                    </div>

                    <br /><input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                    <input className="delete" type="submit" onClick={e => this.deleteUser(e)} value="Delete" />
                </form >

            </div>
        );
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/userlist' />
        }
    }

    render() {
        return (
            <div>
                {this.renderEditUser()}
                {this.renderRedirect()}
            </div>
        );
    }
}
