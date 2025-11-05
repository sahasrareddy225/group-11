import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Paper, TextField, Button, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
// Navbar is now rendered globally in App.js

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
  // This is a mock registration - in a real app, you'd call an API
  const user = { name: formData.name, email: formData.email };
  login(user);
  toast.success('Registration successful!');
  navigate('/dashboard');
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box 
          sx={{ 
            mt: { xs: 4, sm: 8 },
            px: { xs: 2, sm: 0 }
          }}
        >
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 16px -8px rgba(0,0,0,0.1)'
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                gutterBottom
                sx={{
                  background: 'linear-gradient(45deg, #2563eb 30%, #9333ea 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Join SwapSmart
              </Typography>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Create your account and start connecting
              </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
                variant="outlined"
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  py: 1.5,
                  mb: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Create Account
              </Button>
              <Box 
                sx={{ 
                  textAlign: 'center',
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  mt: 2
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      color: 'inherit',
                      textDecoration: 'none',
                      fontWeight: 500,
                      background: 'linear-gradient(45deg, #2563eb 30%, #9333ea 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Login here
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Register;