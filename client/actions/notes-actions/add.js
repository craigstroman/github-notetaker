import axios from 'axios';

export const ADD_NOTES_BEGIN = 'ADD_NOTES_BEGIN';

export const ADD_NOTES_SUCCESS = 'ADD_NOTES_SUCCESS';

export const ADD_NOTES_FAILURE = 'ADD_NOTES_FAILURE';

export const addNotesBegin = () => ({
  type: ADD_NOTES_BEGIN,
});

export const addNotesSuccess = (data) => ({
  type: ADD_NOTES_SUCCESS,
  payload: { data },
});

export const addNotesError = (error) => ({
  type: ADD_NOTES_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = nodeEnv === 'production' ? '/api' : 'http://localhost:3000/api';

export function addNote(repo, note) {
  const url = `${apiUrl}/notes/${repo}/${note}`;

  return (dispatch) => {
    dispatch(addNotesBegin());
    axios
      .post(url)
      .then((res) => {
        dispatch(addNotesSuccess(res.data));
        return res.data;
      })
      .catch((err) => dispatch(addNotesError(err)));
  };
}
