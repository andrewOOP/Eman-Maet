import React, { Component } from 'react';
import ReactTable from "react-table";
import * as qs from 'query-string';
import { withRouter } from 'react-router';
import './AppStyle.css'
import 'react-table/react-table.css'

export class GetReport extends Component {
    displayName = GetReport.name

    constructor(props)
    {
        super(props);
        this.state = {
            title: '',
            loading: true,
        }

        fetch('api/getreport')
            .then(response => response.json())
            .then(data => {
                this.setState({ userList: data, loading: false });
            });
        //                    <input type="submit" onClick={e => this.handleFormSubmit(e)} value="GetPDF" />

    }


    renderReport(users) {

        const columns = [
           
            {
                Header: "EventTitle",
                accessor: "eventDescription",
            },
            {
                Header: "Attendance",
                accessor: "visitorCount",
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
                <h1>Attandance Report</h1>
                <form action="#" >
                    <ReactTable
                        data={data}
                        columns={columns}
                        defaultSorted={[
                            {
                                id: "eventDescription",
                                desc: false
                            }
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                    />
                </form >
            </div>
        );



    }
    render() {
        let contents = this.state.loading
            ? <div class="loader">Please Wait...</div>
            : this.renderReport(this.state.userList);

        return (
            <div>
                {contents}
            </div>
        );
    }
}

