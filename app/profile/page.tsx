'use client'

import React, { useState } from 'react';
import {Box, Button} from '@mui/material';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import ProfilePageComp from '../components/profile/ProfilePageComp';
import AppNavbar from '../components/AppNavbar';
import AppFooter from '../components/AppFooter';

export default function ProfilePage(){
  const router = useRouter();

  const [user] = useState({
    firstname: 'prenume',
    lastname: 'nume',
    username: 'username',
    email: 'email',
    bio: 'bio',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s',
    birthdate: dayjs('1992-05-10'),
    skills: ['medicine', 'programming', 'machine learning', 'public speaking'],
  });

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
    <AppNavbar/>
    <Box sx={{p:4, display:'flex', justifyContent:'center'}}>
      <Box sx={{position:'relative', width:'100%', maxWidth: 1000}}>
        <ProfilePageComp user={user}/>
      </Box>
    </Box>
    <AppFooter/>
    </div>
  )
}
