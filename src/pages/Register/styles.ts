import { styled, Box, TextField, Button as MButton } from '@mui/material';

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  gap: 1rem;
`;

export const Logo = styled('img')`
  width: 100%;
  max-width: 15.625rem;
  height: auto;
  margin-bottom: 1rem;
`;

export const Input = styled(TextField)`
  width: 100%;
`;

export const Button = styled(MButton)`
  width: 100%;
  height: 3.125rem;
`;

export const SignInText = styled(Box)`
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 700;
  margin-top: 1rem;
`;
