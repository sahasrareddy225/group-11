import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Avatar,
} from '@mui/material';
import { toast } from 'react-toastify';
// Navbar is now rendered globally in App.js

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState({ teach: '', learn: '' });
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Passionate about learning and teaching new skills.',
    skillsToTeach: ['JavaScript', 'React', 'Node.js'],
    skillsToLearn: ['Python', 'Machine Learning', 'UI/UX Design'],
    location: 'New York, USA',
    linkedin: 'linkedin.com/in/johndoe',
  });

  const handleAddSkill = (type) => {
    if (type === 'teach' && newSkill.teach) {
      setFormData({
        ...formData,
        skillsToTeach: [...formData.skillsToTeach, newSkill.teach]
      });
      setNewSkill({ ...newSkill, teach: '' });
    } else if (type === 'learn' && newSkill.learn) {
      setFormData({
        ...formData,
        skillsToLearn: [...formData.skillsToLearn, newSkill.learn]
      });
      setNewSkill({ ...newSkill, learn: '' });
    }
  };

  const handleRemoveSkill = (type, skillToRemove) => {
    if (type === 'teach') {
      setFormData({
        ...formData,
        skillsToTeach: formData.skillsToTeach.filter(skill => skill !== skillToRemove)
      });
    } else {
      setFormData({
        ...formData,
        skillsToLearn: formData.skillsToLearn.filter(skill => skill !== skillToRemove)
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd call an API to update the profile
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4">Your Profile</Typography>
            <Button
              variant="contained"
              color={isEditing ? 'secondary' : 'primary'}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 120, height: 120, margin: '0 auto 20px' }}
                  src="/path-to-avatar.jpg"
                />
                {isEditing && (
                  <Button variant="outlined" component="label">
                    Upload Photo
                    <input type="file" hidden />
                  </Button>
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!isEditing}
                />
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  margin="normal"
                  disabled={!isEditing}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Skills to Teach
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {formData.skillsToTeach.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={isEditing ? () => handleRemoveSkill('teach', skill) : undefined}
                      color="primary"
                      sx={{
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        },
                      }}
                    />
                  ))}
                </Box>
                {isEditing && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      size="small"
                      placeholder="Add new skill"
                      value={newSkill.teach}
                      onChange={(e) => setNewSkill({ ...newSkill, teach: e.target.value })}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddSkill('teach')}
                      size="small"
                    >
                      Add
                    </Button>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Skills to Learn
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {formData.skillsToLearn.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={isEditing ? () => handleRemoveSkill('learn', skill) : undefined}
                      color="secondary"
                      sx={{
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        },
                      }}
                    />
                  ))}
                </Box>
                {isEditing && (
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                      size="small"
                      placeholder="Add new skill"
                      value={newSkill.learn}
                      onChange={(e) => setNewSkill({ ...newSkill, learn: e.target.value })}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAddSkill('learn')}
                      size="small"
                    >
                      Add
                    </Button>
                  </Box>
                )}
              </Grid>

              {isEditing && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Profile;