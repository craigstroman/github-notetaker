import axios from 'axios';

export const FETCH_NOTES_BEGIN = 'FETCH_NOTES_BEGIN';

export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';

export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN,
});

export const fetchNotesSuccess = (data) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { data },
});

export const fetchNotesFailure = (error) => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function fetchNotes(repo) {
  const url = `${apiUrl}/notes/${repo}`;

  return (dispatch) => {
    dispatch(fetchNotesBegin());
    axios
      .get(url)
      .then((res) => {
        console.log('notes: ', res);
        dispatch(fetchNotesSuccess(res.data));
        return res.data;
      })
      .catch((err) => dispatch(fetchNotesFailure(err)));
  };
}
