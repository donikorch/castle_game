export type User = {
    id: number
    img: string
    username: string
    email: string
    password: string
    user_level: number
    Results: Result[]
    createdAt: Date
}

export type Result = {
    id: number
    monsters: number
    score: number
    time: number
    Level: {
        difficult: string
    }
}
type Leader = {
    img: string
    username: string
    user_level: number
    Results: Result[]
    createdAt: Date
}

export type UsersType = {
    users: User[] | []
    error: string | undefined
}
