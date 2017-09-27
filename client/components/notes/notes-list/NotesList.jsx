import React from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeNote } from '../../../actions/notes-actions/remove';
import './NotesList.scss';

class NotesList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(note) {
    const username = this.props.match.params.username;

    this.props.dispatch(removeNote(username, note._id));
  }
  render() {
    return (
      <ul className="notes">
        {this.props.notes.map(note => (
          <li className="notes__item" key={note._id}>
            <div className="notes__item--text">
              {note.text}
            </div>
            <div className="notes__item--btn">
              <button
                type="button"
                className="btn btn-default"
                aria-label="Delete item"
                onClick={() => { this.handleDelete(note); }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notes: state.notesReducer.notes,
  loading: state.notesReducer.loading,
  error: state.notesReducer.error,
});

NotesList.defaultProps = {
  params: {},
  match: undefined,
  dispatch: () => {},
  notes: [],
};

NotesList.propTypes = {
  params: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  notes: PropTypes.array.isRequired,
};

export default withRouter(connect(mapStateToProps)(NotesList));
