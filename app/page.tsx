'use client'

import Image from "next/image";
import LoginForm from "./components/auth/LoginForm";
import { Container } from "@mui/material";
import { useState, useEffect } from 'react'
import MainPage  from '@/app/components/MainPage'
import ProfilePage from '@/app/profile/page'
//<LoginForm></LoginForm>

/*
    <Container sx={{width: '70vw', display: 'flex', height: '100vh', bgcolor :'blue', alignItems: 'center', justifyContent: 'center'}}>
      <LoginForm></LoginForm>
    </Container>

*/
export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      <ProfilePage></ProfilePage>
    </div>
  );
}
