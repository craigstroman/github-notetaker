import React from 'react';
import UserProfile from './github/UserProfile';
import UserRepos from './github/UserRepos';
import UserNotes from './notes/UserNotes';
import Pagination from '../utils/pagination';
import { getGithubInfo, getGithubRepos } from '../utils/helpers';
import { loadState, saveState } from '../utils/localStorage';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: {},
      notes: [],
      repos: {},
      reposList: [],
      userChanged: false,
      loaded: false,
      status: undefined,
      statusText: undefined,
    };

    this.getUserRepos = this.getUserRepos.bind(this);
    this.handleAddNote = this.handleAddNote.bind(this);
    this.handlePageChanged = this.handlePageChanged.bind(this);
    this.handleSetNewPage = this.handleSetNewPage.bind(this);
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
  /**
   * Get's user repo's based on page number.
   *
   * @param  {Number} pageNumber The currently selected page number for the repos list.
   */
  getUserRepos(pageNumber) {
    const username = this.props.params.username;

    if (!isNaN(pageNumber) && pageNumber > 1) {
      if ((this.state.bio.public_repos > 100) && (this.state.repos.length < this.state.bio.public_repos)) {
        getGithubRepos(username, pageNumber)
          .then((data) => {
            const repos = this.state.repos.concat(data);
            this.setState({
              repos,
            });
          });
      }
    }
  }
  /**
   * Initializes a profile for a Github user.
   *
   * @param  {String} username The Github username to be found.
   */
  init(username) {
    const repoNotes = loadState(username) || [];

    getGithubInfo(username)
      .then((data) => {
        if (data.bio && data.repos) {
          const reposList = (Array.isArray(data.repos) && data.repos.length > 5) ? data.repos.slice(0, 4) : data.repos;
          this.setState({
            bio: data.bio,
            repos: data.repos,
            reposList,
            notes: repoNotes,
            loaded: true,
          });
        } else {
          this.setState({
            bio: undefined,
            repos: undefined,
            reposList: undefined,
            notes: undefined,
            loaded: true,
            status: data.message.response.status,
            statusText: data.message.response.statusText,
          });
        }
      });
  }
  componentWillUnMount() {
    this.setState({
      bio: {},
      notes: [],
      repos: {},
      reposList: [],
      loaded: false,
      status: undefined,
      statusText: undefined,
    });
  }
  handlePageChanged(pageNumber, pageOfItems) {
    this.getUserRepos(pageNumber);
    this.handleSetNewPage(pageOfItems);
  }
  /**
   * Sets the new page of repos after a user clicks on a page number.
   *
   * @param  {Array} repos The list of repos for a user.
   */
  handleSetNewPage(repos) {
    this.setState({ reposList: repos });
  }
  /**
   * Saves a new note to the local storage object for a particular Github user.
   *
   * @param  {String} newNote The new note to be added to the notes object.
   */
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
    const showPaginantion = (this.state.bio.public_repos > 10);
    return (
      <div>
        {isFound ? (
          <div className="row" key={this.state.bio.login}>
            <div className="col-md-4">
              <UserProfile bio={this.state.bio} />
            </div>
            <div className="col-md-4">
              <UserRepos
                repos={this.state.repos}
                reposList={this.state.reposList}
                totalItems={this.state.bio.public_repos}
                setNewPage={this.handleSetNewPage}
                getUserRepos={this.getUserRepos}
                user={this.state.bio.login}
              />
              {showPaginantion ? (
                <Pagination
                  items={this.state.repos}
                  totalItems={this.state.bio.public_repos}
                  onClick={this.handlePageClick}
                  onChangePage={this.handlePageChanged}
                />
              ) : null}
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

