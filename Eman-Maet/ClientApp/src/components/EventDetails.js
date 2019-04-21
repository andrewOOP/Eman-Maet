import React, { Component } from 'react';
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './AppStyle.css'
import 'react-table/react-table.css'

export class EventDetails extends Component
{
    displayName = EventDetails.name

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            startdate: '',
            starttime: '',
            sessionList: [],
            eventcoordList: [],
            isAdmin: '',
            paramID: -1,
            loading: true,
        }

        const params = qs.parse(this.props.location.search);

        fetch('api/event/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ paramID: params.id, title: data.eventDescription, startdate: data.formattedEventDate, starttime: data.formattedStartTime, search: "" })
            });

        fetch('api/user/coordinator/' + params.id)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ eventcoordList: data });
            })
            .catch((error) => {
                console.log('error: ' + error);
            });


        fetch('api/session/byevent/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ sessionList: data, loading: false });
            });

        fetch('api/user/GetCurrentUser', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ isAdmin: response.securityRole });
                if (this.state.isAdmin === "Administrator") {
                    this.setState({ isAdmin: true });
                }
                else { this.setState({ isAdmin: false }); }
            })
            .catch(error => console.error('Error:', error));
    }

    renderUserTable(sessions) {


        const columns = [
            {
                Header: "Session Name",
                accessor: "sessionName",
            },
            {
                Header: "Date",
                accessor: "formattedSessionDate",
            },
            {
                Header: "Start Time",
                accessor: "formattedStartTime",
            },
            {
                Header: "End Time",
                accessor: "formattedEndTime",
            },
            {
                id: 'editButton',
                accessor: 'sessionID',
                Cell: ({ value }) => (
                    <LinkContainer to={'/editsession?id=' + value}>
                        <a className="EditSession" onClick={() => {

                        }}>Edit</a>
                    </LinkContainer>
                ),
                sortable: false,
                width: 40,
                show: this.state.isAdmin,
            },
        ];

        const eventCoordColumns = [
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

        let data = sessions;
        if (this.state.search) {
            data = data.filter(row => {
                return row.sessionName.toLowerCase().includes(this.state.search.toLowerCase());
            })
        }


        return (


            <div className="main">
                <h1>Event Details</h1>
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
                            <label>Event Sessions</label><br />
                        </div>
                </div>

                <Tabs>
                    <TabList>
                        <Tab>Sessions</Tab>
                        <Tab>Event Coordinators</Tab>
                    </TabList>

                    <TabPanel>
                        <label>Search: </label>
                        <input
                            value={this.state.search}
                            onChange={e => this.setState({ search: e.target.value })}
                        />
                        <ReactTable
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: (e) => {

                                            if (rowInfo.index === this.state.selected) {
                                                this.props.history.push('/sessiondetails?id=' + this.state.sessionList[rowInfo.index].sessionID);
                                            }

                                            this.setState({
                                                selected: rowInfo.index
                                            })
                                        },
                                        style: {
                                            background: rowInfo.index === this.state.selected ? '#b2b2b2' : 'white',
                                        }
                                    }
                                } else {
                                    return {}
                                }
                            }
                            }
                            data={data}
                            columns={columns}
                            defaultSorted={[
                                {
                                    id: "formattedStartTime",
                                    desc: false
                                }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                        {this.state.isAdmin &&
                            <LinkContainer to={'/createsession'}>
                                <button className="submit" type="button">Create Session</button>
                            </LinkContainer>
                        }
                    </TabPanel>
                    <TabPanel>
                        <ReactTable
                            data={this.state.eventcoordList}
                            columns={eventCoordColumns}
                            defaultSorted={[
                                {
                                    id: "lName",
                                    desc: false
                                }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </TabPanel>
                </Tabs>

              
            </div>
        );



    }
    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderUserTable(this.state.sessionList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default withRouter(EventDetails);