import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Profile from '../profile/Profile';
import { SearchGitHub } from '../../components/search-github/SearchGitHub';
import './Main.scss';

const Main: React.FC = () => {
  return (
    <div className="content">
      <div className="search-bar">
        <SearchGitHub />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Main;
