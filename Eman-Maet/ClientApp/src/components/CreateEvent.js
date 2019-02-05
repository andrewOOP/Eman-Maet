import React, { Component } from 'react';

export class CreateEvent extends Component {
    displayName = CreateEvent.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: this.getCurrentDate(),
            enddate: this.getCurrentDate(),
            starttime: '12:00',
            maxattendance: '1',
            location: '',
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }

  render() {
    return (
        <div>
            <h1>Create Event</h1>
            <form action="#" >
                <br /><label>Title</label><br />
                <input type="text" id="title" name="eventtitle" placeholder="Event Name"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                /><br />
                <br /><label>Start Date</label><br />
                <input type="date" id="startdate" name="startdate"
                    value={this.state.startdate}
                    onChange={e => this.setState({ startdate: e.target.value })}
                /><br />
                <br /><label>End Date</label><br />
                <input type="date" id="enddate" name="enddate"
                    value={this.state.enddate}
                    onChange={e => this.setState({ enddate: e.target.value })}
                /><br />
                <br /><label>Start Time</label><br />
                <input type="time" id="starttime" name="starttime"
                    value={this.state.starttime}
                    onChange={e => this.setState({ starttime: e.target.value })}
                /><br />
                <br /><label>Max Attendance</label><br />
                <input type="number" id="maxattendance" name="maxattendance"
                    value={this.state.maxattendance}
                    onChange={e => this.setState({ maxattendance: e.target.value })}
                /><br />
                <br /><label>Location</label><br />
                <select value={this.state.location} onChange={e => this.setState({ location: e.target.value })} id="location">
                    <option value="default">-------</option>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select><br />
            
                <br /><input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            </form >

        </div>
    );
  }
}
