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
            locationid: '',
            streetAddress: '',
            city: '',
            State: '',
            zip: '',
            redirect: false,
        }

        fetch('api/user/GetNextLocationId', {
            method: 'GET',
        }).then(res => res.json())
            .then(response => this.setState({ locationid: response.locationID }))
            .catch(error => console.error('Error:', error));
    }

    handleFormSubmit(LocationEvent) {
        LocationEvent.preventDefault();

        this.setState({ redirect: true });
        let submitState = {
            locationid: this.state.locationID,
            streetAddress: this.state.address,
            city: this.state.city,
            zip: this.state.zip
        };
        this.editLocation(submitState);
    }

    createLocation(data) {
        fetch('api/location/2',
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
                            <label>{this.state.locationname}</label>
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
                    {/*I am not sure how to impliment the optional field yet*/}
                    <div className="row">
                        <div className="col-25">
                            <label></label>
                        </div>
                        <div className="col-75">
                            <input type="text" placeholder="Optional"
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
                            <input type="text" placeholder="Enter State"
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
                            <input type="text" placeholder="Enter Zip"
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
