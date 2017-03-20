import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import React from 'react';
import Home from '../components/Home';
import Main from '../components/Main';
import Profile from '../components/Profile';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="profile/:username" component={Profile} />
    </Route>
  </Router>
);
