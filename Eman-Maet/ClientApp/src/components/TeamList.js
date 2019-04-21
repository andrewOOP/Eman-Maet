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
                    fetch('api/team/byuser/' + this.state.userID)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.setState({ teamList: data, loading: false });
                        });
                }
            })
            .catch(error => console.error('Error:', error));

    }

    getEmail(value) {
        fetch('api/teamemail/getteamemail/' + value)
            .then(response => response.json())
            .then(data => {
               console.log(data);
                this.setState({ sendTo: data });
            });
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
            {
                id: 'emailButton',
                accessor: 'teamID',
                Cell: ({ value }) => (
                    <LinkContainer to={'/teamemail?id=' + value}>
                        <a classTeam="TeamEmail" onClick={() => {
                            this.getEmail(value);
                        }}>Send Email</a>
                    </LinkContainer>
//                    <a href="mailto:austin.young@eagles.oc.edu?Subject=Hello%20Again" target="_top">Send Email</a>
                ),
                sortable: false,
                width: 100
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