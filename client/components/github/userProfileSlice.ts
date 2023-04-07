import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { UserProfileState, initialState } from './userProfileTypes';
import { getProfile } from './userProfile.API';

export const getProfileAsync = createAsyncThunk('profile/get', async (username: string) => {
  const response = await getProfile(username);

  return response.data;
});

export const userProfileSlice = createSlice({
  name: 'userProfile',
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

export const { resetState } = userProfileSlice.actions;

export const selectUserProfileState = (state: RootState): UserProfileState => state.userProfile;

export default userProfileSlice.reducer;
