"use client";

import React, { useState, ChangeEvent } from 'react';
import { Box, Container,  Paper, Button,} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

import AvatarUploader from './AvatarUploader';
import PersonalInfoForm from './PersonalInfoForm';
import SkillsSelector from './SkillsSelector';

const allSkills=['Programming','Cooking','Gardening']

export default function ProfileEditor() {
  const router = useRouter();

  const [user, setUser] = useState<{
    username:string,
    email: string;
    bio: string;
    avatar: string;
    skills: string[];
  }>({
    username: '',
    email: '',
    bio: '',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s',
    skills: [],
    });
    

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleDeleteImage=()=>{
    setUser((prev)=>({...prev,avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s'}));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setUser((prev) => ({ ...prev, birthdate: date }));
  };

  const handleSkillsChange = (skills:string[])=>{
    setUser((prev)=>({...prev, skills}));
  }

const handleSave_ = async () => {
  try {
    const res = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // datele pe care le vrei actualizate, extrase din user state
        username: user.username,
        email: user.email,
        bio: user.bio,
        skills: user.skills,
        // dacă ai birthdate, transform-o într-un string ISO (sau alt format)
        avatar: user.avatar,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to update user');
    }

    router.push('/profile');
  } catch (error) {
    alert(`Error updating profile: ${(error as Error).message}`);
  }
};



  return (
    <Container maxWidth="sm" sx={{ mt: 4 , mb:4}}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        { <AvatarUploader 
            avatar={user.avatar}
            onUpload={handleImageUpload}
            onDelete={handleDeleteImage}
        /> }
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            { <PersonalInfoForm
                username={user.username}
                email={user.email}
                bio={user.bio}
                onChange={handleChange}
            /> }
            { <SkillsSelector
                selectedSkills={user.skills}
                allSkills={allSkills}
                onChange={handleSkillsChange}
            /> }
        </Box>
        <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleSave_}>
                Save
            </Button>
        </Box>
      </Paper>
    </Container>
  );
};
