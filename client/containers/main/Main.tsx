import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Profile from '../profile/Profile';
import { SearchGitHub } from '../../components/search-github/SearchGitHub';
import './Main.scss';

const Main = () => (
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default Main;
