import matera from '@/assets/matera-white.png';
import { api } from '@/service/api';
import { setLoggedOut } from '@/store/actions/user';
import { IMainState } from '@/types/store.type';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  AvatarButton,
  AvatarImage,
  AvatarName,
  Container,
  Logo,
} from './styles';

interface IProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

export default function Header(props: IProps) {
  const dispatch = useDispatch();
  const { info } = useSelector((state: IMainState) => state.user);
  const { drawerWidth, handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(
      setLoggedOut({
        user: null,
        isLoggedIn: false,
      }),
    );
    api.defaults.headers.Authorization = '';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Container>
          <Logo src={matera} alt="" />

          <AvatarButton
            id="user-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <AvatarImage src={info?.image} />
            <AvatarName sx={{ display: { xs: 'none', md: 'block' } }}>
              {info?.nome}
            </AvatarName>
          </AvatarButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'user-button',
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
