import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  TextField,
  Chip,
  Divider,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
// Navbar is now rendered globally in App.js

const ConnectionDetails = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  // Mock data - in a real app, this would come from an API based on the ID
  const connection = {
    id,
    name: 'Sarah Johnson',
    title: 'UX Designer',
    bio: 'Passionate about creating intuitive user experiences. Always eager to learn new technologies and share my knowledge with others.',
    skillsToTeach: ['UI Design', 'Figma', 'User Research'],
    skillsToLearn: ['React', 'JavaScript'],
    avatar: '/path-to-avatar1.jpg',
    linkedin: 'linkedin.com/in/sarahjohnson',
    availability: ['Monday evenings', 'Wednesday afternoons', 'Weekends'],
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to an API
      toast.success('Message sent successfully!');
      setMessage('');
    } else {
      toast.error('Please enter a message');
    }
  };

  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {/* Profile Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={connection.avatar}
              sx={{ width: 120, height: 120, mr: 4 }}
            />
            <Box>
              <Typography variant="h4" gutterBottom>
                {connection.name}
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {connection.title}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<LinkedInIcon />}
                href={`https://${connection.linkedin}`}
                target="_blank"
                sx={{ mt: 1 }}
              >
                LinkedIn Profile
              </Button>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            {connection.bio}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Skills to Teach:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {connection.skillsToTeach.map((skill) => (
                <Chip key={skill} label={skill} color="primary" />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Skills to Learn:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {connection.skillsToLearn.map((skill) => (
                <Chip key={skill} label={skill} color="secondary" />
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Availability:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {connection.availability.map((time) => (
                <Chip key={time} label={time} variant="outlined" />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* Message Section */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Send Message
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <form onSubmit={handleSendMessage}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ConnectionDetails;