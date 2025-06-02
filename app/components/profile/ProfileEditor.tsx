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
    firstname: string;
    lastname: string;
    username:string,
    email: string;
    bio: string;
    avatar: string;
    birthdate: Dayjs | null; 
    skills: string[];
  }>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    bio: '',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s',
    birthdate: null, 
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

  const handleSave_ =()=>{
    alert("Button pressed!");
    router.push('/profile');
  }

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
                firstname={user.firstname}
                lastname={user.lastname}
                username={user.username}
                email={user.email}
                bio={user.bio}
                onChange={handleChange}
            /> }
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Birth date"
                    value={user.birthdate}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: { fullWidth: true },
                    }}
                />
            </LocalizationProvider>
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
