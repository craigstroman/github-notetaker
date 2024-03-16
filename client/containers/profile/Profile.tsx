import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { LoadingScreen } from '../../common/LoadingScreen/LoadingScreen';
import { getProfileAsync, selectUserProfileState } from '../../components/github/userProfileSlice';
import { UserProfile } from '../../components/github/UserProfile';
import { getReposAsync, selectUserReposState } from '../../components/github/user-repos/userReposSlice';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { getSessionStatusAsync, selectUserInfoState } from '../../components/userInfo/userInfoSlice';
import { Notes } from '../../components/notes/Notes';
import { Login } from './login/Login';
import './Profile.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { repo } = useParams<{ repo: string }>();
  const getData = async (repo: string) => {
    await dispatch(getProfileAsync(repo));
    await dispatch(getReposAsync(repo));
  };
  const userProfileState = useAppSelector(selectUserProfileState);
  const userReposState = useAppSelector(selectUserReposState);
  const userInfoState = useAppSelector(selectUserInfoState);
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(false);
  const [showNotFoundScreen, setShowNotFoundScreen] = useState<boolean>(false);

  useEffect(() => {
    if (repo) {
      getData(repo);
      dispatch(getSessionStatusAsync());
    }
  }, [repo]);

  useEffect(() => {
    if (userProfileState.status === 'loading' || userReposState.status === 'loading') {
      setShowLoadingScreen(true);
    } else {
      setShowLoadingScreen(false);
      if (userProfileState.status === 'not-found' || userReposState.status === 'not-found') {
        setShowNotFoundScreen(true);
      } else {
        setShowNotFoundScreen(false);
      }
    }
  }, [userProfileState.status, userReposState.status]);

  if (showLoadingScreen) {
    return (
      <div className="profile-content loading-screen">
        <LoadingScreen />
      </div>
    );
  }

  if (showNotFoundScreen) {
    return <div className="profile-content not-found-screen">The user was not found.</div>;
  }

  return (
    <div className="profile-content">
      <div>
        <UserProfile />
      </div>
      <div>
        <UserRepos />
      </div>
      <div>{userInfoState && userInfoState.status === 'success' ? <Notes /> : <Login />}</div>
    </div>
  );
};

export default Profile;
