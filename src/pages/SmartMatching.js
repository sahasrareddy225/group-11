import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { toast } from 'react-toastify';
// Navbar is now rendered globally in App.js

const SmartMatching = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in a real app, this would come from an API
  const suggestedConnections = [
    {
      id: 1,
      name: 'Emily Davis',
      title: 'Frontend Developer',
      matchScore: 95,
      skillsToTeach: ['React', 'Vue.js', 'CSS Animation'],
      skillsToLearn: ['Python', 'Data Science'],
      avatar: 'https://i.pravatar.cc/150?img=1',
      location: 'San Francisco, CA',
    },
    {
      id: 2,
      name: 'Alex Wilson',
      title: 'Data Scientist',
      matchScore: 88,
      skillsToTeach: ['Python', 'Machine Learning', 'Data Analysis'],
      skillsToLearn: ['React', 'JavaScript'],
      avatar: 'https://i.pravatar.cc/150?img=2',
      location: 'New York, NY',
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      title: 'UX/UI Designer',
      matchScore: 92,
      skillsToTeach: ['Figma', 'User Research', 'Design Systems'],
      skillsToLearn: ['Frontend Development', 'React Native'],
      avatar: 'https://i.pravatar.cc/150?img=3',
      location: 'Miami, FL',
    },
    {
      id: 4,
      name: 'James Chen',
      title: 'Mobile Developer',
      matchScore: 85,
      skillsToTeach: ['React Native', 'iOS Development', 'Flutter'],
      skillsToLearn: ['UI Design', 'UX Research'],
      avatar: 'https://i.pravatar.cc/150?img=4',
      location: 'Seattle, WA',
    },
    {
      id: 5,
      name: 'Priya Patel',
      title: 'Backend Developer',
      matchScore: 90,
      skillsToTeach: ['Node.js', 'MongoDB', 'GraphQL'],
      skillsToLearn: ['AWS', 'System Design'],
      avatar: 'https://i.pravatar.cc/150?img=5',
      location: 'Austin, TX',
    },
    {
      id: 6,
      name: 'Marcus Johnson',
      title: 'DevOps Engineer',
      matchScore: 87,
      skillsToTeach: ['Docker', 'Kubernetes', 'CI/CD'],
      skillsToLearn: ['Cloud Architecture', 'Security'],
      avatar: 'https://i.pravatar.cc/150?img=6',
      location: 'Chicago, IL',
    }
  ];

  const handleConnect = (userId) => {
    // In a real app, this would send a connection request
    toast.success('Connection request sent!');
  };
    // Filter the connections based on search term
    const getFilteredConnections = () => {
      if (!searchTerm) return suggestedConnections;
    
      const searchLower = searchTerm.toLowerCase();
      return suggestedConnections.filter(connection => 
        connection.name.toLowerCase().includes(searchLower) ||
        connection.location.toLowerCase().includes(searchLower) ||
        connection.skillsToTeach.some(skill => skill.toLowerCase().includes(searchLower)) ||
        connection.skillsToLearn.some(skill => skill.toLowerCase().includes(searchLower))
      );
    };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Smart Matching
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Find perfect skill-swap partners based on your interests and expertise
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mt: 3,
            mb: 4,
            backgroundColor: 'white',
            p: 3,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by skills, name, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                  }
                }
              }}
            />

          </Box>
        </Box>

        <Grid container spacing={4}>
          {getFilteredConnections().map((connection) => (
            <Grid item xs={12} md={6} key={connection.id}>
              <Card>
                <CardContent sx={{ '&:hover': { transform: 'scale(1.02)', transition: 'transform 0.3s ease' } }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        src={connection.avatar}
                        sx={{ 
                          width: 80, 
                          height: 80, 
                          mr: 2,
                          border: '3px solid',
                          borderColor: connection.matchScore >= 90 ? '#4caf50' : '#2196f3',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{connection.name}</Typography>
                        <Typography color="textSecondary" sx={{ mb: 1 }}>{connection.title}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 0.5
                        }}>
                          📍 {connection.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label={`${connection.matchScore}% Match`}
                      color="primary"
                      sx={{
                        backgroundColor: connection.matchScore >= 90 ? '#4caf50' : '#2196f3',
                        height: '28px',
                        fontWeight: 600,
                        '& .MuiChip-label': {
                          px: 2
                        },
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: 3, backgroundColor: 'rgba(0,0,0,0.02)', p: 2, borderRadius: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                      Skills to Teach:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {connection.skillsToTeach.map((skill) => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          size="small" 
                          color="primary"
                          sx={{
                            borderRadius: '4px',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              transition: 'transform 0.2s ease'
                            }
                          }}
                        />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" gutterBottom sx={{ color: 'secondary.main', fontWeight: 600 }}>
                      Skills to Learn:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {connection.skillsToLearn.map((skill) => (
                        <Chip 
                          key={skill} 
                          label={skill} 
                          size="small" 
                          color="secondary"
                          sx={{
                            borderRadius: '4px',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              transition: 'transform 0.2s ease'
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleConnect(connection.id)}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Connect & Start Learning
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default SmartMatching;