import {
  Box,
  Grid,
  TextField,
  Typography,
  styled,
  Button as MButton,
} from '@mui/material';

export const ModalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ModalContent = styled(Box)`
  width: 100%;
  max-width: 48rem;
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: white;
  z-index: 200;
`;

export const ModalTitle = styled(Typography)`
  /* font-size: 1.5rem;
  font-weight: bold; */
`;

export const FormContainer = styled(Grid)`
  width: 100%;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const PreviewImage = styled('img')`
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 0.5rem;
  object-fit: cover;
`;

export const Button = styled(MButton)`
  width: 100%;
  margin-top: 2rem;
  height: 3.125rem;
`;
