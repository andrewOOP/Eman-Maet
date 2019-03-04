import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CreateEvent } from './components/CreateEvent';
import { CreateUser } from './components/CreateUser';
import { EditEvent } from './components/EditEvent';
import { EventList } from './components/EventList';
import { EventDetails } from './components/EventDetails';
import { Login } from './components/Login';


export default class App extends Component
{
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/createevent' component={CreateEvent} />
        <Route path='/editevent' component={EditEvent} />
		<Route path='/eventlist' component={EventList} />
        <Route path='/eventdetails' component={EventDetails} />
        <Route path='/createuser' component={CreateUser} />

      </Layout>
    );
  }
}
