import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectUserProfileState } from './userProfileSlice';
import './UserProfile.scss';

export const UserProfile: React.FC = () => {
  const profileState = useAppSelector(selectUserProfileState);

  return (
    <div className="user-profile-container">
      <header className="header">
        <h4>Profile for {profileState.value.name}</h4>
      </header>
      {profileState.value.avatar_url && <img src={profileState.value.avatar_url} alt="User avatar" />}
      <ul className="list-group">
        {profileState.value.login && (
          <li className="list-group-item text-left">
            <b>Username:</b> {profileState.value.login}
          </li>
        )}
        {profileState.value.company && (
          <li className="list-group-item text-left">
            <b>Company:</b> {profileState.value.company}
          </li>
        )}
        {profileState.value.email && (
          <li className="list-group-item text-left">
            <b>Email:</b> {profileState.value.email}
          </li>
        )}
        {profileState.value.location && (
          <li className="list-group-item text-left">
            <b>Location:</b> {profileState.value.location}
          </li>
        )}
        {profileState.value.public_repos && (
          <li className="list-group-item text-left" data-repos={profileState.value.public_repos}>
            <b>Repos:</b> {profileState.value.public_repos}
          </li>
        )}
        {profileState.value.followers >= 1 && (
          <li className="list-group-item text-left">
            <b>Followers:</b> {profileState.value.followers}
          </li>
        )}
        {profileState.value.following >= 1 && (
          <li className="list-group-item text-left">
            <b>Following:</b> {profileState.value.following}
          </li>
        )}
        {profileState.value.blog && (
          <li className="list-group-item text-left">
            <b>Blog:</b>{' '}
            <a href={profileState.value.blog} rel="noopener noreferrer" target="_blank">
              {profileState.value.blog}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
