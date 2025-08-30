import { Button, TextField } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { loginFormSchema, LoginFormValues } from '@/forms/Login/validation'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginForm = () => {
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

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    try {
      console.log('Form Submitted:', data)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        autoFocus
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        disabled={isSubmitting}
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  )
}

export default LoginForm
