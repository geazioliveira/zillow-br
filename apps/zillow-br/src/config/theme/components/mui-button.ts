export const MuiButton = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      padding: '10px 20px',
    },
    contained: {
      boxShadow: 'none',
      '&:hover': {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }
    }
  }
}
