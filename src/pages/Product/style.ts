import { Box, Card, styled } from '@mui/material';

export const ProductContainer = styled(Box)``;

export const ProductImage = styled('img')`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.75rem;
`;

export const ProductBox = styled(Card)`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  margin-top: 1rem;
`;

export const ProductHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
