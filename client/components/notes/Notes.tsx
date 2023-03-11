import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectProfileState } from '../../containers/profile/profileSlice';
import './Notes.scss';

export const Notes: React.FC = () => {
  const profileState = useAppSelector(selectProfileState);

  return (
    <div className="notes-container">
      <header className="header">
        <h4 className="text-center">Notes for {profileState.value.profile.name}</h4>
      </header>
    </div>
  );
};
