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
		}
	}





	render() {


		const columns = [
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
		];

		return (
			<div>
				<h1>Event List</h1>
				<div id="table-container">
					<ReactTable
						data={this.data}
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

			</div>
		);
	}
}