import { Box, CircularProgress, Typography } from '@mui/material'

const Loading = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="200px"
    gap={2}
  >
    <CircularProgress />
    <Typography variant="body2" color="text.secondary">
      Loading...
    </Typography>
  </Box>
)

export default Loading
