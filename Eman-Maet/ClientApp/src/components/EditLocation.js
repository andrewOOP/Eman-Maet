import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import * as qs from 'query-string';
import './AppStyle.css'
import 'react-table/react-table.css'

export class EditLocation extends Component {
    displayName = EditLocation.name

    constructor(props) {
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

        const params = qs.parse(this.props.location.search);

        fetch('api/location/' + params.id,
            {
            method: 'GET',
        }).then(res => res.json())
            .then(response =>
                this.setState({
                    locationName: response.locationName,
                    address: response.address,
                    city: response.city,
                    state: response.state,
                    zip: response.zip,
                    paramID: params.id,
                }))
            .catch(error => console.error('Error:', error));
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
        this.editLocation(submitState);
    }


    deleteLocation(location) {
        location.preventDefault();

        if (!window.confirm('Are you sure you want to delete this location?')) {
            return;
        } else {

            fetch('api/location/' + this.state.paramID, {
                method: 'DELETE'
            }).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
            });


            this.props.history.push('/locationlist');
        }
    }


    editLocation(data)
    {
        fetch('api/location/' + this.state.paramID,
        {
            method: 'PUT',
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

    renderEditLocation() {
        return (
            <div className="main">
                <h1>Edit Location</h1>
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
                    <input className="delete" type="submit" onClick={e => this.deleteLocation(e)} value="Delete" />

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
                {this.renderEditLocation()}
                {this.renderRedirect()}
            </div>
        );
    }
}
