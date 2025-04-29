'use client';

import LoginForm from "@/app/components/auth/LoginForm";
import { Container } from "@mui/material";

export default function LogInPage() {
  return (
    <Container sx=
    {{width: '70vw', 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center'}}>
      <LoginForm />
    </Container>
  );
}