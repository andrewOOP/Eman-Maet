import React, { Component } from 'react';
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';
import './EventList.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class EventList extends Component {
	displayName = EventList.name

	constructor(props) {
		super(props);
        this.state = { eventList: [], loading: true, prevKey: "", selected: null, isAdmin: "", search: "" };
        this.fetchData();
    }


    fetchData() {

        console.log("FETCHING");

        fetch('api/event')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventList: data, loading: false });
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
                else { this.setState({ isAdmin: false });  }
            })
            .catch(error => console.error('Error:', error));
    }

    renderEventTable(events) {


		const columns = [
			{
				Header: "Event Name",
                accessor: "eventDescription"
			},
			{
				Header: "Event Date",
				accessor: "formattedEventDate"
			},
			{
				Header: "Start Time",
				accessor: "formattedStartTime"
            },
            {
                id: 'editButton',
                accessor: 'eventID',
                Cell: ({ value }) => (
                            <LinkContainer to={'/editevent?id=' + value}>
                                <a className="EditEvent" onClick={() => {

                                }}>Edit</a>
                            </LinkContainer>
                ),
                sortable: false,
                width: 40,
                show: this.state.isAdmin,
            },
            {//This goes to the getreport page with the given event ID
                id: 'reportButton',
                accessor: 'eventID',
                Cell: ({ value }) => (
                    <LinkContainer to={'/getreport?id=' + value}>
                        <a className="GetReport" onClick={() => {
                        }}>Get Report</a>
                    </LinkContainer>
                ),
                sortable: false,
                width: 100,
                show: this.state.isAdmin,
            },
        ];

        let data = events;
        if (this.state.search) {
            data = data.filter(row => {
                return row.eventDescription.toLowerCase().includes(this.state.search.toLowerCase());
            })
        }


		return (
			<div className="main">
                <h1>Event List</h1>
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
                                        this.props.history.push('/eventdetails?id=' + this.state.eventList[rowInfo.index].eventID);
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
								id: "eventName",
								desc: false
							}
						]}
						defaultPageSize={10}
						className="-striped -highlight"
                />
                {this.state.isAdmin &&
                    <LinkContainer to={'/createevent'}>
                        <button className="submit" type="button">Create Event</button>
                    </LinkContainer>
                } 
			</div>
		);
    }



    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderEventTable(this.state.eventList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default withRouter(EventList);