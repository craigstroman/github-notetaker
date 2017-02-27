import React from 'react';
import Home from '../components/Home';
import Main from '../components/Main';
import Profile from '../components/Profile';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="profile/:username" component={Profile} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
);
