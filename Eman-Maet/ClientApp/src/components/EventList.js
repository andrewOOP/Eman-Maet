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
        this.state = { eventList: [], loading: true, prevKey: "", selected: null };
        
        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (this.state.prevKey !== this.props.location.key) {
            this.fetchData();
            this.setState({ prevKey: this.props.location.key, selected: null });
        }
    }


    fetchData() {
        fetch('api/event')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventList: data, loading: false });
            });
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
                width: 40
            },
		];


		return (
			<div className="main">
				<h1>Event List</h1>
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
                    data={events}
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
                <LinkContainer to={'/createevent'}>
                    <button className="submit" type="button">Create Event</button>
                </LinkContainer>

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