import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../store/store';
import { INote } from '../notesTypes';
import { removeNotesAsync } from '../notesSlice';
import './NotesList.scss';

interface INotesProps {
  notes: INote[];
}

export const NotesList: React.FC<INotesProps> = ({ notes }) => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();

  const handleRemoveItem = async (note: INote) => {
    if (username && note) {
      await dispatch(removeNotesAsync({ repo: username, noteId: note._id }));
    }
  };

  return (
    <React.Fragment>
      <ul className="notes-list">
        {Array.isArray(notes) &&
          notes.length >= 1 &&
          notes.map((note) => (
            <li className="notes-item" key={`${note._id}}`}>
              <div className="notes-item-text">{note.text}</div>
              <div className="notes-item-btn">
                <button
                  type="button"
                  className="notes-item-remove-btn"
                  onClick={(e) => handleRemoveItem(note)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};
