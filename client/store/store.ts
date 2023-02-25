import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import notesReducer from '../components/notes/notesSlice';
import profileReducer from '../containers/profile/profileSlice';

export const reducer = {
  notes: notesReducer,
  profile: profileReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
