import axios from 'axios';

export const FETCH_REPOS_BEGIN = 'FETCH_REPOS_BEGIN';

export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS';

export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE';

export const fetchReposBegin = () => ({
  type: FETCH_REPOS_BEGIN,
});

export const fetchReposSuccess = data => ({
  type: FETCH_REPOS_SUCCESS,
  payload: { data },
});

export const fetchReposFailure = error => ({
  type: FETCH_REPOS_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchRepos(username) {
  return (dispatch) => {
    dispatch(fetchReposBegin());
    axios.get(`${apiUrl}/repos/${username}`)
      .then((res) => {
        dispatch(fetchReposSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchReposFailure(err)));
  };
}
