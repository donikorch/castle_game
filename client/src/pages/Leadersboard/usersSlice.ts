// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { UsersType } from './type';
import * as api from '../../app/api';

const initialState: UsersType = {
  users: [],
  error: undefined,
};

// Load Leaders
export const loadLeaders = createAsyncThunk('users/loadAll', () => api.fetchLeadersBoard());

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLeaders.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loadLeaders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
