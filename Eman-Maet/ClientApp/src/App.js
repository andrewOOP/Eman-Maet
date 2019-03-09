import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CreateEvent } from './components/CreateEvent';
import { EventList } from './components/EventList';
import { Login } from './components/Login';
import { UserList } from './components/UserList';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
		<Route path='/createevent' component={CreateEvent} />
        <Route path='/eventlist' component={EventList} />
        <Route path='/userlist' component={UserList} />
      </Layout>
    );
  }
}
