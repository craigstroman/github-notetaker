import React from 'react';
import './SearchGitHub.scss';

export const SearchGitHub: React.FC = () => {
  console.log('SearchGitHub: ');

  return (
    <div className="search-container">
      <div className="row">
        <div className="col-md-12">
          <form className="form-inline form-search">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a username"
                aria-label="Username search field"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block btn-primary">
                Search GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
