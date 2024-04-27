import axios, { type AxiosResponse } from 'axios'
import type { CodeResponse } from '@react-oauth/google'
import type { Result, ResultWithoutId } from '../pages/Profile/type'
import type { User } from '../pages/LogReg/type'
import type { User as UserResults } from '../pages/Leadersboard/type'
import type { Level as LevelLobby } from '../pages/Lobby/type'
import type { Level as LevelGame, Theme } from '../pages/Game/type'
// eslint-disable-next-line import/prefer-default-export

type AxiosError = {
    response: {
        data: {
            message: string
        }
    }
} & Error

export const fetchLeadersBoard = async (): Promise<UserResults[]> => {
    const response: AxiosResponse<UserResults[]> =
        await axios.get('/api/users/loadAll')
    return response.data
}

export const fetchSignIn = async (user: {
    username: string
    password: string
}): Promise<User> => {
    try {
        const response: AxiosResponse<{ message: string; user: User }> =
            await axios.post('api/auth/authorization', user)
        return response.data.user
    } catch (error) {
        const axiosError = error as AxiosError
        throw new Error(axiosError.response.data.message)
    }
}

export const fetchSignUp = async (user: {
    username: string
    email: string
    password: string
}): Promise<User> => {
    try {
        const response: AxiosResponse<{ message: string; user: User }> =
            await axios.post('api/auth/registration', user)
        return response.data.user
    } catch (error) {
        const axiosError = error as AxiosError
        throw new Error(axiosError.response.data.message)
    }
}

export const fetchLogOut = async (): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> =
        await axios.get('/api/auth/logout')
    return response.data
}

export const fetchCheckUser = async (): Promise<{
    user: User
    message: string
}> => {
    const response: AxiosResponse<{ user: User; message: string }> =
        await axios.get('/api/auth/check', { withCredentials: true })
    return response.data
}

export const fetchResults = async (): Promise<Result[]> => {
    const response: AxiosResponse<Result[]> =
        await axios.get('/api/game/results')
    return response.data
}

export const fetchUserUpdate = async (obj: FormData): Promise<User> => {
    try {
        const response: AxiosResponse<{ message: string; user: User }> =
            await axios.put(`/api/users/update`, obj)
        return response.data.user
    } catch (error) {
        const axiosError = error as AxiosError
        throw new Error(axiosError.response.data.message)
    }
}

export const fetchLevels = async (): Promise<LevelLobby[]> => {
    const response: AxiosResponse<LevelLobby[]> =
        await axios.get('/api/game/levels')
    return response.data
}

export const fetchLoadUser = async (username: string): Promise<User> => {
    const response: AxiosResponse<User> = await axios.get(
        `/api/users/profile/${username}`
    )
    return response.data
}

export const fetchGoogleAuth = async (
    codeResponse: CodeResponse
): Promise<User> => {
    const response: AxiosResponse<{ user: User }> = await axios.post(
        '/api/auth/google',
        codeResponse
    )

    return response.data.user
}

export const fetchLoadLevel = async (
    difficultId: number
): Promise<LevelGame> => {
    const response: AxiosResponse<LevelGame> = await axios.get(
        `/api/game/level/${difficultId}`
    )
    return response.data
}

export const fetchSaveResult = async (
    result: ResultWithoutId
): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.post(
        `/api/game/result`,
        result
    )
    return response.data
}

export const fetchUpdateLevel = async (
    level: number
): Promise<{ message: string }> => {
    const response: AxiosResponse<{ message: string }> = await axios.put(
        `/api/users/updateLevel`,
        {
            level,
        }
    )
    return response.data
}

export const fetchWordsFromFile = async (): Promise<string[]> => {
    try {
        const response = await axios.get('/api/game/words')
        const words: string[] = response.data
            .split('\n')
            .map((word: string) => word.trim())
        return words
    } catch (error) {
        throw new Error('Failed to fetch words from file')
    }
}

export const fetchLoadTheme = async (theme_id: number): Promise<Theme> => {
    const response: AxiosResponse<Theme> = await axios.get(
        `/api/game/theme/${theme_id}`
    )
    return response.data
}

export const fetchUpdateTheme = async (
    theme_id: number
): Promise<User> => {
    const response: AxiosResponse<{ message: string; user: User }> =
        await axios.put(`/api/users/updateTheme`, {
            theme_id,
        })
    return response.data.user
}
