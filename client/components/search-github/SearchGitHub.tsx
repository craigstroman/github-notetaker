import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchGitHub.scss';

export const SearchGitHub: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>('');
  const { username } = useParams<{ username: string }>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user) {
      navigate(`/profile/${user}`);
    }
  };

  useEffect(() => {
    if (username && user === '') {
      setUser(username);
    }
  }, [username]);
  return (
    <div className="search-container">
      <form className="form-search" role="form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="form-search-input"
          placeholder="Enter a user"
          aria-label="user search field"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <button type="submit" className="form-search-button">
          Search GitHub
        </button>
      </form>
    </div>
  );
};
