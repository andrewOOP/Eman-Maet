import React, { Component } from 'react';
import ReactTable from "react-table";
import './EventList.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class EventList extends Component {
	displayName = EventList.name

	constructor(props) {
		super(props);
        this.state = { eventList: [], loading: true };

        fetch('api/event')
            .then(response => response.json())
            .then(data => {
                this.setState({ eventList: data, loading: false });
            });
	}





    static renderEventTable(events) {

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
			}
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