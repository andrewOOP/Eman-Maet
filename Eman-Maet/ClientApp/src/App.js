import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { CreateEvent } from './components/CreateEvent';
import { EventList } from './components/EventList';
import { Login } from './components/Login';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
		<Route path='/createevent' component={CreateEvent} />
		<Route path='/eventlist' component={EventList} />
        <Route path='/login' component={Login} />
      </Layout>
    );
  }
}
