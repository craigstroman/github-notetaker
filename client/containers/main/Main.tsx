import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { store } from '../../store/store';
import Home from './home/Home';
import Profile from '../profile/Profile';
import { SearchGitHub } from '../../components/search-github/SearchGitHub';
import './Main.scss';

const Main = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="row">
            <div className="col-md-12 search-bar">
              <SearchGitHub />
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-12">
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  </Provider>
);

export default Main;
