'use client'

import Image from "next/image";
import LoginForm from "./components/auth/LoginForm";
import { Container } from "@mui/material";
import { useState, useEffect } from 'react'


export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <Container sx={{width: '70vw', display: 'flex', height: '100vh', bgcolor :'blue', alignItems: 'center', justifyContent: 'center'}}>
      <LoginForm></LoginForm>
    </Container>
  );
}
