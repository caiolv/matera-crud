import { styled, Container as MContainer } from '@mui/material';
import { Link } from 'react-router-dom';

export const Container = styled(MContainer)`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(Link)`
  margin-top: 2rem;
`;
