import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './TeamList.css'
import './AppStyle.css'
import 'react-table/react-table.css'
import { EditTeam } from './EditTeam';

export class TeamList extends Component {
	displayName = TeamList.name

    constructor(props) {
        super(props);
        this.state = { teamList: [], loading: true, prevKey: "" };

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
        fetch('api/team')
            .then(response => response.json())
            .then(data => {
                this.setState({ teamList: data, loading: false });
            });
    }

    static renderTeamTable(teams) {

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
                <LinkContainer to={'/createteam'}>
                    <button className="submit" type="button">Create Team</button>
                </LinkContainer>
			</div>
		);
    }



    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : TeamList.renderTeamTable(this.state.teamList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}