import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { getProfileAsync } from '../../components/github/userProfileSlice';
import { UserProfile } from '../../components/github/UserProfile';
import { getReposAsync } from '../../components/github/user-repos/userReposSlice';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { getSessionStatusAsync, selectUserInfoState } from '../../components/userInfo/userInfoSlice';
import { Notes } from '../../components/notes/Notes';
import { Login } from './login/Login';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const getData = async (username: string) => {
    // showLoadingScreen();
    await dispatch(getProfileAsync(username));
    await dispatch(getReposAsync(username));
    await dispatch(getSessionStatusAsync());
    // hideLoadingScreen();
  };
  const userInfoState = useAppSelector(selectUserInfoState);

  useEffect(() => {
    if (username) {
      getData(username);
    }
  }, [username]);

  return (
    <React.Fragment>
      <div>
        <UserProfile />
      </div>
      <div>
        <UserRepos />
      </div>
      <div>{userInfoState && userInfoState.status === 'success' ? <Notes /> : <Login />}</div>
    </React.Fragment>
  );
};

export default Profile;
