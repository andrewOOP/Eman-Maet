import React, { Component } from 'react';
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './EventList.css'
import './AppStyle.css'
import 'react-table/react-table.css'
import { EditEvent } from './EditEvent';

export class EventList extends Component {
	displayName = EventList.name

	constructor(props) {
		super(props);
        this.state = { eventList: [], loading: true, prevKey: "" };

        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState)
    {
        // only update chart if the data has changed
        if (this.state.prevKey !== this.props.location.key)
        {
            this.fetchData();
            this.setState({ prevKey: this.props.location.key });
        }
    }


    fetchData()
    {
        fetch('api/event')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventList: data, loading: false });
            });
    }

    static renderEventTable(events)
    {

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
            : EventList.renderEventTable(this.state.eventList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}