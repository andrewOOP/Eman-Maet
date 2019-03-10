import React, { Component } from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router';
import './CreateEvent.css'
import './AppStyle.css'
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
            selected: {},
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

    toggleRow(firstName) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
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

            res.json().then(data => {

            for (var property in this.state.selected) {
                let id = Object.values(property)[0];

                if (this.state.selected[id]) {

                    console.log("data");
                    console.log(data);

                    let submitState = {
                        eventID: data,
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
                }

                }

            })


            return res;
        }).catch(err => {
            console.log(err);
        });




        
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
            <h1>Create Event</h1>
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
                      <input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
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

export default withRouter(CreateEvent);