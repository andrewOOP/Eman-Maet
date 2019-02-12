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
            selected: {},
            selectAll: 0,
        }

        this.data = makeData(22);

        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(firstName) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll() {
        let newSelected = {};

        if (this.state.selectAll === 0) {
            this.state.data.forEach(x => {
                newSelected[x.id] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }



    render() {


        const columns = [
            {
                        id: "checkbox",
                        accessor: "",
                        Cell: ({ original }) => {
                            return (
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={this.state.selected[original.id] === true}
                                    onChange={() => this.toggleRow(original.id)}
                                />
                            );
                        },
                        Header: x => {
                            return (
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={this.state.selectAll === 1}
                                    ref={input => {
                                        if (input) {
                                            input.indeterminate = this.state.selectAll === 2;
                                        }
                                    }}
                                    onChange={() => this.toggleSelectAll()}
                                />
                            );
                        },
                        sortable: false,
                        width: 45
                    },
                    {
                        Header: "First Name",
                        accessor: "firstName"
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName",
                    },
                    {
                        Header: "Status",
                        accessor: "status"
                    }
                ];


      return (


        <div id="everything">
            <h1>Create Event</h1>
              <form action="#" >
                  <div class="row">
                      <div class="col-25">
                          <label>Title</label>
                      </div>
                      <div class="col-75">
                <input type="text" id="title" name="eventtitle" placeholder="Event Name"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
                          />
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-25">
                          <label>Start Date</label>
                      </div>
                      <div class="col-75">
                        <input type="date" id="startdate" name="startdate"
                            value={this.state.startdate}
                            onChange={e => this.setState({ startdate: e.target.value })}
                          />
                      </div>
                  </div>

                  <div class="row">
                      <div class="col-25">
                          <label>End Date</label>
                      </div>
                      <div class="col-75">
                          <input type="date" id="enddate" name="enddate"
                              value={this.state.enddate}
                              onChange={e => this.setState({ enddate: e.target.value })}
                          />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-25">
                          <label>Start Time</label>
                      </div>
                      <div class="col-75">
                          <input type="time" id="starttime" name="starttime"
                              value={this.state.starttime}
                              onChange={e => this.setState({ starttime: e.target.value })}
                          />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-25">
                          <label>Max Attendance</label>
                      </div>
                      <div class="col-75">
                          <input type="number" id="maxattendance" name="maxattendance"
                              value={this.state.maxattendance}
                              onChange={e => this.setState({ maxattendance: e.target.value })}
                          />
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-25">
                          <label>Location</label>
                      </div>
                      <div class="col-75">
                          <select value={this.state.location} onChange={e => this.setState({ location: e.target.value })} id="location">
                              <option value="default">-------</option>
                              <option value="grapefruit">Grapefruit</option>
                              <option value="lime">Lime</option>
                              <option value="coconut">Coconut</option>
                              <option value="mango">Mango</option>
                          </select>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-25">
                          <label>Event Coordinators</label><br />
                      </div>
                  </div>
                  <div id="table-container">
                      <ReactTable
                          data={this.data}
                          columns={columns}
                          defaultSorted={[
                              {
                                  id: "lastName",
                                  desc: false
                              }
                          ]}
                          defaultPageSize={10}
                          className="-striped -highlight"
                      />
                    </div>

                <br /><input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            </form >

        </div>
    );
  }
}
