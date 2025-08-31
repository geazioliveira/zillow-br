export type User = {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  role?: string
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  password: string
  acceptTerms: boolean
} & Omit<User, 'id' | 'role'>

export type AuthResponse = {
  user: User | null
  accessToken: string
  refreshToken: string
}
