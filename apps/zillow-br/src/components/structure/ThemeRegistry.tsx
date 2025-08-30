'use client'

import React from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '@/config/theme'

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </ThemeProvider>
  )
}
