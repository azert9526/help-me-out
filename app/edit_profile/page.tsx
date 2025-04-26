"use client";

import React, { useState, ChangeEvent } from 'react';
import { Avatar, Box, Container, Typography, Paper, TextField, Button, Select, FormControl, SelectChangeEvent, InputLabel, MenuItem, Checkbox, ListItemText, OutlinedInput} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const allSkills=['Programming','Cooking','Gardening']

const ProfilePage = () => {
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    bio: string;
    avatar: string;
    birthdate: Dayjs | null;
    skills: string[];
  }>({
    firstname: '',
    lastname:'',
    email: '',
    bio: '',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s',
    birthdate: dayjs(),
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

  const handleSave = () => {
    //save in db
    console.log('Profile saved!', {
      ...user,
      birthdate: user.birthdate?.format('YYYY-MM-DD'),
    });
    alert('Profile saved!');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Avatar
          src={user.avatar}
          alt={user.firstname+user.lastname}
          sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
        />
        <Button variant="outlined" component="label" sx={{ mb: 2 }}>
          Change pic
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
        <Button variant='outlined' component="label" onClick={handleDeleteImage} sx={{mb:2}}>
          Delete pic
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="First name"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Last name"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="Description"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
            />
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
          <FormControl fullWidth>
            <InputLabel id="skills-label">Skills</InputLabel>
            <Select labelId="skills-label" multiple value={user.skills} onChange={(e)=>{
                const {value}=e.target;
                setUser((prev)=>({
                    ...prev,
                    skills: typeof value==='string' ? value.split(','):value,
                    }));
                }}
                input={<OutlinedInput label="Skills"/>}
                renderValue={(selected)=>selected.join(', ')}
            >
                {allSkills.map((skill)=>(
                    <MenuItem key={skill} value={skill}>
                        <Checkbox checked={user.skills.includes(skill)}/>
                        <ListItemText primary={skill}/>
                    </MenuItem>
                 ))}
            </Select>
          </FormControl>
        </Box>
        <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;