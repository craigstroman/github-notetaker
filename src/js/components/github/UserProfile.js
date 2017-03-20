import React from 'react';

const GithubProfile = props => (
  <div>
    <h3 className="text-center">Profile for {props.bio.name}</h3>
    <ul className="list-group">
      {props.bio.avatar_url && <li className="list-group-item">
        <img src={props.bio.avatar_url} className="img-rounded img-responsive" alt="User avatar" /></li>}
      {props.bio.login && <li className="list-group-item">Username: {props.bio.login}</li>}
      {props.bio.email && <li className="list-group-item">Email: {props.bio.email}</li>}
      {props.bio.location && <li className="list-group-item">Location: {props.bio.location}</li>}
      {props.bio.company && <li className="list-group-item">Company: {props.bio.company}</li>}
      {(props.bio.followers !== null && props.bio.followers !== 0) &&
        <li className="list-group-item">Followers: {props.bio.followers}</li>}
      {(props.bio.following !== null && props.bio.following !== 0) &&
        <li className="list-group-item">Following: {props.bio.following}</li>}
      {props.bio.public_repos && <li className="list-group-item">Public Repos: {props.bio.public_repos}</li>}
      {props.bio.blog && <li className="list-group-item">
        Blog: <a href={props.bio.blog}> {props.bio.blog}</a></li>}
    </ul>
  </div>
);

GithubProfile.defaultProps = {
  bio: {},
};

GithubProfile.propTypes = {
  bio: React.PropTypes.object.isRequired,
};

export default GithubProfile;
