import React from 'react';

class NotesList extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * Passes note to delete to parent component delete note method.
   *
   * @param  {Object} note The note text and note id to be deleted.
   */
  handleDelete(note) {
    this.props.deleteNote(note);
  }
  render() {
    const buttonStyles = {
      paddingTop: 0,
      paddingBottom: 0,
    };
    return (
      <ul className="list-group clearfix">
        {this.props.notes.map(note => (
          <li className="list-group-item" key={note.id}>
            {note.text}
            <div className="pull-right">
              <button
                type="button"
                className="btn btn-default"
                style={buttonStyles}
                aria-label="Delete note"
                onClick={() => { this.handleDelete(note); }}
              >
                <span
                  className="glyphicon glyphicon-remove"
                  aria-hidden="true"
                />
              </button>
            </div>
          </li>
        ),
      )}
      </ul>
    );
  }
}

NotesList.defaultProps = {
  deleteNote: () => {},
  notes: [],
};

NotesList.propTypes = {
  deleteNote: React.PropTypes.func.isRequired,
  notes: React.PropTypes.array.isRequired,
};

export default NotesList;
