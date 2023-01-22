import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../reducers/notes/notesReducer';
import profileReducer from '../reducers/profile/profileReducer';

export const reducer = {
  notes: notesReducer,
  profile: profileReducer,
};

export default store;

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
