'use client';

import React from 'react';
import { TextField } from '@mui/material';

interface Props {
  username: string;
  email: string;
  bio: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PersonalInfoForm({ username, email, bio, onChange }: Props) {
  return (
    <>
      <TextField
        label="Username"
        name="username"
        value={username}
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
