import path from 'path';
import assert from 'assert';
import React from 'react';
import Notes from './Notes/Notes';
import Repos from './Github/Repos';
import getGithubInfo from '../utils/helpers';
import UserProfile from './Github/UserProfile';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: [],
    };
  }
  componentDidMount() {
    const username = this.props.params.username;
    this.init(username);
  }
  componentWillReceiveProps(nextProps) {
    const username = nextProps.params.username;
    this.init(username);
  }
  componentWillUnmount() {
    this.setState({
      notes: [],
      bio: {},
      repos: [],
    });
  }
  init(username) {
    const notes = JSON.parse(localStorage.getItem(username)) || [];

    this.setState({
      notes: notes,
    });

    getGithubInfo(username)
      .then(function (data) {
        this.setState({
          bio: data.bio,
          repos: data.repos,
        });
      }.bind(this));
  }
  handleAddNote(newNote) {
    const username = this.props.params.username;
    const notes = JSON.parse(localStorage.getItem(username)) || [];

    this.setState({
      notes: this.state.notes.concat([newNote]),
    });

    notes.push(newNote);

    localStorage.setItem(username, JSON.stringify(notes));
  }
  render() {
    const username = this.props.params.username;

    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes
            username={username}
            notes={this.state.notes}
            addNote={this.handleAddNote.bind(this)} />
        </div>
      </div>
    );
  }
}

export default Profile;
