import React, { Component } from 'react';
import ReactTable from "react-table";
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import './EditTeam.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class EditTeam extends Component {
    displayName = EditTeam.name

    constructor(props) {
        super(props);
        this.state = {
            teamName: '',
            teamJob: '',
            selected: {},
            userList: [],
            paramID: -1,
            loading: true,
        }

        const params = qs.parse(this.props.location.search);

        fetch('api/team/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ paramID: params.id, teamName: data.teamName, teamJob: data.teamJob })
            });

        fetch('api/userteam/' + params.id)
            .then((response) => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then(data => {
                console.log(data);
                data.forEach(x => {
                    this.toggleRow(x.userID);
                });
            })
            .catch((error) => {
                console.log('error: ' + error);
            });

        fetch('api/user')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });

        this.toggleRow = this.toggleRow.bind(this);
    }

    toggleRow(userID) {
        const newSelected = Object.assign(this.state.selected);
        newSelected[userID] = !this.state.selected[userID];
        this.setState({
            selected: newSelected,
        });
    }

    handleFormSubmit(team) {
        team.preventDefault();

        let submitState = {
            teamName: this.state.teamName,
            teamJob: this.state.teamJob,
        };
        this.editTeam(submitState);
    }

    deleteTeam(team) {
        team.preventDefault();

        if (!window.confirm('Are you sure you want to delete this team?')) {
            return;
        } else {

            fetch('api/team/' + this.state.paramID, {
                method: 'DELETE'
            }).then(res => {
                return res;
            }).catch(err => {
                console.log(err);
                });




            this.props.history.push('/teamlist');
        }
    }

    editTeam(data) {

        fetch('api/team/' + this.state.paramID, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
            }).catch(err => {
                console.log(err);
            });
        
        for (var property in this.state.selected) {
            let id = Object.values(property)[0];

            if (this.state.selected[id]) {
                

                fetch('api/userteam/byIDs?teamID=' + this.state.paramID + '&userID=' + id)
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status);
                        else return response.json();
                    })
                    .catch((error) => {
                        //Not found, so add it
                        console.log("add in " + id);

                        let submitState = {
                            teamID: this.state.paramID,
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
                    });


            } else {

                fetch('api/userteam/byIDs?teamID=' + this.state.paramID + '&userID=' + id)
                    .then((response) => {
                        if (!response.ok) throw new Error(response.status);
                        else return response.json();
                    })
                    .then((data) => {

                        //Found, remove it
                        console.log(data);

                        fetch('api/userteam/' + data.userTeamID, {
                            method: 'DELETE'
                        }).then(res => {
                            return res;
                        }).catch(err => {
                            console.log(err);
                        });
                    })
                    .catch((error) => {

                    });

                
            }
            
        }


        this.props.history.push('/teamlist');
    }

    //getCurrentDate() {
    //    return new Date().toISOString().substr(0, 10);
    //}



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


      return (


          <div className="main">
            <h1>Edit Team</h1>
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
                      <ReactTable
                          data={users}
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
                  <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
                  <input className="delete" type="submit" onClick={e => this.deleteTeam(e)} value="Delete" />
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

export default withRouter(EditTeam);