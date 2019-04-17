import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './AppStyle.css'
import 'react-table/react-table.css'

export class CreateLocation extends Component
{
    displayName = CreateLocation.name

    constructor(props)
    {
        super(props);
        this.state = {
            locationName: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            paramID: -1,
            redirect: false,
        }
    }

    handleFormSubmit(LocationEvent) {
        LocationEvent.preventDefault();

        this.setState({ redirect: true });
        let submitState = {
            locationName: this.state.locationName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip
        };
        this.createLocation(submitState);
    }

    createLocation(data) {
        fetch('api/location/',
            {
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

    renderCreateLocation() {
        return (
            <div className="main">
                <h1>Create Location</h1>
                <form action="#" >
                    <div className="row">
                        <div className="col-25">
                            <label>Location Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Enter Name"
                                value={this.state.locationName}
                                onChange={e => this.setState({ locationName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Street Address:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Address"
                                value={this.state.address}
                                onChange={e => this.setState({ address: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>City:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Enter City"
                                value={this.state.city}
                                onChange={e => this.setState({ city: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>State:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Enter State" maxlength="2"
                                value={this.state.state}
                                onChange={e => this.setState({ state: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Zip:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Enter Zip" maxlength="5"
                                value={this.state.zip}
                                onChange={e => this.setState({ zip: e.target.value })}
                            />
                        </div>
                    </div>

                    <br /><input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />

                </form >

            </div>
        );
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/locationlist' />
        }
    }

    render() {
        return (
            <div>
                {this.renderCreateLocation()}
                {this.renderRedirect()}
            </div>
        );
    }
}
