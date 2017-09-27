import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../containers/main/home/Home';
import Profile from '../containers/profile/Profile';
import SearchGithub from '../components/search-github/SearchGitHub';
import configureStore from '../store/configurestore';

const store = configureStore();

export default (
  <Provider store={store}>
    <Router>
      <div>
        <SearchGithub />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/profile/:username" component={Profile} />
        </Switch>
      </div>
    </Router>
  </Provider>
);
