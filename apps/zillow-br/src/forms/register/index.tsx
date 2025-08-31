'use client'

import React from 'react'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  Link,
  TextField,
} from '@mui/material'
import { useAuth } from '@/contexts/authentication/Context'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  registerFormSchema,
  RegisterFormValues,
} from '@/forms/register/validation'
import { zodResolver } from '@hookform/resolvers/zod'

const RegisterForm = () => {
  const { register: registerUser, error, isLoading, clearError } = useAuth()
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      clearError()
      await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        acceptTerms: data.acceptTerms,
      })
      router.push('/authentication/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      )}

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register('firstName')}
            label="First Name"
            fullWidth
            autoFocus
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            margin="normal"
            disabled={isSubmitting || isLoading}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            {...register('lastName')}
            label="Last Name"
            fullWidth
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            margin="normal"
            disabled={isSubmitting || isLoading}
          />
        </Grid2>
      </Grid2>

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
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

      <TextField
        {...register('confirmPassword')}
        label="Confirm Password"
        type="password"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        margin="normal"
        disabled={isSubmitting || isLoading}
      />

      <FormControlLabel
        control={
          <Checkbox
            {...register('acceptTerms')}
            disabled={isSubmitting || isLoading}
            color="primary"
          />
        }
        label={
          <Box component="span" sx={{ fontSize: '0.875rem' }}>
            I accept the
            <Link href="/terms" target="_blank" underline="hover">
              Terms and Conditions
            </Link>{' '}
            and
            <Link href="/privacy" target="_blank" underline="hover">
              Privacy Policy
            </Link>
          </Box>
        }
        sx={{ mt: 1, alignItems: 'flex-start' }}
      />

      {errors.acceptTerms && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errors.acceptTerms.message}
        </Alert>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting || isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Link
          href="/authentication/login"
          underline="hover"
          sx={{ fontSize: '0.875rem' }}
        >
          Already have an account? Sign in
        </Link>
      </Box>
    </Box>
  )
}

export default RegisterForm
