import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './AppStyle.css'

export class CreateSession extends Component {
    displayName = CreateSession.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: this.getCurrentDate(),
            starttime: '12:00',
            endtime: '12:00',
            locChoice: '',
            locIndex: 1,
            locations: [],
            loading: true,
        }

        console.log(this.state.eventID);

        fetch('api/location')
            .then(response => response.json())
            .then(data => {
                this.setState({ locations: data, loading: false });
            });

    }

    handleFormSubmit(event) {
        event.preventDefault();
        let submitState = {
            sessionDate: this.state.startdate,
            sessionName: this.state.title,
            startTime: this.state.starttime,
            endTime: this.state.endtime,
            locationID: this.state.locIndex,
        };
        this.createSession(submitState);
    }

    createSession(data) {

        fetch('api/session', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseData) => {
                this.props.history.push('/eventdetails?id=' + responseData);
            })
            .catch(error => console.warn(error));

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
            <h1>Create Session</h1>
              <form action="#" >
                  <div className="row">
                      <div className="col-25">
                          <label>Title</label>
                      </div>
                      <div className="col-75">
                          <input type="text" placeholder="Event Name"
                              value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
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
                            />
                        </div>
                    </div>
                  <div className="row">
                      <div className="col-25">
                          <label>Location</label>
                      </div>
                        <div className="col-75">
                            <select value={this.state.locChoice} onChange={e => this.setState({ locChoice: e.target.value, locIndex: e.target.selectedIndex+1 })} id="location">
                                {options}
                          </select>
                      </div>
                  </div>
                      
                      <input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
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

export default withRouter(CreateSession);