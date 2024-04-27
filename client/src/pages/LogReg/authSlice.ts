// tasks/tasksSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { CodeResponse } from '@react-oauth/google'
import type { UserLog, UserReg, UserType } from './type'
import * as api from '../../app/api'

const initialState: UserType = {
    user: undefined,
    error: undefined,
}

// Sign-In
export const logUser = createAsyncThunk('auth/sign-in', (obj: UserLog) =>
    api.fetchSignIn(obj)
)
// Sign-Up
export const regUser = createAsyncThunk('auth/sign-up', (obj: UserReg) =>
    api.fetchSignUp(obj)
)
// Log-Out
export const logOutUser = createAsyncThunk('auth/logout', () =>
    api.fetchLogOut()
)
// Check User
export const checkUser = createAsyncThunk('auth/userCheck', () =>
    api.fetchCheckUser()
)

export const updateUser = createAsyncThunk('auth/updateUser', (obj: FormData) =>
    api.fetchUserUpdate(obj)
)
export const googleAuth = createAsyncThunk(
    'auth/googleAuth',
    (codeResponse: CodeResponse) => api.fetchGoogleAuth(codeResponse)
)

export const changeTheme = createAsyncThunk(
    'auth/changeTheme',
    (theme_id: number) => api.fetchUpdateTheme(theme_id)
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = undefined
        },
    },
    extraReducers: (builder) => {
        builder
            // Authorization
            .addCase(logUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(logUser.rejected, (state, action) => {
                state.error = action.error.message
            })

            // Registration
            .addCase(regUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(regUser.rejected, (state, action) => {
                state.error = action.error.message
            })

            // LogOut
            .addCase(logOutUser.fulfilled, (state) => {
                state.user = undefined
            })

            // Checker
            .addCase(checkUser.fulfilled, (state, action) => {
                state.user = action.payload.user
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(changeTheme.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.theme_id = action.payload.theme_id
                }
            })
    },
})
export const { clearError } = authSlice.actions
export default authSlice.reducer
