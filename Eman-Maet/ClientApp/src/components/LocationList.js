import React, { Component } from 'react';
import { makeData } from "../Utils";
import ReactTable from "react-table";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './UserList.css'
import './AppStyle.css'
import 'react-table/react-table.css'
import { EditUser } from './EditUser';

export class LocationList extends Component {
    displayName = LocationList.name

    constructor(props) {
        super(props);
        this.state = { locationList: [], loading: true, prevKey: "" };

        this.fetchData();
    }

    fetchData() {
        fetch('api/location')
            .then(response => response.json())
            .then(data => {
                this.setState({ locationList: data, loading: false });
            });
    }

    static renderLocationTable(locations)
    {
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
                width: 40
            },
        ];


        return (
            <div className="main">
                <h1>Location List</h1>
                <ReactTable
                    data={locations}
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
                <LinkContainer to={'/createlocation'}>
                    <button className="submit" type="button">Create Location</button>
                </LinkContainer>
            </div>
        );
    }
   


    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : LocationList.renderLocationTable(this.state.locationList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}