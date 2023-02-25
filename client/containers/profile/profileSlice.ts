import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { getProfile } from './profile.API';
import { IProfile, ProfileState, initialState } from './profileTypes';

export const getProfileAsync = createAsyncThunk('profile/get', async (username: string) => {
  const response = await getProfile(username);

  return response;
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
        newState.value = action.payload;
        return newState;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = profileSlice.actions;

export const selectProfileState = (state: RootState): ProfileState => state.profile;

export default profileSlice.reducer;
