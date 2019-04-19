import React, { Component } from 'react';
import ReactTable from "react-table";
import { withRouter } from 'react-router';
import './CreateTeam.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class CreateTeam extends Component {
    displayName = CreateTeam.name

    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
            teamJob: '',
            selected: {},
            userList: [],
            loading: true,
            search: "",
        }

        fetch('api/user')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(firstName) {
        const newSelected = Object.assign({}, this.state.selected);
        newSelected[firstName] = !this.state.selected[firstName];
        this.setState({
            selected: newSelected,
            selectAll: 2
        });
    }

    handleFormSubmit(team) {
        team.preventDefault();
        let submitState = {
            teamName: this.state.teamName,
            teamJob: this.state.teamJob,
        };
        this.createTeam(submitState);
    }

    createTeam(data) {

        fetch('api/team', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {

            res.json().then(data => {

            for (var property in this.state.selected) {
                let id = Object.values(property)[0];

                if (this.state.selected[id]) {

                    console.log("data");
                    console.log(data);

                    let submitState = {
                        teamID: data,
                        userID: id,
                    };

                    fetch('api/userteam', {
                        method: 'POST',
                        body: JSON.stringify(submitState),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        console.log(JSON.stringify(submitState));
                        return res;
                    }).catch(err => {
                        console.log(err);
                    });
                }

                }

            })


            return res;
        }).catch(err => {
            console.log(err);
        });




        
        this.props.history.push('/teamlist');
    }

    getCurrentDate() {
        return new Date().toISOString().substr(0, 10);
    }



    renderUserTable(users) {


        const columns = [
            {
                        id: "checkbox",
                        accessor: "",
                        Cell: ({ original }) => {
                            return (
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={this.state.selected[original.userID] === true}
                                    onChange={() => this.toggleRow(original.userID)}
                                />
                            );
                        },
                        sortable: false,
                        width: 45
                    },
                    {
                        Header: "First Name",
                        accessor: "fName",
                    },
                    {
                        Header: "Last Name",
                        accessor: "lName",
                    },
                    {
                        Header: "Email",
                        accessor: "email",
                    }
                ];

        let data = users;
        if (this.state.search) {
            data = data.filter(row => {
                return row.fName.toLowerCase().includes(this.state.search.toLowerCase()) || row.lName.toLowerCase().includes(this.state.search.toLowerCase());
            })
        }

      return (


          <div className="main">
            <h1>Create Team</h1>
              <form action="#" >
                  <div className="row">
                      <div className="col-25">
                          <label>Team Name</label>
                      </div>
                      <div className="col-75">
                          <input type="text" placeholder="Team Name"
                              value={this.state.teamName}
                onChange={e => this.setState({ teamName: e.target.value })}
                          />
                      </div>
                  </div>

                  <div className="row">
                      <div className="col-25">
                          <label>Team Job</label>
                      </div>
                      <div className="col-75">
                        <input type="text" placeholder="Team Job"
                            value={this.state.teamJob}
                            onChange={e => this.setState({ teamJob: e.target.value })}
                          />
                      </div>
                  </div>
             
                  <div className="row">
                      <div className="col-25">
                          <label>Team Members</label><br />
                      </div>
                  </div>
                  <label>Search: </label>
                  <input
                      value={this.state.search}
                      onChange={e => this.setState({ search: e.target.value })}
                  />
                      <ReactTable
                          data={data}
                          columns={columns}
                          defaultSorted={[
                              {
                                  id: "lastName",
                                  desc: false
                              }
                          ]}
                          defaultPageSize={10}
                          className="-striped -highlight"
                      />
                      <input id="submit" type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
            </form >

        </div>
        );



    }
    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderUserTable(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default withRouter(CreateTeam);