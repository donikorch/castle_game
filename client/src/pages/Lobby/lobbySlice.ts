// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { LevelsType } from './type';
import * as api from '../../app/api';

const initialState: LevelsType = {
  levels: [],
  error: undefined,
};

export const loadLevels = createAsyncThunk('lobby/loadLevels', () => api.fetchLevels());

const userSlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
      })
      .addCase(loadLevels.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
