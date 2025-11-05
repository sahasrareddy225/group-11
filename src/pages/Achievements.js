import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Button,
  Badge,
  Chip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SchoolIcon from '@mui/icons-material/School';
import DownloadIcon from '@mui/icons-material/Download';
// Navbar is now rendered globally in App.js

const Achievements = () => {
  // UI state for certificate dialog
  const [showCertificates, setShowCertificates] = useState(false);
  const [profileData] = useState({
    name: 'John Doe', // This would come from your profile API/state management in a real app
  });

  // Mock certificates (would come from API in real app)
  const [certificates] = useState([
    {
      id: 1,
      title: 'React.js Fundamentals',
      issueDate: '2023-10-15',
      type: 'Learning',
      // local SVG to avoid DNS/CORS issues
      imageUrl: '/certificates/react-fundamentals.svg',
    },
    {
      id: 2,
      title: 'UI/UX Design Mentorship',
      issueDate: '2023-09-30',
      type: 'Teaching',
      imageUrl: '/certificates/uiux-mentorship.svg',
    },
  ]);

  const handleDownloadCertificate = async (certificate) => {
    // Normalize URL carefully — do NOT force https:// for same-origin paths like '/certificates/...'
    // If it's already absolute (http/https) return as-is. If it's protocol-relative (//host/...), prefix with current protocol.
    // If it's a root-relative path (starts with '/') or a relative path, convert to an absolute URL using window.location.origin so fetch/anchor use the correct host.
    const normalizeUrl = (raw) => {
      if (!raw) return raw;
      const url = String(raw).trim();
      if (/^https?:\/\//i.test(url)) return url;
      if (/^\/\//.test(url)) return `${window.location.protocol}${url}`;
      if (url.startsWith('/')) return `${window.location.origin}${url}`; // same-origin absolute
      // relative path like 'certs/foo.svg' or './certs/foo.svg'
      return `${window.location.origin}/${url.replace(/^\/.*/, '').replace(/^\.\//, '')}`;
    };

    const urlToFetch = normalizeUrl(certificate.imageUrl || '');

    try {
      // Fetch the resource. For SVGs we'll fetch text so we can inject the user's name into the SVG markup
      const res = await fetch(urlToFetch);
      if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);

      // Determine extension/content-type
      const contentType = (res.headers.get('content-type') || '').toLowerCase();
      const urlExtMatch = (certificate.imageUrl || '').match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
      const extFromUrl = urlExtMatch && urlExtMatch[1] ? urlExtMatch[1].toLowerCase() : '';
      const isSvg = contentType.includes('svg') || extFromUrl === 'svg';

      const safeName = profileData.name.replace(/[^a-z0-9\-_.]/gi, '_');
      const safeTitle = (certificate.title || 'certificate').replace(/[^a-z0-9\-_.]/gi, '_');

      if (isSvg) {
        // Read SVG as text so we can inject the recipient's name into the markup
        const svgText = await res.text();
        const escapeXml = (str) => String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
        const nameToInsert = escapeXml(profileData.name);

        let updatedSvg = svgText;
        // 1) Try replacing an element that has id="recipient-name"
        updatedSvg = updatedSvg.replace(/(<[^>]*id=["']recipient-name["'][^>]*>)([\s\S]*?)(<\/[^>]+>)/i, `$1${nameToInsert}$3`);
        // 2) Try common placeholders
        if (updatedSvg === svgText) updatedSvg = updatedSvg.replace(/{{\s*NAME\s*}}/g, nameToInsert);
        if (updatedSvg === svgText) updatedSvg = updatedSvg.replace(/__NAME__/g, nameToInsert);
        if (updatedSvg === svgText) updatedSvg = updatedSvg.replace(/RECIPIENT_NAME/g, nameToInsert);
        
        // 3) If still unchanged, append a centered <text> element near the bottom of the SVG
        if (updatedSvg === svgText) {
          updatedSvg = updatedSvg.replace(/<\/svg>/i, `  <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" style="font-family: Arial, Helvetica, sans-serif; font-size:36px; fill:#333">${nameToInsert}</text>\n</svg>`);
        }

        const svgBlob = new Blob([updatedSvg], { type: 'image/svg+xml' });
        const blobUrl = window.URL.createObjectURL(svgBlob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `${safeTitle}_${safeName}.svg`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          a.remove();
        }, 1500);
      } else {
        // Non-SVG: fallback to blob download (images, pdfs, etc.)
        const blob = await res.blob();

        let ext = 'bin';
        if (blob && blob.type) {
          if (blob.type.includes('png')) ext = 'png';
          else if (blob.type.includes('jpeg') || blob.type.includes('jpg')) ext = 'jpg';
          else if (blob.type.includes('pdf')) ext = 'pdf';
          else if (blob.type.includes('svg')) ext = 'svg';
        } else if (extFromUrl) {
          ext = extFromUrl;
        }

        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `${safeTitle}_${safeName}.${ext}`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          a.remove();
        }, 1500);
      }
    } catch (err) {
      console.error('Download failed', err);

      // Fallback: try programmatic anchor click using the original relative/path url (this works for same-origin static files in many browsers)
      try {
        const safeName = profileData.name.replace(/[^a-z0-9\-_.]/gi, '_');
        const safeTitle = (certificate.title || 'certificate').replace(/[^a-z0-9\-_.]/gi, '_');
        const extMatch = (certificate.imageUrl || '').match(/\.([a-z0-9]+)(?:\?|$)/i);
        const fallbackExt = extMatch && extMatch[1] ? extMatch[1] : 'svg';
        const a = document.createElement('a');
        a.style.display = 'none';
        // Use the original URL as-is for the anchor so relative/same-origin paths work
        a.href = certificate.imageUrl;
        a.download = `${safeTitle}_${safeName}.${fallbackExt}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      } catch (anchorErr) {
        console.error('Anchor fallback failed', anchorErr);
      }

      // Ultimate fallback: open the resource in a new tab and show guidance
      try {
        window.open(urlToFetch, '_blank');
      } catch (openErr) {
        console.error('Fallback open failed', openErr);
      }

      // Helpful guidance for the user when external host cannot be reached
      // eslint-disable-next-line no-alert
      alert(`Unable to download certificate from ${certificate.imageUrl}.\nPossible causes: network/DNS blocking or the host is unreachable.\nYou can:\n • Open the image in a new tab to view it, or\n • Ensure the dev server is running and the file exists under /public/certificates/`);
    }
  };
  // Certificate Dialog Component
  const CertificateDialog = () => (
    <Dialog
      open={showCertificates}
      onClose={() => setShowCertificates(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Your Certificates
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {certificates.map((cert) => (
            <Grid item xs={12} key={cert.id}>
              <Card sx={{
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
                transition: 'all 0.3s ease',
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {cert.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Issued on: {new Date(cert.issueDate).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={cert.type}
                        color={cert.type === 'Learning' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Button
                      variant="contained"
                      onClick={() => handleDownloadCertificate(cert)}
                      startIcon={<DownloadIcon />}
                      sx={{
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Download
                    </Button>
                  </Box>
                  <Box
                    component="img"
                    src={cert.imageUrl}
                    alt={cert.title}
                    sx={{
                      width: '100%',
                      borderRadius: 1,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowCertificates(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Mock data - in a real app, this would come from an API
  const achievements = {
    streak: {
      current: 7,
      longest: 14,
      total: 45,
    },
    courses: {
      taught: 5,
      learned: 8,
      inProgress: 2,
    },
    badges: [
      {
        id: 1,
        name: 'Quick Learner',
        description: 'Completed 5 courses in a month',
        icon: '🎓',
        achieved: true,
      },
      {
        id: 2,
        name: 'Master Teacher',
        description: 'Taught 10 different skills',
        icon: '👨‍🏫',
        achieved: false,
        progress: 50,
      },
      {
        id: 3,
        name: 'Consistent Learner',
        description: '30-day learning streak',
        icon: '🔥',
        achieved: false,
        progress: 75,
      },
    ],
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Achievements
        </Typography>

        {/* Stats Overview */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <LocalFireDepartmentIcon
                    sx={{ fontSize: 40, color: '#ff9800', mb: 1 }}
                  />
                  <Typography variant="h6">Learning Streak</Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {achievements.streak.current} days
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Longest streak: {achievements.streak.longest} days
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total active days: {achievements.streak.total}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <SchoolIcon sx={{ fontSize: 40, color: '#2196f3', mb: 1 }} />
                  <Typography variant="h6">Skills Learned</Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {achievements.courses.learned}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {achievements.courses.inProgress} courses in progress
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ 
                      mt: 2,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setShowCertificates(true)}
                  >
                    View Certificates
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ textAlign: 'center' }}>
                  <EmojiEventsIcon
                    sx={{ fontSize: 40, color: '#4caf50', mb: 1 }}
                  />
                  <Typography variant="h6">Skills Taught</Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {achievements.courses.taught}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Helping others grow
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Badges Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Badges & Achievements
        </Typography>
        <Grid container spacing={3}>
          {achievements.badges.map((badge) => (
            <Grid item xs={12} sm={6} md={4} key={badge.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Badge
                      color={badge.achieved ? 'success' : 'default'}
                      badgeContent={badge.achieved ? '✓' : null}
                    >
                      <Typography variant="h3" sx={{ mr: 2 }}>
                        {badge.icon}
                      </Typography>
                    </Badge>
                    <Box>
                      <Typography variant="h6">{badge.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {badge.description}
                      </Typography>
                    </Box>
                  </Box>
                  {!badge.achieved && badge.progress && (
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress
                        variant="determinate"
                        value={badge.progress}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
                        Progress: {badge.progress}%
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Certificates Dialog */}
        <CertificateDialog />
      </Container>
    </div>
  );
};

export default Achievements;