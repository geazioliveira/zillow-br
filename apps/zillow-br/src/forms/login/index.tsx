import { Alert, Box, Button, TextField } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginFormSchema, LoginFormValues } from '@/forms/login/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/authentication/Context'

const LoginForm = () => {
  const { login, error, isLoading, clearError } = useAuth()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      clearError()
      await login(data)
      // Redirect to dashboard or home page after successful login
      router.push('/dashboard')
    } catch (error) {
      // Error is handled by the auth context
      console.error('Login failed:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        disabled={isSubmitting || isLoading}
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
        disabled={isSubmitting || isLoading}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </Box>
  )
}

export default LoginForm
