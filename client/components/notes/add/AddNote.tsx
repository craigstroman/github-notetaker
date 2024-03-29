import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/store';
import { addNotesAsync } from '../notesSlice';
import './AddNote.scss';

export const AddNote: React.FC = () => {
  const dispatch = useAppDispatch();
  const { repo } = useParams<{ repo: string }>();
  const [note, setNote] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formInput = document.getElementsByClassName('form-note-input')[0] as HTMLInputElement;

    if (repo) {
      await dispatch(addNotesAsync({ repo, note }));
      setNote('');
      formInput.value = '';
    }
  };

  return (
    <div className="notes-container">
      <form className="form-note" role="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-note-input"
          placeholder="Add a new note"
          aria-label="Add note input"
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit" className="form-note-button">
          Save Note
        </button>
      </form>
    </div>
  );
};
