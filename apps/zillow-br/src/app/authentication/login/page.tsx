'use client'

import React from 'react'
import { Box, Link, Typography } from '@mui/material'
import LoginForm from '@/forms/login'

const Page = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '400px',
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{ color: '#006aff', fontWeight: 'bold', mb: 4 }}
      >
        Zillow Real Estate
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Welcome back
      </Typography>
      <LoginForm />
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          New here?{' '}
          <Link href="/authentication/register" underline="hover">
            Create account
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Page
