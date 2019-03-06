import React, { Component } from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router';
import './AppStyle.css'
import 'react-table/react-table.css'

export class CreateSession extends Component {
    displayName = CreateSession.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: this.getCurrentDate(),
            starttime: '12:00',
            endtime: '12:00',
            location: '',
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let submitState = {
            sessionDate: this.state.startdate,
            sessionName: this.state.title,
            startTime: this.state.starttime,
            endTime: this.state.endtime,
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
        }).then(res => {
            console.log("WIN");
            return res;
            }).catch(err => {
                console.log(err);
            });
        console.log(JSON.stringify(data));

        this.props.history.push('/eventdetails');
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }



    

    render() {

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
                          <select value={this.state.location} onChange={e => this.setState({ location: e.target.value })} id="location">
                              <option value="default">-------</option>
                              <option value="grapefruit">Grapefruit</option>
                              <option value="lime">Lime</option>
                              <option value="coconut">Coconut</option>
                              <option value="mango">Mango</option>
                          </select>
                      </div>
                  </div>
                      
                      <input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            </form >

        </div>
        );



    }
}

export default withRouter(CreateSession);