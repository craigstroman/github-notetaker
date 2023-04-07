import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import notesReducer from '../components/notes/notesSlice';
import userProfileReducer from '../components/github/userProfileSlice';
import userReposReducer from '../components/github/user-repos/userReposSlice';
import userInfoReducer from '../components/userInfo/userInfoSlice';
import loadingScreenReducer from '../common/LoadingScreen/loadingScreenSlice';

export const reducer = {
  notes: notesReducer,
  userProfile: userProfileReducer,
  userRepos: userReposReducer,
  userInfo: userInfoReducer,
  loading: loadingScreenReducer,
};

export const store = configureStore({
  reducer,
});

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
