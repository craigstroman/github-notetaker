import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { UserProfile } from '../../components/github/UserProfile';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { Notes } from '../../components/notes/Notes';
import { getProfileAsync, getReposAsync } from './profileSlice';
import './Profile.scss';

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    if (username) {
      dispatch(getProfileAsync(username));
      dispatch(getReposAsync(username));
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
      <div className="col">
        <Notes />
      </div>
    </div>
  );
};

export default Profile;
