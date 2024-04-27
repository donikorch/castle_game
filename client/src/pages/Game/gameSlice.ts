// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { LevelType } from './type'
import type { ResultWithoutId } from '../Profile/type'
import * as api from '../../app/api'

const initialState: LevelType = {
    level: undefined,
    theme: undefined,
    error: undefined,
}

export const loadLevel = createAsyncThunk(
    'game/loadLevel',
    (difficultId: number) => api.fetchLoadLevel(difficultId)
)

export const saveResult = createAsyncThunk(
    'game/saveResult',
    (result: ResultWithoutId) => api.fetchSaveResult(result)
)

export const updateLevel = createAsyncThunk(
    'game/updateLevel',
    (level: number) => api.fetchUpdateLevel(level)
)

export const loadTheme = createAsyncThunk(
    'game/loadTheme',
    (theme_id: number) => api.fetchLoadTheme(theme_id)
)

const userSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadLevel.fulfilled, (state, action) => {
                state.level = action.payload
            })
            .addCase(loadLevel.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(saveResult.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(loadTheme.fulfilled, (state, action) => {
                state.theme = action.payload
            })
            .addCase(loadTheme.rejected, (state, action) => {
                state.error = action.error.message
            })
    },
})

export default userSlice.reducer
