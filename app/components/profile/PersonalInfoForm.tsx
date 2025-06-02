'use client';

import React from 'react';
import { TextField } from '@mui/material';

interface Props{
    firstname: string,
    lastname: string,
    email: string,
    bio: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>void;
};

export default function PersonalInfoForm({firstname, lastname, email, bio, onChange}: Props){
    return (
        <>
            <TextField
                label="First name"
                name="firstname"
                value={firstname}
                onChange={onChange}
                fullWidth
            />
            <TextField
                label="Last name"
                name="lastname"
                value={lastname}
                onChange={onChange}
                fullWidth
            />
            <TextField
                label="Email"
                name="email"
                value={email}
                onChange={onChange}
                fullWidth
            />
            <TextField
                label="Description"
                name="bio"
                value={bio}
                onChange={onChange}
                fullWidth
                multiline
                rows={3}
            />
        </>
    );
}
