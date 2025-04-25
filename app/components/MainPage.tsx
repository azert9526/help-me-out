import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, Card, CardContent, Grid, Box } from '@mui/material';

const MainPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: 'var(--lapis-lazuli)', padding: '0.5rem' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/icons/LogoDeschis.svg" alt="Logo" width="40" height="40" />
            <Typography variant="h6" sx={{ marginLeft: '1rem', color: 'var(--platinum)' }}>
              HelpMeOut
            </Typography>
          </Box>
          {/* Log In Button */}
          <Button
            variant="outlined"
            sx={{
              color: 'var(--platinum)',
              borderColor: 'var(--platinum)',
              '&:hover': { backgroundColor: 'var(--cerulean)', borderColor: 'var(--cerulean)' },
            }}
          >
            Log In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <div style={{ display: 'flex', flexGrow: 1, padding: '2rem', gap: '2rem' }}>
        {/* Posts Section */}
        <div style={{ flex: 3 }}>
          <Typography variant="h5" gutterBottom>
            How can we help you?
          </Typography>
          <Grid container spacing={3}>
            {[
              { title: 'Categories', description: 'Explore the available categories' },
              { title: 'Ask a Question', description: 'Post your question here' },
              { title: 'Answer a Question', description: 'Help others by answering questions' },
            ].map((post, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ padding: '1rem', backgroundColor: 'var(--sky-blue)', color: 'var(--indigo-dye)' }}>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2">{post.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default MainPage;