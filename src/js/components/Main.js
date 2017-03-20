import React from 'react';
import SearchGithub from './SearchGithub';

/* eslint react/prefer-stateless-function: 0 */
/* eslint react/prop-types: 0 */
class Main extends React.Component {
  render() {
    return (
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
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
