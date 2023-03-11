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

  // TODO: Continue implementing CSS grid instead of Bootstrap
  // TODO: Get repos text to stretch height of container div.

  return (
    <div className="search-container">
      <form className="form-search" role="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-search-input"
          placeholder="Enter a username"
          aria-label="Username search field"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit" className="form-search-button">
          Search GitHub
        </button>
      </form>
    </div>
  );
};
