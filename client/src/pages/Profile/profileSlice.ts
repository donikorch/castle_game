// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Results } from './type'
import * as api from '../../app/api'

const initialState: Results = {
    user: undefined,
    results: [],
    error: undefined,
}

export const loadResults = createAsyncThunk('profile/loadResults', () =>
    api.fetchResults()
)
export const loadUser = createAsyncThunk(
    'profile/loadUser',
    (username: string) => api.fetchLoadUser(username)
)
export const updateUser = createAsyncThunk('profile/updateUser', (obj: FormData) =>
    api.fetchUserUpdate(obj)
)
export const changeTheme = createAsyncThunk('profile/changeTheme', (theme_id: number) =>
api.fetchUpdateTheme(theme_id)
)




const resultsSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadResults.fulfilled, (state, action) => {
                state.results = action.payload
            })
            .addCase(loadResults.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(changeTheme.fulfilled, (state, action) => {
                state.user = action.payload
            })
            // .addCase(changeTheme.rejected, (state, action) => {
            //     state.error = action.error.message
            // })
    },
})

export default resultsSlice.reducer
