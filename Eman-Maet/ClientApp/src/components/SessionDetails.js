import React, { Component } from 'react';
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import './EditEvent.css'
import './AppStyle.css'

export class SessionDetails extends Component {
    displayName = SessionDetails.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: this.getCurrentDate(),
            starttime: '12:00',
            endtime: '12:00',
            paramID: -1,
            locID: 1,
			locChoice: '',
			locAddress: '',
            locations: [],
			isAdmin: '',
			userID: -1,
			loading: true,
			rsvped: false,
			initrsvped: false,
			found: false,
        }

        fetch('api/location/')
            .then(response => response.json())
            .then(data => {
                this.setState({ locations: data })
            });

        const params = qs.parse(this.props.location.search);

        fetch('api/session/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ paramID: params.id, title: data.sessionName, startdate: data.formattedSessionDate, starttime: data.formattedStartTime, endtime: data.formattedEndTime, locID: data.locationID })
                fetch('api/location/' + this.state.locID)
                    .then(response => response.json())
					.then(data => {
						this.setState({ locChoice: data.locationName, locAddress: data.address })
						fetch('api/user/GetCurrentUser', {
							method: 'GET',
						})
							.then(res => res.json())
							.then(response => {
								this.setState({ isAdmin: response.securityRole, userID: response.userID });
								if (this.state.isAdmin === "Administrator") {
									this.setState({ isAdmin: true });
								}
								else { this.setState({ isAdmin: false }); }

								fetch('api/sessionattendance/' + this.state.paramID + '/' + this.state.userID)
									.then((response) => {
										if (!response.ok) throw new Error(response.status);
										else return response.json();
									})
									.then(data => {
										if (data.rsvpCheckin === 1) {
											this.setState({ initrsvped: true, found: true, loading: false  });
											console.log("TRUE!");
										}
										else {
											this.setState({ initrsvped: false, found: true, loading: false  });
											console.log("false!");
										}
									})
									.catch((error) => {
										//console.log('This One error: ' + error);
										this.setState({ found: false, loading: false  });
										console.log("NOT FOUND!");
									});
							})
							.catch(error => console.error('Error:', error));


                    });
			});
       

    }

    handleFormSubmit(event) {
        event.preventDefault();
        let submitState = {
            sessionDate: this.state.startdate,
            sessionName: this.state.title,
            startTime: this.state.starttime,
            endTime: this.state.endtime,
            locationID: this.state.locID,
        };
        this.sessionDetails(submitState);
	}

	fetchSessionAttendance(event) {
		event.preventDefault();
		return fetch('api/sessionattendance/' + this.state.paramID + '/' + this.state.userID)
			.then((response) => {
				if (!response.ok) throw new Error(response.status);
				else return response.json();
			})
			.then(data => {
				if (data.rsvpCheckin === 1)
					this.setState({ rsvped: true, found: true}, () => { this.handleFormRsvp(); });
				else
					this.setState({ rsvped: false, found: true}, () => { this.handleFormRsvp(); });
			})
			.catch((error) => {
				//console.log('This One error: ' + error);
				this.setState({ found: false }, () => { this.handleFormRsvp();});
				console.log("HERE!");
			});
	}

	handleFormRsvp() {
		
		let tempRsvp = -1;
		if (this.state.rsvped)
			tempRsvp = 0;
		else
			tempRsvp = 1;
		let rsvpState = {
			sessionID: this.state.paramID,
			userID: this.state.userID,
			rsvpCheckin: tempRsvp,
		};
		this.RsvpCheckin(rsvpState);
	}

	RsvpCheckin(data) {

		if (this.state.found) {
			fetch('api/sessionattendance', {
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log("WIN:PUT");
				return res;
			}).catch(err => {
				console.log(err);
			});
			console.log(JSON.stringify(data));
		}
		else if (!this.state.found) {
			fetch('api/sessionattendance', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => {
				console.log("WIN:POST");
				return res;
			}).catch(err => {
				console.log(err);
			});
			console.log(JSON.stringify(data));
		}

		if (!data.rsvpCheckin) {
			document.getElementById("rsvpButton").value = "CheckIn";
		} else {
			document.getElementById("rsvpButton").value = "CheckOut";
		}
		
	}

	
    sessionDetails(data) {

        console.log(this.state.paramID);

        fetch('api/session/' + this.state.paramID, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log("WIN");
            return res;
            }).catch(err => {
                console.log(err);
            });
        console.log(JSON.stringify(data));

		this.props.history.push('/editsession?id=' + this.state.paramID);
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }


    renderScreen() {

        let options = this.state.locations.map((location) =>
            <option key={location.locationID}>{location.locationName}</option>
		);

        return (
            <div className="main">
                <h1>Session Details</h1>
                <form action="#" >
                    <div className="row">
                        <div className="col-25">
                            <label>Title</label>
                        </div>
                        <div className="col-75">
                            <label>{this.state.title}</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Start Date</label>
                        </div>
                        <div className="col-75">
                            <label>{this.state.startdate}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Start Time</label>
                        </div>
                        <div className="col-75">
                            <label>{this.state.starttime}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>End Time</label>
                        </div>
                        <div className="col-75">
                            <label>{this.state.endtime}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Location</label>
                        </div>
						<div className="col-75">
                            <label>{this.state.locChoice}</label>
                        </div>
					</div>
					<div className="row">
						<div className="col-25">
							<label>Location Address</label>
						</div>
						<div className="col-75">
							<label>{this.state.locAddress}</label>
						</div>
					</div>
                    {this.state.isAdmin &&
                        <input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Edit Session" />
					}
					{this.state.initrsvped &&
						<input type="submit" className="rsvp" id="rsvpButton" onClick={e => this.fetchSessionAttendance(e)} value="CheckOut" />
					}
					{!this.state.initrsvped &&
						<input type="submit" className="rsvp" id="rsvpButton" onClick={e => this.fetchSessionAttendance(e)} value="CheckIn"/>
					}
                </form >

            </div>
        );



    }

    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderScreen();

        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default withRouter(SessionDetails);