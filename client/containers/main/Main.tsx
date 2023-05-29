import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './home/Home';
import Profile from '../profile/Profile';
import { SearchGitHub } from '../../components/search-github/SearchGitHub';
import './Main.scss';

const Main: React.FC = () => {
  return (
    <div className="content">
      <BrowserRouter>
        <div className="search-bar">
          <Routes>
            {['/', '/profile/:username'].map((path) => (
              <Route key={path} path={path} element={<SearchGitHub />} />
            ))}
          </Routes>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Main;
