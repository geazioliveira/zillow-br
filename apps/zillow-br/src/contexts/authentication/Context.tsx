'use client'

import { AuthContextType } from '@/contexts/authentication/types'
import { createContext, useContext, useEffect, useReducer } from 'react'
import {
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from '@/services/authentication/types'
import authReducer from '@/contexts/authentication/AuthReducer'
import { authService } from '@/services/authentication/AuthService'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })

        if (authService.isAuthenticated()) {
          const user = await authService.getCurrentUser()
          if (user) {
            dispatch({ type: 'SET_USER', payload: user })
          } else {
            dispatch({ type: 'LOGOUT' })
          }
        } else {
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } catch (error) {
        console.error('Auth initializing authentication:', error)
        dispatch({
          type: 'SET_ERROR',
          payload: 'Failed to initialize authentication',
        })
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      const response = await authService.login(credentials)
      dispatch({ type: 'SET_USER', payload: response.user })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      dispatch({ type: 'CLEAR_ERROR' })

      const authResponse = await authService.register(credentials)
      dispatch({ type: 'SET_USER', payload: authResponse.user })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      await authService.logout()
      dispatch({ type: 'LOGOUT' })
    } catch (error) {
      console.error('Logout failed:', error)
      // Force logou event if API call fails
      dispatch({ type: 'LOGOUT' })
    }
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
