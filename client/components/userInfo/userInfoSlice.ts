import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { UserInfoState, initialState } from './userInfoTypes';
import { getSessionStatus } from './userInfo.API';

export const getSessionStatusAsync = createAsyncThunk('sessionStatus/get', async () => {
  const response = await getSessionStatus();

  return response.data;
});

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    resetState: () => {
      const newState = initialState;

      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSessionStatusAsync.pending, (state) => {
        const newState = state;
        newState.status = 'loading';
        return newState;
      })
      .addCase(getSessionStatusAsync.fulfilled, (state, action) => {
        const newState = state;
        newState.status = 'success';
        newState.value = action.payload;
        return newState;
      })
      .addCase(getSessionStatusAsync.rejected, (state) => {
        const newState = state;
        newState.status = 'not-found';
        return newState;
      });
  },
});

export const { resetState } = userInfoSlice.actions;

export const selectUserInfoState = (state: RootState): UserInfoState => state.userInfo;

export default userInfoSlice.reducer;
