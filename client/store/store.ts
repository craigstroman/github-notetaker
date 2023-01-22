import { configureStore } from '@reduxjs/toolkit';
import notesReducer from '../reducers/notes/notesReducer';

export const reducer = {
  notes: notesReducer,
};

export default store;

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
