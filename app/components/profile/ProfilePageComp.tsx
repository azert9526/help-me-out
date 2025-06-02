"use client";

import React from 'react';
import { Box, Typography, Avatar, Stack, Divider, Paper, Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { User } from '@/domain/user';
/*
type User = {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    bio:string,
    avatar: string, 
    birthdate: Dayjs | null,
    skills: string[];
};*/

export default function ProfilePageComp({ user }: { user: User }) {
  const router = useRouter();
  return (
    <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4, maxWidth: 1000, width: '100%', display: 'flex', gap: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
          {/*<Avatar
            src={user.}
            alt={`${user.username}`}
            sx={{ width: 200, height: 200 }}
          />*/}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
          <Typography variant="h3" fontWeight="bold">
            {user.name}
          </Typography>

          {/* <Typography variant="h5" fontWeight="bold">
            {user.firstname} {user.lastname}
          </Typography>
            */}
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold">Bio</Typography>
          {<Typography variant="body1" sx={{ mb: 2 }}>
            {user.bio}
          </Typography>
          }

          <Typography variant="h6" fontWeight="bold">Skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {user?.skills?.map((skill, i) => (
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

          <Button
            variant="contained"
            sx={{ fontSize: '0.75rem', padding: '6px 12px', alignSelf: 'flex-start', width: '120px', mt: 2 }}
            onClick={() => router.push('/edit_profile')}
          >
            Edit profile
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}