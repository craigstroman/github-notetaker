import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNotes } from '../../actions/notes-actions/fetch';
import Login from './login/Login';
import NotesList from './notes-list/NotesList';
import AddNote from './add/AddNote';

class Notes extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const username = params.username;

    console.log('username: ', username);

    this.props.dispatch(fetchNotes(username));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.dispatch(fetchNotes(nextProps.match.params.username));
    }
  }
  render() {
    const { error, loading, notes } = this.props;

    if (error) {
      return (
        <div>
          <Login />
        </div>
      );
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="notes-container">
        <h4>Notes</h4>
        <AddNote />
        <NotesList notes={notes.data} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notes: state.notesReducer.notes,
  loading: state.notesReducer.loading,
  error: state.notesReducer.error,
});

Notes.defaultProps = {
  match: undefined,
  notes: [],
  loading: false,
  error: null,
  dispatch: () => {},
};

Notes.propTypes = {
  match: PropTypes.object.isRequired,
  notes: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(Notes));
