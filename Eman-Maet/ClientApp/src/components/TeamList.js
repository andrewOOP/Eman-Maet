import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './TeamList.css'
import './AppStyle.css'
import 'react-table/react-table.css'
import { EditTeam } from './EditTeam';

export class TeamList extends Component {
	displayName = TeamList.name

    constructor(props) {
        super(props);
		this.state = { teamList: [], loading: true, prevKey: "", userID: "", isAdmin: "", userTeamIDList: []};

        this.fetchData();
    }

    fetchData() {


        fetch('api/user/GetCurrentUser', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ isAdmin: response.securityRole, userID: response.userID });
                if (this.state.isAdmin === "Administrator") {
                    this.setState({ isAdmin: true });
                    fetch('api/team')
                        .then(response => response.json())
                        .then(data => {
                            this.setState({ teamList: data, loading: false });
                        });
                }
                else {
                    this.setState({ isAdmin: false });
                    fetch('api/team/' + this.state.userID)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.setState({ teamList: data, loading: false });
                        });
                }
            })
            .catch(error => console.error('Error:', error));

    }

    renderTeamTable(teams) {

		const columns = [
			{
				Header: "Team Name",
                accessor: "teamName"
			},
			{
				Header: "Team Job",
				accessor: "teamJob"
			},
            {
                id: 'editButton',
                accessor: 'teamID',
                Cell: ({ value }) => (
                    <LinkContainer to={'/editteam?id=' + value}>
                        <a className="EditTeam" onClick={() => {

                        }}>Edit</a>
                    </LinkContainer>
                ),
                sortable: false,
				width: 40,
				show: this.state.isAdmin,
            },
		];


		return (
			<div className="main">
				<h1>Team List</h1>
					<ReactTable
                    data={teams}
						columns={columns}
						defaultSorted={[
							{
								id: "teamName",
								desc: false
							}
						]}
						defaultPageSize={10}
						className="-striped -highlight"
                />
				{this.state.isAdmin &&
					<LinkContainer to={'/createteam'}>
						<button className="submit" type="button">Create Team</button>
					</LinkContainer>
				}
			</div>
		);
    }



    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderTeamTable(this.state.teamList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}