import React, { Component } from 'react';
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
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
            startdate: '',
            starttime: '',
            sessionList: [],
            isAdmin: '',
            paramID: -1,
            loading: true,
        }

        const params = qs.parse(this.props.location.search);

        fetch('api/event/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ paramID: params.id, title: data.eventDescription, startdate: data.formattedEventDate, starttime: data.formattedStartTime })
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
            }
        ];


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
                        data={sessions}
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