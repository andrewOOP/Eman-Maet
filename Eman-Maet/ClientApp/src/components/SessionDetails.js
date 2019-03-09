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
            locations: [],
			loading: true,
			rsvped: false,
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
                this.setState({ paramID: params.id, title: data.sessionName, startdate: data.sessionDate.substr(0, 10), starttime: data.startTime.substr(11, 100), endtime: data.endTime.substr(11, 100), locID: data.locationID })
                fetch('api/location/' + this.state.locID)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({ locChoice: data.locationName, loading: false })
                    });
			});
		fetch('api/sessionattendance/' + params.id + '/' + 1)
			.then(response => response.json())
			.then(data => {
				this.setState({ locations: data.rsvpCheckin })
			});

		console.log(this.state.rsvped);
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

	handleFormRsvp(event) {
		event.preventDefault();
		let rsvpState = {
			sessionID: this.state.paramID,
			userID: 1, //This is gonna be where we put the UserID that we get from the session variable
			rsvpCheckin: true,
		};
		this.RsvpCheckin(rsvpState);
	}

	RsvpCheckin(data) {

		console.log(this.state.paramID);

		fetch('api/sessionattendance', {
				method: 'POST',
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


		this.props.history.push('/sessiondetails?id=' + this.state.paramID);
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
                            <input type="text" placeholder="Event Name"
                                value={this.state.title}
								onChange={e => this.setState({ title: e.target.value })}
								disabled
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Start Date</label>
                        </div>
                        <div className="col-75">
                            <input type="date" id="startdate" name="startdate"
                                value={this.state.startdate}
								onChange={e => this.setState({ startdate: e.target.value })}
								disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Start Time</label>
                        </div>
                        <div className="col-75">
                            <input type="time" id="starttime" name="starttime"
                                value={this.state.starttime}
								onChange={e => this.setState({ starttime: e.target.value })}
								disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>End Time</label>
                        </div>
                        <div className="col-75">
                            <input type="time" id="endtime" name="endtime"
                                value={this.state.endtime}
								onChange={e => this.setState({ endtime: e.target.value })}
								disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Location</label>
                        </div>
						<div className="col-75">
							<select value={this.state.locChoice} onChange={e => this.setState({ locChoice: e.target.value, locID: e.target.selectedIndex + 1 })} id="location" disabled>
                                {options}
                            </select>
                        </div>
                    </div>

					<input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Edit Session" />
					<input className="rsvp" type="submit" onClick={e => this.handleFormRsvp(e)} value="Rsvp/Check-in" />
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