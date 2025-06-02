'use client'

import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProfilePageComp from '../components/profile/ProfilePageComp';
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';
import { User } from '@/domain/user';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('User not logged in');
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('User not logged in or error fetching:', error);
        router.push('/auth/login'); // redirect dacă nu e logat
      }
    }

    fetchUser();
  }, [router]);

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading user data...
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <AppNavbar />
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: 1000 }}>
          <ProfilePageComp user={user} />
        </Box>
      </Box>
      <AppFooter />
    </div>
  );
}
