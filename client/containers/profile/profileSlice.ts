import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { ProfileState, initialState, IUser } from './profileTypes';
import { getProfile, getRepos, getSessionStatus } from './profile.API';

export const getProfileAsync = createAsyncThunk('profile/get', async (username: string) => {
  const response = await getProfile(username);

  return response.data;
});

export const getReposAsync = createAsyncThunk('repos/get', async (username: string) => {
  const response = await getRepos(username);

  return response.data;
});

export const getUserSessionStatusAsync = createAsyncThunk('profile/getStatus', async () => {
  const response = await getSessionStatus();

  return response.data;
});

export const profileSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value.profile = action.payload;
        return newState;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      })
      .addCase(getReposAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getReposAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value.repos = action.payload;
        return newState;
      })
      .addCase(getReposAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      })
      .addCase(getUserSessionStatusAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getUserSessionStatusAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value.userInfo = action.payload;
        return newState;
      })
      .addCase(getUserSessionStatusAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = profileSlice.actions;

export const selectProfileState = (state: RootState): ProfileState => state.profile;

export default profileSlice.reducer;
