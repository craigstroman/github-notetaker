import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { getProfile } from './profile.API';

interface IProfileState {
  profile: {};
  status: 'idle' | 'loading' | 'error' | 'loaded';
}

export const getProfileAsync = createAsyncThunk('profile/get', async (username: string) => {
  const response = await getProfile(username);

  return response;
});

const profileInitialState: IProfileState = {
  profile: {},
  status: 'idle',
};

export const profileSlice = createSlice({
  name: 'notes',
  initialState: profileInitialState,
  reducers: {
    resetState: () => {
      const newState = profileInitialState;

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
        newState.status = 'loaded';
        newState.profile = action.payload;
        return newState;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'error';
        return newState;
      });
  },
});

export const { resetState } = profileSlice.actions;

export const selectProfileState = (state: RootState): IProfileState => state.profile;

export default profileSlice.reducer;
