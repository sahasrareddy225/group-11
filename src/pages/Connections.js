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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MessageIcon from '@mui/icons-material/Message';
import SendIcon from '@mui/icons-material/Send';
// Navbar is now rendered globally in App.js

const Connections = () => {
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'UX Designer',
      skillsToTeach: ['UI Design', 'Figma', 'User Research'],
      skillsToLearn: ['React', 'JavaScript'],
      avatar: '/path-to-avatar1.jpg',
      linkedin: 'linkedin.com/in/sarahjohnson',
      messages: [
        { id: 1, text: "Hi, I'd love to learn React from you!", sender: 'me', timestamp: '2025-11-04T14:30:00' },
        { id: 2, text: "I'd be happy to teach you React! When would you like to start?", sender: 'them', timestamp: '2025-11-04T14:35:00' }
      ]
    },
    {
      id: 2,
      name: 'Mike Smith',
      title: 'Full Stack Developer',
      skillsToTeach: ['Python', 'Django', 'PostgreSQL'],
      skillsToLearn: ['AWS', 'DevOps'],
      avatar: '/path-to-avatar2.jpg',
      linkedin: 'linkedin.com/in/mikesmith',
      messages: [
        { id: 1, text: "Hey Mike, interested in learning about AWS?", sender: 'me', timestamp: '2025-11-03T10:00:00' },
        { id: 2, text: "Yes, that would be great! I can help you with Python in return.", sender: 'them', timestamp: '2025-11-03T10:15:00' }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    setConnections(prevConnections => 
      prevConnections.map(conn => {
        if (conn.id === selectedConnection.id) {
          return {
            ...conn,
            messages: [
              ...conn.messages,
              {
                id: conn.messages.length + 1,
                text: newMessage,
                sender: 'me',
                timestamp: new Date().toISOString()
              }
            ]
          };
        }
        return conn;
      })
    );

    setNewMessage('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Connections
        </Typography>
        <Grid container spacing={4}>
          {connections.map((connection) => (
            <Grid item xs={12} md={6} key={connection.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={connection.avatar}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">{connection.name}</Typography>
                      <Typography color="textSecondary">{connection.title}</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Skills to Teach:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                      {connection.skillsToTeach.map((skill) => (
                        <Chip key={skill} label={skill} size="small" color="primary" />
                      ))}
                    </Box>

                    <Typography variant="subtitle2" gutterBottom>
                      Skills to Learn:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {connection.skillsToLearn.map((skill) => (
                        <Chip key={skill} label={skill} size="small" color="secondary" />
                      ))}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      startIcon={<LinkedInIcon />}
                      variant="outlined"
                      color="primary"
                      component="a"
                      href={`https://${connection.linkedin}`}
                      target="_blank"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      startIcon={<MessageIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedConnection(connection);
                        setShowChat(true);
                      }}
                    >
                      Message
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Chat Dialog */}
        <Dialog
          open={showChat}
          onClose={() => {
            setShowChat(false);
            setSelectedConnection(null);
          }}
          maxWidth="sm"
          fullWidth
        >
          {selectedConnection && (
            <>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar src={selectedConnection.avatar} />
                  <Typography variant="h6">{selectedConnection.name}</Typography>
                </Box>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ 
                  height: '400px', 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: 2,
                  overflowY: 'auto',
                  mb: 2
                }}>
                  {selectedConnection.messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        alignSelf: message.sender === 'me' ? 'flex-end' : 'flex-start',
                        maxWidth: '80%'
                      }}
                    >
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          backgroundColor: message.sender === 'me' ? 'primary.main' : 'grey.100',
                          color: message.sender === 'me' ? 'white' : 'text.primary'
                        }}
                      >
                        <Typography variant="body1">{message.text}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          {formatTimestamp(message.timestamp)}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    multiline
                    maxRows={4}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    Send
                  </Button>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={() => {
                    setShowChat(false);
                    setSelectedConnection(null);
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </div>
  );
};

export default Connections;