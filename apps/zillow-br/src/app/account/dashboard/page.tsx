import { useAuth } from '@/contexts/authentication/Context'
import { Box, Button, Paper, Typography } from '@mui/material'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Your Dashboard
        </Typography>

        {user && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" color="primary">
              Hello, {user.name || user.email}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {user.role || 'User'}
            </Typography>
          </Box>
        )}

        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Paper>
    </Box>
  )
}

export default Dashboard
