import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid, Card, CardContent, Box, useTheme } from '@mui/material';
import { School, Timeline, Groups, ArrowForward } from '@mui/icons-material';
import { keyframes } from '@mui/system';
// Navbar is now rendered globally in App.js

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(-45deg, #2563eb, #3b82f6, #6366f1, #9333ea)',
          backgroundSize: '400% 400%',
          animation: `${gradientShift} 15s ease infinite`,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', color: 'white', py: { xs: 8, md: 12 } }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(to right, #ffffff, #e2e8f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
                textAlign: 'center',
                maxWidth: '1000px',
                mx: 'auto',
                lineHeight: 1.2
              }}
            >
              Connect, Learn, and Grow Together
            </Typography>
            <Typography 
              variant="h5" 
              sx={{
                mb: 6,
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '800px',
                mx: 'auto',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 400
              }}
            >
              Share your skills, learn from others, and build meaningful connections in our vibrant community.
            </Typography>
            <Box 
              sx={{ 
                display: 'flex', 
                gap: 3, 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  backgroundColor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                Get Started Free
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'transform 0.2s ease-in-out'
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #2563eb, #3b82f6)',
                    color: 'white'
                  }}
                >
                  <Timeline sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Smart Matching
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Our AI-powered algorithm finds the perfect skill-swap partners based on your interests, expertise level, and learning goals.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #7c3aed, #8b5cf6)',
                    color: 'white'
                  }}
                >
                  <School sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Track Progress
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Earn badges, track achievements, and visualize your learning journey as you master new skills and help others grow.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Box 
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #9333ea, #a855f7)',
                    color: 'white'
                  }}
                >
                  <Groups sx={{ fontSize: 32 }} />
                </Box>
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Connect & Learn
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                Join a vibrant community of learners, schedule flexible sessions, and build lasting connections through shared knowledge.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: { xs: 8, md: 12 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)'
          }
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            textAlign="center" 
            mb={8}
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2563eb 30%, #9333ea 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: '-10%',
                    width: '20%',
                    height: '2px',
                    background: 'linear-gradient(to right, #2563eb, transparent)',
                    display: { xs: 'none', md: 'block' }
                  }
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: 'primary.light',
                    opacity: 0.2,
                    fontSize: '8rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  1
                </Typography>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Create Your Profile
                </Typography>
                <Typography color="text.secondary">
                  Sign up and customize your profile with the skills you want to share and learn. Our platform makes it easy to showcase your expertise.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: '-10%',
                    width: '20%',
                    height: '2px',
                    background: 'linear-gradient(to right, #7c3aed, transparent)',
                    display: { xs: 'none', md: 'block' }
                  }
                }}
              >
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: 'secondary.light',
                    opacity: 0.2,
                    fontSize: '8rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  2
                </Typography>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Find Perfect Matches
                </Typography>
                <Typography color="text.secondary">
                  Our smart algorithm suggests ideal skill-swap partners based on mutual interests and complementary skills.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    color: 'secondary.main',
                    opacity: 0.2,
                    fontSize: '8rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    mb: 2
                  }}
                >
                  3
                </Typography>
                <Typography variant="h5" fontWeight={600} mb={2}>
                  Start Learning
                </Typography>
                <Typography color="text.secondary">
                  Connect with your matches, schedule convenient sessions, and begin your collaborative learning journey.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Home;