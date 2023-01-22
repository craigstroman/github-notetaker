import React from 'react';
import UserProfile from '../../components/github/UserProfile';
import UserRepos from '../../components/github/user-repos/UserRepos';
import Notes from '../../components/notes/Notes';

const Profile = () => (
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

export default Profile;

