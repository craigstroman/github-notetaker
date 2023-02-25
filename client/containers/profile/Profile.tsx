import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { UserProfile } from '../../components/github/UserProfile';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { Notes } from '../../components/notes/Notes';
import { getProfileAsync, getReposAsync } from './profileSlice';

// TODO: Find new pagination script. Maybe use react-paginate

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
      <div className="row">
        <div className="col-md-4 text-center">
          <UserProfile />
        </div>
        <div className="col-md-4 text-center">
          <UserRepos />
        </div>
        <div className="col-md-4 text-center">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Profile;
