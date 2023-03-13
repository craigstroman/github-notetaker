import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

const initialState = {
  isLoading: false,
};

export interface ILoadingState {
  isLoading: boolean;
}

export const loadingScreenSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    modal: (state) => state,
    showLoadingScreen: (state) => {
      const newState = state;
      newState.isLoading = true;
      return newState;
    },
    hideLoadingScreen() {
      return initialState;
    },
  },
});

export const { modal, showLoadingScreen, hideLoadingScreen } = loadingScreenSlice.actions;
export const selectLoadingScreen = (state: RootState): ILoadingState => state.loading;

export default loadingScreenSlice.reducer;
