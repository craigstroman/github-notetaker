import React from 'react';
import getGithubInfo from '../utils/helpers';
import UserProfile from './github/UserProfile';
import UserRepos from './github/UserRepos';
import UserNotes from './notes/UserNotes';
import { loadState, saveState } from '../utils/localStorage';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: {},
      notes: [],
      repos: [],
      loaded: false,
      status: undefined,
      statusText: undefined,
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
      notes: [],
      repos: [],
      loaded: false,
      status: undefined,
      statusText: undefined,
    });
  }
  init(username) {
    const repoNotes = loadState(username) || [];

    getGithubInfo(username)
      .then((data) => {
        if (typeof data.bio === 'undefined' && typeof data.repos === 'undefined') {
          this.setState({
            bio: undefined,
            repos: undefined,
            notes: undefined,
            loaded: true,
            status: data.message.response.status,
            statusText: data.message.response.statusText,
          });
        } else {
          this.setState({
            bio: data.bio,
            repos: data.repos,
            notes: repoNotes,
            loaded: true,
          });
        }
      });
  }
  handleAddNote(newNote) {
    const username = this.props.params.username;
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

    saveState(notes, username);
  }
  render() {
    const isFound = this.state.bio && this.state.repos && this.state.loaded;
    const isLoaded = this.state.loaded;

    return (
      <div>
        {isFound ? (
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
        ) : (
          <div>
            {isLoaded ? (
              <div className="row">
                <div className="col-md-12 text-danger">
                  Profile not found, please try another.
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12">Loading...</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Profile.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default Profile;

