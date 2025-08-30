import React from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{
      backgroundColor: 'white', color: 'black', boxShadow: 1
    }}>
      <Toolbar sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <Typography variant="h4" component="div" sx={{ color: '#006aff', fontWeight: 'bold' }}>
          Zillow Real Estate
        </Typography>
        <Box sx={{ display: 'flex', gap: 2}}>
          <Button>Buy</Button>
          <Button>Rent</Button>
          <Button>Sell</Button>
          <Button>Home Loans</Button>
          <Button>Agent finder</Button>
          <Button color="primary">Sign In</Button>
        </Box>

      </Toolbar>

    </AppBar>
  );
};

export default Header;
