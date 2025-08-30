'use client'

import React from 'react'
import {
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="h1" gutterBottom sx={{ color: 'white', mb: 2 }}>
            Find Your Dream Home
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: 'white', mb: 4 }}>
            Search millions of homes and connect with local professionals
          </Typography>

          <Paper sx={{ p: 2, maxWidth: 600, mx: 'auto', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                variant="outlined"
                size="medium"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ flexGrow: 1 }}
              />
              <Button variant="contained" size="large" sx={{ px: 4, py: 2 }}>
                Search
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection
