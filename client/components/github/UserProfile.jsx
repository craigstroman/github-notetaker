import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';

class UserProfile extends React.Component {
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const username = params.username;

    this.props.dispatch(fetchProfile(username));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.dispatch(fetchProfile(nextProps.match.params.username));
    }
  }
  render() {
    const { error, loading, profile } = this.props;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="profile-container" data-totalrepos={profile.data.public_repos}>
        <h4 className="text-center">Profile for {profile.data.name}</h4>
        {profile.data.avatar_url && (
          <div>
            <img src={profile.data.avatar_url} className="img-rounded img-responsive" alt="User avatar" />
          </div>
        )}
        <ul className="list-group">
          {profile.data.login && (
            <li className="list-group-item text-left">
              <b>Username:</b> {profile.data.login}
            </li>
          )}
          {profile.data.company && (
            <li className="list-group-item text-left">
              <b>Company:</b> {profile.data.company}
            </li>
          )}
          {profile.data.email && (
            <li className="list-group-item text-left">
              <b>Email:</b> {profile.data.email}
            </li>
          )}
          {profile.data.location && (
            <li className="list-group-item text-left">
              <b>Location:</b> {profile.data.location}
            </li>
          )}
          {profile.data.public_repos && (
            <li className="list-group-item text-left" data-repos={profile.data.public_repos}>
              <b>Repos:</b> {profile.data.public_repos}
            </li>
          )}
          {profile.data.followers >= 1 && (
            <li className="list-group-item text-left">
              <b>Followers:</b> {profile.data.followers}
            </li>
          )}
          {profile.data.following >= 1 && (
            <li className="list-group-item text-left">
              <b>Following:</b> {profile.data.following}
            </li>
          )}
          {profile.data.blog && (
            <li className="list-group-item text-left">
              <b>Blog:</b>{' '}
              <a href={profile.data.blog} rel="noopener noreferrer" target="_blank">
                {profile.data.blog}
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  loading: state.profileReducer.loading,
  error: state.profileReducer.error,
});

UserProfile.defaultProps = {
  match: undefined,
  profile: {},
  loading: false,
  error: null,
  dispatch: () => {},
};

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func,
};

export default withRouter(connect(mapStateToProps)(UserProfile));
