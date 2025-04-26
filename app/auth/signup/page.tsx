'use client';

import SignUpForm from "@/app/components/auth/SignUpForm";
import { Container } from "@mui/material";

export default function SignUpPage() {
  return (
    <Container sx=
    {{width: '70vw', 
      display: 'flex', 
      height: '100vh', 
      bgcolor :'blue', 
      alignItems: 'center',
      justifyContent: 'center'}}>
      <SignUpForm />
    </Container>
  );
}