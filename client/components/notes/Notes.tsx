import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { selectUserProfileState } from '../github/userProfileSlice';
import { selectNotesState, fetchNotesAsync } from './notesSlice';
import { AddNote } from './add/AddNote';
import { NotesList } from './notes-list/NotesList';
import './Notes.scss';

export const Notes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const profileState = useAppSelector(selectUserProfileState);
  const notesList = useAppSelector(selectNotesState);

  const handleGetNotes = async (username: string) => {
    await dispatch(fetchNotesAsync(username));
  };

  useEffect(() => {
    if (username) {
      handleGetNotes(username);
    }
  }, [username]);

  return (
    <div className="notes-container">
      <header className="header">{<h4>Notes for {profileState.value.name}</h4>}</header>
      <AddNote />
      <NotesList notes={notesList.notes} />
    </div>
  );
};
