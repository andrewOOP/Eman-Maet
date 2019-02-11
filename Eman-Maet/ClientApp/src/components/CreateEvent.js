import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import './CreateEvent.css'
import 'react-table/react-table.css'

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
            data: makeData(22),
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

        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }]

        const columns = [{
            Header: 'Name',
            accessor: 'name' // String-based value accessors!
        }, {
            Header: 'Age',
            accessor: 'age',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name // Custom value accessors!
        }, {
            Header: props => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age'
        }]


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
                  <div id="table-container">
                  <ReactTable
                      data={data}
                          columns={columns}
                          defaultPageSize={10}
                  />
                  </div>
                <br /><input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            </form >

        </div>
    );
  }
}
