import React, { Component } from 'react';
import ReactTable from "react-table";
import './AppStyle.css'
import 'react-table/react-table.css'
export class UserHome extends Component {
    displayName = UserHome.name

    constructor(props) {
        super(props);
        this.state = { teamList: [], sessionList: [], loading: true, prevKey: "", userID: "", userTeamIDList: [] };

        this.fetchData();
    }

    fetchData() {

        fetch('api/user/GetCurrentUser', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ userID: response.userID });
                fetch('api/team/byuser/' + this.state.userID)
                    .then(responsetwo => responsetwo.json())
                    .then(data => {
                        console.log(data);
                        this.setState({ teamList: data });
                    });
            })
            .catch(error => console.error('Error:', error));

        //change this once session check in works.
        fetch('api/session/byevent/1')
            .then(response => response.json())
            .then(data => {
                this.setState({ sessionList: data, loading: false });
            });

    }

    renderTeamTable(teams, sessions) {

        const teamColumns = [
            {
                Header: "Team Name",
                accessor: "teamName"
            },
            {
                Header: "Team Job",
                accessor: "teamJob"
            },
            {
                id: 'emailButton',
                accessor: 'teamID',
                Cell: ({ value }) => (

                    //<asp: runat="server" Text="Send Email" OnClick="emailButton_Click" />
                    <a href="mailto:austin.young@eagles.oc.edu?Subject=Hello%20Again" target="_top">Send Email</a>
                ),
                sortable: false,
                width: 100
            },
        ];

        const sessionColumns = [
            {
                Header: "Session Name",
                accessor: "sessionName",
            },
            {
                Header: "Date",
                accessor: "formattedSessionDate",
            },
            {
                Header: "Start Time",
                accessor: "formattedStartTime",
            },
            {
                Header: "End Time",
                accessor: "formattedEndTime",
            },
        ];


        return (
            <div className="main">
                <h3>My Teams</h3>
                <ReactTable
                    data={teams}
                    columns={teamColumns}
                    defaultSorted={[
                        {
                            id: "teamName",
                            desc: false
                        }
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
                <h3>My Upcoming Sessions</h3>
                <ReactTable
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                            return {
                                onClick: (e) => {

                                    if (rowInfo.index === this.state.selected) {
                                        this.props.history.push('/sessiondetails?id=' + this.state.sessionList[rowInfo.index].sessionID);
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
                    data={sessions}
                    columns={sessionColumns}
                    defaultSorted={[
                        {
                            id: "formattedStartTime",
                            desc: false
                        }
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>
        );
    }



    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderTeamTable(this.state.teamList, this.state.sessionList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}