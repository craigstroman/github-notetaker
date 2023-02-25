import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectProfileState } from '../../containers/profile/profileSlice';

export const UserProfile: React.FC = () => {
  const profileState = useAppSelector(selectProfileState);

  return (
    <div className="profile-container" data-totalrepos={profileState.value.profile.public_repos}>
      <h4 className="text-center">Profile for {profileState.value.profile.name}</h4>
      {profileState.value.profile.avatar_url && (
        <div>
          <img
            src={profileState.value.profile.avatar_url}
            className="img-rounded img-responsive"
            alt="User avatar"
          />
        </div>
      )}
      <ul className="list-group">
        {profileState.value.profile.login && (
          <li className="list-group-item text-left">
            <b>Username:</b> {profileState.value.profile.login}
          </li>
        )}
        {profileState.value.profile.company && (
          <li className="list-group-item text-left">
            <b>Company:</b> {profileState.value.profile.company}
          </li>
        )}
        {profileState.value.profile.email && (
          <li className="list-group-item text-left">
            <b>Email:</b> {profileState.value.profile.email}
          </li>
        )}
        {profileState.value.profile.location && (
          <li className="list-group-item text-left">
            <b>Location:</b> {profileState.value.profile.location}
          </li>
        )}
        {profileState.value.profile.public_repos && (
          <li className="list-group-item text-left" data-repos={profileState.value.profile.public_repos}>
            <b>Repos:</b> {profileState.value.profile.public_repos}
          </li>
        )}
        {profileState.value.profile.followers >= 1 && (
          <li className="list-group-item text-left">
            <b>Followers:</b> {profileState.value.profile.followers}
          </li>
        )}
        {profileState.value.profile.following >= 1 && (
          <li className="list-group-item text-left">
            <b>Following:</b> {profileState.value.profile.following}
          </li>
        )}
        {profileState.value.profile.blog && (
          <li className="list-group-item text-left">
            <b>Blog:</b>{' '}
            <a href={profileState.value.profile.blog} rel="noopener noreferrer" target="_blank">
              {profileState.value.profile.blog}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};
