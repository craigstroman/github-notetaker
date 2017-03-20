import React from 'react';

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

    this.props.addNote(newNote);

    this.note.value = '';
  }
  render() {
    const inputStyles = {
      display: 'inline-block',
      marginRight: 5,
      width: '70%',
    };
    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new note"
            style={inputStyles}
            ref={ref => this.setRef(ref)}
          />
          <button
            type="submit"
            className="btn btn-default"
          >Save Note</button>
        </div>
      </form>
    );
  }
}

AddNote.defaultProps = {
  addNote: () => {},
};

AddNote.propTypes = {
  addNote: React.PropTypes.func,
};

export default AddNote;
