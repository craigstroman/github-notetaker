import {
  FETCH_PROFILE_BEGIN,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
} from '../../actions/profileActions';

const profileInitialState = {
  profile: null,
  loading: true,
  error: null,
};

export default function profileReducer(state = profileInitialState, action) {
  switch (action.type) {
    case FETCH_PROFILE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
