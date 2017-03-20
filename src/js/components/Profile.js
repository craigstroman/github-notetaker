import React from 'react';
import getGithubInfo from '../utils/helpers';
import UserProfile from './github/UserProfile';
import UserRepos from './github/UserRepos';
import UserNotes from './notes/UserNotes';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: {},
      currentUser: '',
      notes: [],
      repos: [],
    };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.init = this.init.bind(this);
  }
  componentDidMount() {
    const username = this.props.params.username;
    this.init(username);
  }
  componentWillReceiveProps(nextProps) {
    const username = nextProps.params.username;
    this.init(username);
  }
  componentWillUnMount() {
    this.setState({
      bio: {},
      currentUser: '',
      notes: [],
      repos: [],
    });
  }
  init(username) {
    getGithubInfo(username)
      .then((data) => {
        this.setState({
          bio: data.bio,
          repos: data.repos,
          notes: JSON.parse(localStorage.getItem(username)) || [],
        });
      });
  }
  handleAddNote(newNote) {
    const username = this.state.currentUser;
    const key = Date.now();
    const notes = this.state.notes;
    const note = {
      id: key,
      text: newNote,
    };

    this.setState({
      notes: this.state.notes.concat([note]),
    });

    notes.push(note);

    localStorage.setItem(username, JSON.stringify(notes));
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <UserRepos repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <UserNotes fullName={this.state.bio.name} addNote={this.handleAddNote} notes={this.state.notes} />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default Profile;

