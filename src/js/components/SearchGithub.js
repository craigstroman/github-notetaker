import { browserHistory } from 'react-router';
import React from 'react';

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
      browserHistory.push(`/profile/${username}`);
    }
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    const inputStyles = {
      marginRight: 10,
      width: 350,
    };
    return (
      <div className="row" style={{ marginBottom: 10 }}>
        <div className="col-sm-12 text-center">
          <form className="form-inline" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter a username"
                style={inputStyles}
                className="form-control"
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

export default SearchGithub;
