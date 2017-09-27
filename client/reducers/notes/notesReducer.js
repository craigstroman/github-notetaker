import {
  FETCH_NOTES_BEGIN,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
} from '../../actions/notes-actions/fetch';

import {
  ADD_NOTES_BEGIN,
  ADD_NOTES_SUCCESS,
  ADD_NOTES_FAILURE,
} from '../../actions/notes-actions/add';

import {
  REMOVE_NOTES_BEGIN,
  REMOVE_NOTES_SUCCESS,
  REMOVE_NOTES_FAILURE,
} from '../../actions/notes-actions/remove';

const notesInitialState = {
  notes: null,
  loading: true,
  error: null,
};

export default function notesReducer(state = notesInitialState, action) {
  switch (action.type) {
    case FETCH_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notes: action.payload.data.notes,
      };
    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case ADD_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notes: [...state.notes, action.payload.data],
      };
    case ADD_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case REMOVE_NOTES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REMOVE_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        notes: [
          ...(state.notes.filter(item => (item._id !== action.payload.data._id))),
        ],
      };
    case REMOVE_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
