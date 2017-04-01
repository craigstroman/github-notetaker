import React from 'react';
import SearchGithub from './SearchGithub';

const Main = props => (
  <div className="container">
    <nav className="navbar navbar-default" role="navigation">
      <div className="row">
        <div className="col-md-12" style={{ marginTop: 15 }}>
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

Main.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default Main;
