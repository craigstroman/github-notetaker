import React from 'react';
import PropTypes from 'prop-types';

const UserListElement = props => (
  <li className="list-group-item text-left" key={props.repo.name}>
    {props.repo.html_url &&
      <h4><a href={props.repo.html_url} rel="noopener noreferrer">
        {props.repo.name}
      </a></h4>
    }
    {props.repo.description && <p>{props.repo.description}</p>}
  </li>
);

UserListElement.defaultProps = {
  repo: {},
};

UserListElement.propTypes = {
  repo: PropTypes.object,
};

export default UserListElement;
