import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { fetchRepos } from '../../../actions/repoActions';
import Pagination from '../../../utils/pagination/pagination';
import UserListElement from './UserListElement';

class UserRepos extends React.Component {
  constructor(props) {
    super(props);

    this.handlePageChanged = this.handlePageChanged.bind(this);
  }
  componentDidMount() {
    const username = this.props.match.params.username;

    this.props.dispatch(fetchRepos(username));
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.dispatch(fetchRepos(nextProps.match.params.username));
    }
  }
  handlePageChanged(page) {
    const { history } = this.props;

    this.props.dispatch(push(`/?page=${page}`));

    history.push({
      pathName: this.props.history.location.pathname,
      search: `?page=${page}`,
    });
  }
  render() {
    const { error, loading, repos } = this.props;
    const perPage = 5;
    let currentPage = queryString.parse(location.search);
    let startCount = 0;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    currentPage = (isNaN(currentPage.page) && repos.data.length) ? 1 : Number(currentPage.page);

    const startOffset = (currentPage - 1) * perPage;

    return (
      <div className="repos-container">
        <h4 className="text-center">User Repos</h4>
        <ul className="list-group">
          {repos.data.map((repo, i) => {
            if (i >= startOffset && startCount < perPage) {
              startCount += 1;
              return (<UserListElement repo={repo} key={repo.name} />);
            }
            return false;
          })}
        </ul>
        <Pagination
          initialPage={1}
          pageSize={perPage}
          currentPage={currentPage}
          items={repos.data}
          totalItems={repos.data.length}
          onClick={this.handlePageChanged}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  repos: state.reposReducer.repos,
  loading: state.reposReducer.loading,
  error: state.reposReducer.error,
});

UserRepos.defaultProps = {
  params: {},
  match: undefined,
  repos: {},
  loading: false,
  error: null,
  dispatch: () => {},
  history: {},
};

UserRepos.propTypes = {
  params: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  repos: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(mapStateToProps)(UserRepos));
