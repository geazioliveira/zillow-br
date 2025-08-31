import { Box, Container, Typography } from '@mui/material'
import RegisterForm from '@/forms/register'

const Register = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ color: '#006aff', fontWeight: 'bold', mb: 2 }}
          >
            Zillow Real Estate
          </Typography>

          <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
            Create Your Account
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, textAlign: 'center' }}
          >
            Join us to start your real estate journey
          </Typography>

          <RegisterForm />
        </Box>
      </Box>
    </Container>
  )
}

export default Register
