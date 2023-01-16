import {
  FETCH_REPOS_BEGIN,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILURE,
} from '../../actions/repoActions';

const reposInitialState = {
  repos: null,
  loading: true,
  error: null,
};

export default function reposReducer(state = reposInitialState, action) {
  switch (action.type) {
    case FETCH_REPOS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        repos: action.payload,
      };
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
