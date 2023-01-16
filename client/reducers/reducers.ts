import { combineReducers } from 'redux';
import profileReducer from './profile/profileReducer';
import reposReducer from './repos/reposReducer';
import notesReducer from './notes/notesReducer';

const rootReducer = combineReducers({
  profileReducer,
  reposReducer,
  notesReducer,
});

export default rootReducer;
