import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './UserList.css'
import './AppStyle.css'
import 'react-table/react-table.css'

export class LocationList extends Component {
    displayName = LocationList.name

    constructor(props) {
        super(props);
        this.state = { locationList: [], loading: true, prevKey: "", isAdmin: "", search: "" };

        this.fetchData();
    }

    fetchData() {
        fetch('api/location')
            .then(response => response.json())
            .then(data => {
                this.setState({ locationList: data, loading: false });
            });
        fetch('api/user/GetCurrentUser', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ isAdmin: response.securityRole });
                if (this.state.isAdmin === "Administrator") {
                    this.setState({ isAdmin: true });
                }
                else { this.setState({ isAdmin: false }); }
            })
            .catch(error => console.error('Error:', error));
    }

    renderLocationTable(locations)
    {
        this.state.isAdmin;
        const columns = [
            {
                Header: "Name",
                accessor: "locationName"
            },
            {
                Header: "City",
                accessor: "city"
            },
            {
                Header: "State",
                accessor: "state"
            },
            {
                id: 'editButton',
                accessor: 'locationID',
                Cell: ({ value }) => (

                    <LinkContainer to={'/editlocation?id=' + value}>
                        <a className="EditLocation" onClick={() => {

                            console.log(value);

                        }}>Edit</a>
                    </LinkContainer>
                ),
                sortable: false,
                width: 40,
                show: this.state.isAdmin
            },
        ];

        let data = locations;
        if (this.state.search) {
            data = data.filter(row => {
                return row.locationName.toLowerCase().includes(this.state.search.toLowerCase()) || row.city.toLowerCase().includes(this.state.search.toLowerCase()) || row.state.toLowerCase().includes(this.state.search.toLowerCase());
            })
        }

        return (
            <div className="main">
                <h1>Location List</h1>
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
                            id: "locationName",
                            desc: false
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                {this.state.isAdmin &&
                    <LinkContainer to={'/createlocation'}>
                        <button className="submit" type="button">Create Location</button>
                    </LinkContainer>
                }
            </div>
        );
    }
   


    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderLocationTable(this.state.locationList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}