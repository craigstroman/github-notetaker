import React from 'react';
import AddNote from './AddNote';
import NotesList from './NotesList';

const UserNotes = props => (
  <div>
    <h3 className="text-center">Notes for {props.fullName}</h3>
    <AddNote addNote={props.addNote} />
    <NotesList notes={props.notes} />
  </div>
);

UserNotes.defaultProps = {
  fullName: '',
  notes: [],
  addNote: () => {},
};

UserNotes.propTypes = {
  fullName: React.PropTypes.string.isRequired,
  notes: React.PropTypes.array.isRequired,
  addNote: React.PropTypes.func.isRequired,
};

export default UserNotes;
