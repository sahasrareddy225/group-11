import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = Boolean(user);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const trigger = useScrollTrigger();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/connections', label: 'Connections', icon: <PeopleIcon /> },
    { path: '/smart-matching', label: 'Smart Matching', icon: <AutoGraphIcon /> },
    { path: '/achievements', label: 'Achievements', icon: <EmojiEventsIcon /> },
  ];
  const minimalItems = [
    { path: '/', label: 'About' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];
  const showMinimal = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    // keep navigation simple; router will update view
    window.location.href = '/';
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? 'rgba(255, 255, 255, 0.8)'
            : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            : 'none',
          borderBottom: '1px solid rgba(229, 231, 235, 0.5)',
          color: 'var(--text-primary)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: '64px' }}>
            {/* Logo */}
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'var(--primary-500)',
                fontWeight: 700,
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 },
                fontSize: '1.5rem',
                letterSpacing: '-0.025em',
                '&:hover': {
                  color: 'var(--primary-600)',
                },
              }}
            >
              SwapSmart
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                sx={{ color: 'var(--text-primary)' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchor}
                open={Boolean(mobileMenuAnchor)}
                onClose={() => setMobileMenuAnchor(null)}
                sx={{
                  '& .MuiPaper-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                    mt: 1,
                  },
                }}
              >
                {showMinimal ? (
                  <>
                    {minimalItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        component={Link}
                        to={item.path}
                        onClick={() => setMobileMenuAnchor(null)}
                        sx={{ color: 'var(--text-primary)', gap: 1.5 }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </>
                ) : !isLoggedIn ? (
                  <>
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={() => setMobileMenuAnchor(null)}
                      sx={{ color: 'var(--text-primary)', gap: 1.5 }}
                    >
                      Sign In
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={() => setMobileMenuAnchor(null)}
                      sx={{ color: 'var(--text-primary)', gap: 1.5 }}
                    >
                      Get Started
                    </MenuItem>
                  </>
                ) : (
                  <>
                    {navItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        component={Link}
                        to={item.path}
                        onClick={() => setMobileMenuAnchor(null)}
                        sx={{
                          color: location.pathname === item.path
                            ? 'var(--primary-500)'
                            : 'var(--text-primary)',
                          gap: 1.5,
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={handleLogout} sx={{ color: 'var(--text-primary)', gap: 1.5 }}>
                      <LogoutIcon />
                      Logout
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
                flexGrow: 1,
                justifyContent: isLoggedIn ? 'flex-start' : 'flex-end'
              }}
            >
              {showMinimal ? (
                minimalItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: location.pathname === item.path ? 'var(--primary-500)' : 'var(--text-secondary)',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 'var(--radius)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                ))
              ) : !isLoggedIn ? (
                <Box sx={{ flex: 1 }} /> // Spacer for centering auth buttons
              ) : (
                navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path
                        ? 'var(--primary-500)'
                        : 'var(--text-secondary)',
                      backgroundColor: location.pathname === item.path
                        ? 'var(--primary-50)'
                        : 'transparent',
                      '&:hover': {
                        backgroundColor: 'var(--primary-50)',
                        color: 'var(--primary-500)',
                      },
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      px: 2,
                      py: 1,
                      borderRadius: 'var(--radius)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                ))
              )}
            </Box>

            {/* Auth Buttons or Profile Menu (hidden on Home to keep header minimal) */}
            {!showMinimal && (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 2 }}>
                {!isLoggedIn ? (
                  <>
                    <Button
                      component={Link}
                      to="/login"
                      variant="outlined"
                      sx={{
                        borderColor: 'white',
                        color: 'var(--text-primary)',
                        '&:hover': {
                          borderColor: 'var(--primary-500)',
                          backgroundColor: 'transparent',
                        }
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      component={Link}
                      to="/register"
                      variant="contained"
                      sx={{
                        bgcolor: 'var(--primary-500)',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'var(--primary-600)',
                        }
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={(e) => setProfileMenuAnchor(e.currentTarget)}
                      sx={{
                        padding: 0.5,
                        border: '2px solid var(--border)',
                        borderRadius: 'var(--radius-full)',
                        '&:hover': {
                          backgroundColor: 'var(--surface-hover)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: 'var(--primary-100)',
                          color: 'var(--primary-600)',
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={profileMenuAnchor}
                      open={Boolean(profileMenuAnchor)}
                      onClose={() => setProfileMenuAnchor(null)}
                      sx={{
                        '& .MuiPaper-root': {
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          backdropFilter: 'blur(12px)',
                          borderRadius: 'var(--radius-lg)',
                          border: '1px solid var(--border)',
                          boxShadow: 'var(--shadow-lg)',
                          mt: 1,
                        },
                      }}
                    >
                      <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={() => setProfileMenuAnchor(null)}
                        sx={{ gap: 1.5 }}
                      >
                        <PersonIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default Navbar;
