import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { UserReposState, initialState } from './userReposTypes';
import { getRepos } from './userRepos.API';

export const getReposAsync = createAsyncThunk('repos/get', async (username: string) => {
  const response = await getRepos(username);

  return response.data;
});

export const userReposSlice = createSlice({
  name: 'userRepos',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReposAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getReposAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = [...action.payload];
        return newState;
      })
      .addCase(getReposAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = userReposSlice.actions;

export const selectUserReposState = (state: RootState): UserReposState => state.userRepos;

export default userReposSlice.reducer;
