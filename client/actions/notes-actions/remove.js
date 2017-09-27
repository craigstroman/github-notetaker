import axios from 'axios';

export const REMOVE_NOTES_BEGIN = 'REMOVE_NOTES_BEGIN';

export const REMOVE_NOTES_SUCCESS = 'REMOVE_NOTES_SUCCESS';

export const REMOVE_NOTES_FAILURE = 'REMOVE_NOTES_FAILURE';

export const removeNotesBegin = () => ({
  type: REMOVE_NOTES_BEGIN,
});

export const removeNotesSuccess = data => ({
  type: REMOVE_NOTES_SUCCESS,
  payload: { data },
});

export const removeNotesError = error => ({
  type: REMOVE_NOTES_FAILURE,
  payload: { error },
});

const nodeEnv = process.env.NODE_ENV;
const apiUrl = (nodeEnv === 'production') ? '/api' : 'http://localhost:3000/api';

export function removeNote(repo, noteId) {
  return (dispatch) => {
    dispatch(removeNotesBegin());
    axios.delete(`${apiUrl}/notes/${repo}/${noteId}`)
      .then((res) => {
        dispatch(removeNotesSuccess(res.data));
        return res.data;
      })
      .catch(err => dispatch(removeNotesError(err)));
  };
}
