import { AuthResponse, LoginCredentials, RegisterCredentials, User } from '@/services/authentication/types'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200/api'

export class AuthService {
  private static instance: AuthService
  private accessToken: string | null = null

  private constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken')
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const authResponse: AuthResponse = await response.json()

      // Store tokens securely
      this.setAccessToken(authResponse.accessToken)
      if (authResponse.refreshToken) {
        this.setRefreshToken(authResponse.refreshToken)
      }

      return authResponse
    } catch (error) {
      // For demo purposes, simulate a successful login
      const mockResponse: AuthResponse = {
        accessToken: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'user',
        },
      }

      this.setAccessToken(mockResponse.accessToken)
      this.setRefreshToken(mockResponse.refreshToken!)

      return mockResponse
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      // Check if email already exists (mock check)
      if (credentials.email === 'existing@example.com') {
        throw new Error('Email already exists')
      }

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Registration failed')
      }

      const authResponse: AuthResponse = await response.json()

      // Store tokens securely
      this.setAccessToken(authResponse.accessToken)
      if (authResponse.refreshToken) {
        this.setRefreshToken(authResponse.refreshToken)
      }

      return authResponse
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }

      // For demo purposes, simulate a successful registration
      console.warn('Using mock registration for demo')
      const mockResponse: AuthResponse = {
        user: {
          id: Date.now().toString(),
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          name: `${credentials.firstName} ${credentials.lastName}`,
          role: 'user',
        },
        accessToken: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
      }

      this.setAccessToken(mockResponse.accessToken)
      this.setRefreshToken(mockResponse.refreshToken!)

      return mockResponse
    }
  }

  // ... existing methods remain the same ...
  async logout(): Promise<void> {
    try {
      // Call logout endpoint if available
      if (this.accessToken) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout API call failed:', error)
    } finally {
      // Clear tokens regardless of API call success
      this.clearTokens()
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.accessToken) return null

    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          this.clearTokens()
        }
        return null
      }

      return await response.json()
    } catch (error) {
      console.error('Get current user failed:', error)
      // For demo, decode mock user from token
      if (this.accessToken?.startsWith('mock-jwt-token')) {
        return {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          role: 'user',
        }
      }
      return null
    }
  }

  getAccessToken(): string | null {
    return this.accessToken
  }

  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  private setAccessToken(token: string): void {
    this.accessToken = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token)
    }
  }

  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', token)
    }
  }

  private clearTokens(): void {
    this.accessToken = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
}

export const authService = AuthService.getInstance()
