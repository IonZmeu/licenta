import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import "../components/Navbar.css"; 

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function Logout() {
    localStorage.removeItem('token');
    window.location.reload()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            onClick={() => navigate('/')}
            variant="h6"
            noWrap
            component="a"
            className="clickableWAT"
          >
            Work And Travel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={"Forum"} onClick={() => navigate('/forum/1')}>
                <Typography textAlign="center">{"Forum"}</Typography>
              </MenuItem>
              <MenuItem key={"Jobs"} onClick={() => navigate('/jobs/1')}>
                <Typography textAlign="center">{"Jobs"}</Typography>
              </MenuItem>
              <MenuItem key={"Create Job"} onClick={() => navigate('/createJob')}>
                <Typography textAlign="center">{"Create Job"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
              key={"Forum"}
              onClick={() => navigate('/forum/1')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"Forum"}
          </Button>

          <Button
              key={"Jobs"}
              onClick={() => navigate('/jobs/1')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"Jobs"}
          </Button>

          <Button
              key={"Create Job"}
              onClick={() => navigate('/createJob')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"Create Job"}
          </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
            {localStorage.getItem('token') != null ? (
              <div>
              <MenuItem key={"Profile"} onClick={() => navigate('/profile')}>
              <Typography textAlign="center">{"Profile"}</Typography>
              </MenuItem>

              <MenuItem key={"Logout"} onClick={() => Logout()}>
              <Typography textAlign="center">{"Logout"}</Typography>
              </MenuItem>
              </div>
            ) : null}
            
            {localStorage.getItem('token') === null ? (
              <MenuItem key={"Login"} onClick={() => navigate('/login')}>
              <Typography textAlign="center">{"Login"}</Typography>
                </MenuItem>
            ) : null}
            
            
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;