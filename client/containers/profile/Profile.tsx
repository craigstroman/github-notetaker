import React from 'react';
import { useParams } from 'react-router-dom';
import { UserProfile } from '../../components/github/UserProfile';
import { UserRepos } from '../../components/github/user-repos/UserRepos';
import { Notes } from '../../components/notes/Notes';

// TODO: Continue working on converting class components to functions and just getting the app to load
// TODO: Then work on implementing app using React hooks and TypeScript
// TODO: Find new pagination script. Maybe use react-paginate

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  console.log('username: ', username);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-center">
          <UserProfile />
        </div>
        <div className="col-md-4 text-center">
          <UserRepos username="test" />
        </div>
        <div className="col-md-4 text-center">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default Profile;
