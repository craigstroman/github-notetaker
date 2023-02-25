import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchGitHub.scss';

export const SearchGitHub: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userName) {
      navigate(`/profile/${userName}`);
    }
  };

  return (
    <div className="search-container">
      <div className="row">
        <div className="col-md-12 text-center">
          <form className="form-inline form-search" role="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter a username"
                aria-label="Username search field"
                onChange={(e) => setUserName(e.target.value)}
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
