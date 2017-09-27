import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNote } from '../../../actions/notes-actions/add';
import './AddNote.scss';

class AddNote extends React.Component {
  constructor(props) {
    super(props);

    this.note = '';

    this.setRef = this.setRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  setRef(ref) {
    this.note = ref;
  }
  handleSubmit(e) {
    e.preventDefault();

    const newNote = this.note.value;
    const username = this.props.match.params.username;

    this.props.dispatch(addNote(username, newNote));
  }
  render() {
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <div className="row">
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new note"
                ref={ref => this.setRef(ref)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <button
                type="submit"
                className="btn btn-primary"
              >Save Note</button>
            </div>
          </div>
          <hr />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  notes: state.notesReducer.notes,
  loading: state.notesReducer.loading,
  error: state.notesReducer.error,
});

AddNote.defaultProps = {
  params: {},
  match: undefined,
  dispatch: () => {},
};

AddNote.propTypes = {
  params: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(AddNote));
