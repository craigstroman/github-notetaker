import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faFloppyDisk, faBan } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../../../store/store';
import { INote } from '../notesTypes';
import { removeNotesAsync, updateNoteAsync } from '../notesSlice';
import './NotesList.scss';

interface INotesProps {
  notes: INote[];
}

export const NotesList: React.FC<INotesProps> = ({ notes }) => {
  const dispatch = useAppDispatch();
  const { username } = useParams<{ username: string }>();
  const [editNoteId, setEditNoteId] = useState<string>('');
  const [editNoteValue, setEditNoteValue] = useState<string>('');

  const handleUpdateItem = (note: INote) => {
    if (editNoteId !== '') {
      setEditNoteId('');
    } else {
      setEditNoteId(note._id);
    }
  };

  const handleSaveItem = async (note: INote) => {
    if (editNoteId && username) {
      await dispatch(updateNoteAsync({ noteId: editNoteId, note: editNoteValue }));
      setEditNoteId('');
      setEditNoteValue('');
    }
  };

  const handleNoteChange = (e: any) => {
    if (e.keyCode === 27) {
      setEditNoteId('');
    }

    setEditNoteValue(e.target.value);
  };

  const handleCancelItem = () => {
    setEditNoteId('');
    setEditNoteValue('');
  };

  const handleRemoveItem = async (note: INote) => {
    if (username && note) {
      await dispatch(removeNotesAsync({ repo: username, noteId: note._id }));
    }
  };

  useEffect(() => {
    if (editNoteId === '') {
      setEditNoteValue('');
    }
  }, [editNoteId]);

  return (
    <React.Fragment>
      <ul className="notes-list">
        {Array.isArray(notes) &&
          notes.length >= 1 &&
          notes.map((note) => (
            <li className="notes__item" key={`${note._id}}`}>
              <div className="notes__item--text">
                {editNoteId === note._id && (
                  <input
                    type="text"
                    name="note"
                    onChange={(e) => handleNoteChange(e)}
                    onKeyDown={(e) => handleNoteChange(e)}
                    value={editNoteValue || note.text}
                  />
                )}
                {editNoteId !== note._id && note.text}
              </div>
              <div className="notes__item--btn">
                {editNoteId === note._id && (
                  <React.Fragment>
                    <button
                      type="button"
                      className="notes-item-save-btn"
                      onClick={(e) => handleSaveItem(note)}
                      aria-label="Save changes to a note"
                    >
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                    <button
                      type="button"
                      className="notes-item-cancel-btn"
                      onClick={(e) => handleCancelItem()}
                      aria-label="Cancel update note"
                    >
                      <FontAwesomeIcon icon={faBan} />
                    </button>
                  </React.Fragment>
                )}
                {editNoteId !== note._id && (
                  <React.Fragment>
                    <button
                      type="button"
                      className="notes-item-update-btn"
                      onClick={(e) => handleUpdateItem(note)}
                      aria-label="Update a note"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button
                      type="button"
                      className="notes-item-remove-btn"
                      onClick={(e) => handleRemoveItem(note)}
                      aria-label="Remove a note"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </React.Fragment>
                )}
              </div>
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};
