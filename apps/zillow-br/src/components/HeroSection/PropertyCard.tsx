import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import BedIcon from '@mui/icons-material/Bed'
import BathtubIcon from '@mui/icons-material/Bathtub'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import { MockPropertiesType } from '@/components/HeroSection/types'

interface PropertyCardProps {
  property: MockPropertiesType
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card sx={{ position: 'relative', height: '100%', cursor: 'pointer' }}>
      <CardMedia
        component="img"
        height="200"
        image={property.image}
        alt={property.address}
        sx={{ position: 'relative' }}
      />
      <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
        <Chip
          label={property.type}
          color={property.type === 'For Sale' ? 'primary' : 'secondary'}
          size="small"
        />
      </Box>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          {property.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <LocationOnIcon
            sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }}
          />
          {property.address}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">{property.beds} bd</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BathtubIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">{property.baths} ba</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SquareFootIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
            <Typography variant="body2">{property.sqft} sqft</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PropertyCard
