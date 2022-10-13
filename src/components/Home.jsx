import React from 'react';

import { Grid, Paper, Link as LinkMaterial } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const Item = styled(Paper)({
  textAlign: 'center',
  padding: '2rem',
  fontSize: '20px',
  width: '200px',
  userSelect: 'none',
  cursor: 'pointer',
  textDecoration: 'none',
});

export const Home = ({ data }) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          justifyContent: 'center',
        }}
      >
        {data.map(({ id, title, url }) => (
          <Grid key={id} item>
            <LinkMaterial underline="none" component={Link} to={url}>
              <Item>{title}</Item>
            </LinkMaterial>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
