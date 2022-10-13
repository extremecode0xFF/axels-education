import React from 'react';

import { Link } from 'react-router-dom';
import { AppBar, Container, styled } from '@mui/material';

const Image = styled('img')({
  width: '100px',
  cursor: 'pointer',
});

export const Header = () => {
  return (
    <AppBar position="fixed">
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link to="/">
          <Image
            src="https://axels.com.ua/images/axels-logo3.png"
            alt="logo-axels"
          />
        </Link>
      </Container>
    </AppBar>
  );
};
