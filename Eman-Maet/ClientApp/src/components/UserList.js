import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import './UserList.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class UserList extends Component {
	displayName = UserList.name

	constructor(props) {
		super(props);
        this.state = { userList: [], loading: true };

        fetch('api/user')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });
	}





    static renderUserTable(users) {

		const columns = [
			{
				Header: "First Name",
                accessor: "userFirstName"
			},
			{
				Header: "Last Name",
				accessor: "userLastName"
			},
			{
				Header: "Email",
				accessor: "email"
			}
		];


		return (
			<div className="main">
				<h1>User List</h1>
					<ReactTable
                    data={users}
						columns={columns}
						defaultSorted={[
							{
								id: "userName",
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
            ? <p><em></em></p>
            : UserList.renderEventTable(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}