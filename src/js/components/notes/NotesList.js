import React from 'react';

/* eslint arrow-body-style: 0 */
const NotesList = props => (
  <ul className="list-group">
    {props.notes.map((note) => {
      return (
        <li className="list-group-item" key={note.id}>
          {note.text}
        </li>
      );
    })}
  </ul>
);

NotesList.propTypes = {
  notes: React.PropTypes.array.isRequired,
};

export default NotesList;
