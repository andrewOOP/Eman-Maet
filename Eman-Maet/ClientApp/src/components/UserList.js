import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './UserList.css'
import './AppStyle.css'
import 'react-table/react-table.css'
import { EditUser } from './EditUser';

export class UserList extends Component {
	displayName = UserList.name

    constructor(props) {
        super(props);
        this.state = { userList: [], loading: true, prevKey: "" };

        this.fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (this.state.prevKey !== this.props.location.key) {
            this.fetchData();
            this.setState({ prevKey: this.props.location.key });
        }
    }

    fetchData() {
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
                accessor: "fName"
			},
			{
				Header: "Last Name",
				accessor: "lName"
			},
			{
				Header: "Email",
				accessor: "email"
            },
            {
                id: 'editButton',
                accessor: 'userID',
                Cell: ({ value }) => (
                    
                    <LinkContainer to={'/edituser?id=' + value}>
                        <a className="EditUser" onClick={() => {

                            console.log(value);

                        }}>Edit</a>
                        </LinkContainer>
                ),
                sortable: false,
                width: 40
            },
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
                <LinkContainer to={'/createuser'}>
                    <button className="submit" type="button">Create User</button>
                </LinkContainer>
			</div>
		);
    }



    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : UserList.renderUserTable(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}