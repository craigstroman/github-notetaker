import React from 'react';
import queryString from 'query-string';

interface UserReposProps {
  username: string;
  repos?: Object;
}

export const UserRepos: React.FC<UserReposProps> = ({ username, repos }) => {
  console.log('user repos: ');
  return <div>User Repos</div>;
};
