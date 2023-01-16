import axios from 'axios';

export const FETCH_PROFILE_BEGIN = 'FETCH_PROFILE_BEGIN';

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';

export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN,
});

export const fetchProfileSuccess = data => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: { data },
});

export const fetchProfileError = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function fetchProfile(username) {
  return (dispatch) => {
    dispatch(fetchProfileBegin());
    axios.get(`${apiUrl}/profile/${username}`)
      .then((res) => {
        dispatch(fetchProfileSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(fetchProfileError(err)));
  };
}
