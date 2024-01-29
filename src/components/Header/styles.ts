import { Avatar, Box, Button, AppBar as MAppBar, styled } from '@mui/material';

export const AppBar = styled(MAppBar)`
  background-color: var(--primary);
`;

export const Logo = styled('img')`
  height: 25px;
  cursor: pointer;
`;

export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const AvatarButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;

  &:hover {
    background-color: var(--primary);
  }
`;

export const AvatarImage = styled(Avatar)`
  width: 30px;
  height: 30px;
`;

export const AvatarName = styled('span')`
  color: #fff;
`;
