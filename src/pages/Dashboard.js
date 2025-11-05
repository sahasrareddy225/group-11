import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  LinearProgress,
  IconButton
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// Navbar is now rendered globally in App.js

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Mock data for demonstration
  const stats = {
    skillsLearned: 5,
    activeSessions: 3,
    connections: 12,
    nextSession: 'Web Development with Sarah • Tomorrow at 2 PM'
  };

  const skillProgress = [
    { skill: 'JavaScript', progress: 75 },
    { skill: 'UI Design', progress: 60 },
    { skill: 'Python', progress: 45 }
  ];

  const dashboardItems = [
    {
      title: 'Profile',
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      description: 'View and edit your profile',
      link: '/profile',
    },
    {
      title: 'Connections',
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      description: 'Manage your connections',
      link: '/connections',
    },
    {
      title: 'Smart Matching',
      icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
      description: 'Find new skill swap partners',
      link: '/smart-matching',
    },
    {
      title: 'Achievements',
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      description: 'Track your progress',
      link: '/achievements',
    },
  ];

  return (
    <div>
      <Box 
        sx={{ 
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 4
        }}
      >
        <Container maxWidth="xl">
          {/* Header Section */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  width: 56, 
                  height: 56,
                  bgcolor: 'primary.main'
                }}
              >
                {(user?.name?.[0] || 'U').toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight={700}>
                  Welcome back, {user?.name || 'User'}!
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Your next session: {stats.nextSession}
                </Typography>
              </Box>
            </Box>
            <IconButton 
              sx={{ 
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': { bgcolor: 'background.paper' }
              }}
            >
              <NotificationsIcon />
            </IconButton>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'primary.main',
                        color: 'white',
                        display: 'flex'
                      }}
                    >
                      <TrendingUpIcon />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      Skills Learned
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                    {stats.skillsLearned}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    +2 this month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        bgcolor: 'secondary.main',
                        color: 'white',
                        display: 'flex'
                      }}
                    >
                      <AutoGraphIcon />
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      Active Sessions
                    </Typography>
                  </Box>
                  <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                    {stats.activeSessions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Next session in 2 days
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                    Skill Progress
                  </Typography>
                  {skillProgress.map((skill) => (
                    <Box key={skill.skill} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {skill.skill}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {skill.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'grey.100',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            backgroundImage: 'linear-gradient(45deg, #2563eb, #9333ea)'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={3}>
            {dashboardItems.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    borderRadius: 3,
                    boxShadow: 'none',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px -10px rgba(0,0,0,0.1)',
                      borderColor: 'primary.main',
                      '& .arrow-icon': {
                        transform: 'translateX(4px)'
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2
                      }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: item.title === 'Profile' ? 'primary.main' :
                                  item.title === 'Connections' ? 'secondary.main' :
                                  item.title === 'Smart Matching' ? '#7c3aed' : '#9333ea',
                          color: 'white',
                          display: 'flex'
                        }}
                      >
                        {item.icon}
                      </Box>
                      <ArrowForwardIcon 
                        className="arrow-icon"
                        sx={{ 
                          color: 'text.secondary',
                          transition: 'transform 0.2s ease-in-out'
                        }} 
                      />
                    </Box>
                    <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={item.link}
                      variant="text"
                      sx={{
                        p: 0,
                        '&:hover': {
                          bgcolor: 'transparent',
                          color: 'primary.main'
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;