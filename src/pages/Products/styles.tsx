import { Box, Grid, TableRow, Typography, styled } from '@mui/material';

export const ProductItem = styled(TableRow)`
  background: transparent;
  transition: all 1s;
  &:hover {
    background: #d2d2d2;
  }
`;

export const Item = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const PageHeader = styled(Grid)`
  margin-bottom: 2rem;
  width: 100%;
`;

export const PageTitle = styled(Typography)`
  width: 100%;
`;

export const PageActions = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;
