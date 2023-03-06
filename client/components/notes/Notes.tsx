import React from 'react';
import { useAppSelector } from '../../store/store';
import { selectProfileState } from '../../containers/profile/profileSlice';

export const Notes: React.FC = () => {
  const profileState = useAppSelector(selectProfileState);

  return (
    <div className="notes-container">
      <h4 className="text-center">Profile for {profileState.value.profile.name}</h4>
    </div>
  );
};
