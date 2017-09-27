import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './SearchGitHub.scss';

class SearchGithub extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const username = this.state.input;

    if (username.length >= 1) {
      this.props.history.push(`/profile/${username}`);
    }
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    return (
      <div className="row search-container">
        <div className="col-sm-12 text-center">
          <form className="form-inline form-search" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter a username"
                className="form-control input-search"
                aria-label="Username search field"
                tabIndex="0"
                value={this.state.input}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                tabIndex="0"
                className="btn btn-block btn-primary"
              >Search Github</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SearchGithub.defaultProps = {
  history: undefined,
};

SearchGithub.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SearchGithub);

