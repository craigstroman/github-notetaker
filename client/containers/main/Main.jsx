import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import configureStore from '../../store/configurestore';
import Home from './home/Home';
import Profile from '../profile/Profile';
import SearchGithub from '../../components/search-github/SearchGitHub';
import './Main.scss';

const store = configureStore();

const Main = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="row">
            <div className="col-md-12 search-bar">
              <SearchGithub />
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <Route exact path="/" component={Home} />
            <Route exact path="/profile/:username" component={Profile} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Main;
