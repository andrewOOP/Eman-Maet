import React, { Component } from 'react';

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { eventList: [], loading: true };

	  fetch('api\data\codeathon')
      .then(response => response.json())
		  .then(data => {
			  this.setState({ eventList: data, loading: false });
      });
  }

  static renderEventTable(events) {
    return (
      <table className='eventsTable'>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Desciption</th>
            <th>Inactive?</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event =>
            <tr key={event.eventID}>
              <td>{event.eventDescription}</td>
              <td>{event.eventDate}</td>
			  <td>{event.eventDescription}</td>
              <td>{event.inactive}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
		: FetchData.renderEventTable(this.state.eventList);

    return (
      <div>
        <h1>Event Data</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}

