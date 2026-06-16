export type FieldErrors = {
    username?: boolean
    email?: boolean
    password?: boolean
    terms?: boolean
}

export type AuthState = {
    error?: string
    fieldErrors?: FieldErrors
}