import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { selectProfileState } from '../profile/profileSlice';
import { UserProfile } from '../../components/github/UserProfile';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { Notes } from '../../components/notes/Notes';
import { showLoadingScreen, hideLoadingScreen } from '../../common/LoadingScreen/loadingScreenSlice';
import { Login } from './login/Login';
import { getProfileAsync, getReposAsync, getUserSessionStatusAsync } from './profileSlice';
import './Profile.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const getData = async (username: string) => {
    showLoadingScreen();
    await dispatch(getProfileAsync(username));
    await dispatch(getReposAsync(username));
    await dispatch(getUserSessionStatusAsync());
    hideLoadingScreen();
  };
  const profileState = useAppSelector(selectProfileState);
  const userInfo = profileState.value.userInfo;

  useEffect(() => {
    if (username) {
      getData(username);
    }
  }, [username]);

  return (
    <div className="main-content-container">
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
