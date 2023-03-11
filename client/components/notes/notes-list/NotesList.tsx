import React from 'react';
import './NotesList.scss';

interface INotes {
  _id: number;
  text: string;
  repo: string;
  createdAt: string;
  updatedAt: string;
  user_id: number;
}

interface INotesProps {
  notes: INotes[];
}

export const NotesList: React.FC<INotesProps> = ({ notes }) => {
  return (
    <React.Fragment>
      <ul className="notes-list">
        {Array.isArray(notes) &&
          notes.length >= 1 &&
          notes.map((note) => (
            <li className="notes-item" key={`${note._id}_${Math.random()}`}>
              {note.text}
            </li>
          ))}
      </ul>
    </React.Fragment>
  );
};
