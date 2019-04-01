﻿import React, { Component } from 'react';
import ReactTable from "react-table";
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import './AppStyle.css'
import 'react-table/react-table.css'

export class EventDetails extends Component
{
    displayName = EventDetails.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: this.getCurrentDate(),
            enddate: this.getCurrentDate(),
            starttime: '12:00',
            selected: {},
            userList: [],
            paramID: -1,
            loading: true,
        }

        const params = qs.parse(this.props.location.search);

        fetch('api/event/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ paramID: params.id, title: data.eventDescription, startdate: data.eventDate.substr(0, 10), starttime: data.startTime.substr(11, 100) })
            });

        fetch('api/eventcoordinator/' + params.id)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                console.log(data);
                data.forEach(x => {
                    this.toggleRow(x.userID);
                });
            })
            .catch((error) => {
                console.log('error: ' + error);
            });

        fetch('api/user')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(userID) {
        const newSelected = Object.assign(this.state.selected);
        newSelected[userID] = !this.state.selected[userID];
        this.setState({
            selected: newSelected,
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();

        let submitState = {
            eventDate: this.state.startdate,
            eventDescription: this.state.title,
            startTime: this.state.starttime,
        };
        this.editEvent(submitState);
    }

    deleteEvent(event) {
        event.preventDefault();

        if (!window.confirm('Are you sure you want to delete this event?')) {
            return;
        } else {

            fetch('api/event/' + this.state.paramID, {
                method: 'DELETE'
            }).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
            });




            this.props.history.push('/eventlist');
        }
    }

    editEvent(data) {

        fetch('api/event/' + this.state.paramID, {
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

        for (var property in this.state.selected) {
            let id = Object.values(property)[0];

            if (this.state.selected[id]) {


                fetch('api/eventcoordinator/byIDs?eventID=' + this.state.paramID + '&userID=' + id)
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status);
                        else return response.json();
                    })
                    .catch((error) => {
                        //Not found, so add it
                        console.log("add in " + id);

                        let submitState = {
                            eventID: this.state.paramID,
                            userID: id,
                        };

                        fetch('api/eventcoordinator', {
                            method: 'POST',
                            body: JSON.stringify(submitState),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(res => {
                            console.log(JSON.stringify(submitState));
                            return res;
                        }).catch(err => {
                            console.log(err);
                        });
                    });


            } else {

                fetch('api/eventcoordinator/byIDs?eventID=' + this.state.paramID + '&userID=' + id)
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status);
                        else return response.json();
                    })
                    .then((data) => {

                        //Found, remove it
                        console.log(data);

                        fetch('api/eventcoordinator/' + data.eventCoordinatorId, {
                            method: 'DELETE'
                        }).then(res => {
                            return res;
                        }).catch(err => {
                            console.log(err);
                        });
                    })
                    .catch((error) => {

                    });


            }

        }


        this.props.history.push('/eventlist');
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }



    renderUserTable(users) {


        const columns = [
            {
                id: "checkbox",
                accessor: "",
                Cell: ({ original }) => {
                    return (
                        <input
                            type="checkbox"
                            className="checkbox"
                            checked={this.state.selected[original.userID] === true}
                            onChange={() => this.toggleRow(original.userID)}
                        />
                    );
                },

                sortable: false,
                width: 45
            },
            {
                Header: "First Name",
                accessor: "fName",
            },
            {
                Header: "Last Name",
                accessor: "lName",
            },
            {
                Header: "Email",
                accessor: "email",
            }
        ];


        return (


            <div className="main">
                <h1>Edit Event</h1>
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
                            <label>Event Coordinators</label><br />
                        </div>
                    </div>
                    <ReactTable
                        data={users}
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
                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                    <input className="delete" type="submit" onClick={e => this.deleteEvent(e)} value="Delete" />
                </form >

            </div>
        );



    }
    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderUserTable(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default withRouter(EventDetails);