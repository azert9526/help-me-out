'use client';

import React, { useState } from 'react';
import { Box, Typography, Avatar, Stack, Divider, Paper, Button} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const [user] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    bio: string;
    avatar: string;
    birthdate: Dayjs | null;
    skills: string[];
  }>({
    firstname: 'prenume',
    lastname: 'nume',
    email: 'email',
    bio: 'bio',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s',
    birthdate: dayjs('1992-05-10'),
    skills: ['medicine', 'programming', 'machine learning', 'public speaking'],
  });

  const handleEditClick = () => {
    router.push('/profile');
  };

  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, maxWidth: 1000, width: '100%', display: 'flex', gap: 4}}>
        <Button
          variant="contained"
          sx={{ position: 'absolute', top: 16, right: 16 }}
          onClick={handleEditClick}
        >
          Edit profile
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
          <Avatar
            src={user.avatar}
            alt={`${user.firstname} ${user.lastname}`}
            sx={{ width: 200, height: 200 }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh'}}>
          <Typography variant="h4" fontWeight="bold">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold">Bio</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user.bio}
          </Typography>

          <Typography variant="h6" fontWeight="bold">Birthday</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {user.birthdate ? user.birthdate.format('DD MMMM YYYY') : 'Nespecificată'}
          </Typography>

          <Typography variant="h6" fontWeight="bold">Skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {user.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  px: 2,
                  py: 0.5,
                  backgroundColor: '#e0e0e0',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                }}
              >
                {skill}
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
