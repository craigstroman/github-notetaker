import React from 'react';

/* eslint arrow-body-style: 0 */
const UserRepos = props => (
  <div>
    <h3 className="text-center">User Repos</h3>
    <ul className="list-group">
      {props.repos.map((repo) => {
        return (
          <li className="list-group-item" key={repo.name}>
            {repo.html_url && <h4><a href={repo.html_url} rel="noopener noreferrer">{repo.name}</a></h4>}
            {repo.description && <p>{repo.description}</p>}
          </li>
        );
      })}
    </ul>
  </div>
);

UserRepos.defaultProps = {
  repos: [],
};

UserRepos.propTypes = {
  repos: React.PropTypes.array.isRequired,
};

export default UserRepos;
