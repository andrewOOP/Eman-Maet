import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import './EventList.css'
import 'react-table/react-table.css'

export class EventList extends Component {
	displayName = EventList.name

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			startdate: this.getCurrentDate(),
			enddate: this.getCurrentDate(),
			starttime: '12:00',
			maxattendance: '1',
			location: '',
			data: makeData(22),
		}
	}

	handleFormSubmit(event) {
		event.preventDefault();
		console.log(this.state);
	}

	getCurrentDate() {
		return new Date().toISOString().substr(0, 10);
	}



	render() {
		return (
			<div>
				<h1>Event List</h1>
				<div id="table-container">
					<ReactTable
						data={this.state.data}
						columns={[
							{
								columns: [
									{
										Header: "Event Name",
										accessor: "eventName"
									},
									{
										Header: "Event Date",
										accessor: "evetnDate"
									},
									{
										Header: "Event Desrciption",
										accessor: "eventDescription"
									},
									{
										Header: "Inactive?",
										accessor: "inactive"
									}
								]
							}
						]}
						defaultSorted={[
							{
								id: "eventName",
								desc: false
							}
						]}
						className="-striped -highlight"
					/>
				</div>

			</div>
		);
	}
}