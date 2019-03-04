import React, { Component } from 'react';
import ReactTable from "react-table";
import './CreateEvent.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class EventDetails extends Component
{
    displayName = EventDetails.name

    constructor(props) {
        super(props);
        this.state = {
            title: 'code-a-thon',
            startdate: this.getCurrentDate(),
            enddate: this.getCurrentDate(),
            starttime: '12:00',
            location: '',
            selected: {},
            selectAll: 0,
            userList: [],
            loading: true,
        }

        fetch('api/user')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(firstName)
    {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    toggleSelectAll()
    {
        let newSelected = {};

        if (this.state.selectAll === 0)
        {
            this.state.userList.forEach(x => {
                newSelected[x.userID] = true;
            });
        }

        this.setState({
            selected: newSelected,
            selectAll: this.state.selectAll === 0 ? 1 : 0
        });
    }

    handleFormSubmit(event) {
        event.preventDefault();
        let submitState = {
            eventDate: this.state.startdate,
            eventDescription: this.state.title,
            startTime: this.state.starttime,
        };
        this.createEvent(submitState);
    }

    createEvent(data) {

        fetch('api/event', {
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
                accessor: "fName",
            }
        ];


        return (


            <div className="main">
                <h1>Event Details</h1>
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
                    <div className="row">
                        <div className="col-25">
                            <label>Event Coordinators</label><br />
                        </div>
                    </div>
                    {/* This is a table*/}
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

                    <br /><input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
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
