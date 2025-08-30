import { Box, Button, Container, Grid2, Typography } from '@mui/material'
import HeroSection from '@/components/HeroSection'
import { mockProperties } from '@/components/HeroSection/utils'
import PropertyCard from '@/components/HeroSection/PropertyCard'
import Header from '@/components/structure/Header'
import React from 'react'

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <>
      <Header />
      <Box>
        <HeroSection />

        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            Recent Listings
          </Typography>

          <Grid2 container spacing={3}>
            {mockProperties.map((property) => (
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                  md: 3,
                }}
                key={property.id}
              >
                <PropertyCard property={property} />
              </Grid2>
            ))}
          </Grid2>
        </Container>

        <Box sx={{ bgcolor: 'grey.50', py: 6 }}>
          <Container maxWidth="lg">
            <Grid2 container spacing={4}>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Buy a home
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Find your place with an immersive photo experience and the
                  most listings, including things you won't find anywhere else.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Browse homes
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }} alignContent="center">
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Rent a home
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  We're creating a seamless online experience – from shopping on
                  the largest rental network, to applying, to paying rent.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Find rentals
                </Button>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  Sell a home
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Whether you're ready to sell or looking for answers, we'll
                  guide you with data and expertise specific to your needs.
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  See your options
                </Button>
              </Grid2>
            </Grid2>
          </Container>
        </Box>
      </Box>
    </>
  )
}
