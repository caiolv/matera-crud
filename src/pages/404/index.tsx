import { Typography } from '@mui/material';
import React from 'react';

import { Button, Container } from './styles';

export default function NotFound() {
  return (
    <Container>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Página não encontrada</Typography>

      <Button to="/">Voltar</Button>
    </Container>
  );
}
