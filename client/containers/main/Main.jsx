import React from 'react';
import PropTypes from 'prop-types';
import SearchGithub from '../../components/search-github/SearchGithub';
import './Main.scss';

const Main = props => (
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
        {props.children}
      </div>
    </div>
  </div>
);

Main.defaultProps = {
  children: React.createElement('div'),
};

Main.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Main;
