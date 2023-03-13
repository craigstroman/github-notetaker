import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectProfileState } from '../profile/profileSlice';
import { UserProfile } from '../../components/github/UserProfile';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { Notes } from '../../components/notes/Notes';
import { Login } from './login/Login';

import { getProfileAsync, getReposAsync, getUserSessionStatusAsync } from './profileSlice';
import './Profile.scss';
import { profile } from 'console';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const profileState = useAppSelector(selectProfileState);
  const userInfo = profileState.value.userInfo;

  useEffect(() => {
    if (username) {
      dispatch(getProfileAsync(username));
      dispatch(getReposAsync(username));
      dispatch(getUserSessionStatusAsync());
    }
  }, [username]);

  return (
    <div className="container">
      <div className="col">
        <UserProfile />
      </div>
      <div className="col">
        <UserRepos />
      </div>
      <div className="col">{userInfo && userInfo?.id >= 1 ? <Notes /> : <Login />}</div>
    </div>
  );
};

export default Profile;
