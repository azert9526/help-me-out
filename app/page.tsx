'use client'

import Image from "next/image";
import LoginForm from "./components/auth/LoginForm";
import { Container } from "@mui/material";
import { useState, useEffect } from 'react'
import ProfilePage from '@/app/profile/page'
import MainWindow from "./components/MainWindow";
//<LoginForm></LoginForm>

/*
    <Container sx={{width: '70vw', display: 'flex', height: '100vh', bgcolor :'blue', alignItems: 'center', justifyContent: 'center'}}>
      <LoginForm></LoginForm>
    </Container>

*/
export default function Home() {
  const [isClient, setIsClient] = useState(false)

  const [data, setData] = useState<any>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/test-mongodb");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const text = await res.text();
        try {
          const json = JSON.parse(text);
          setData(json);
        } catch (error) {
          console.error('Eroare la parsarea JSON:', error);
        }
      } catch (error) {
        console.error("Eroare la cererea fetch:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div>
      <MainWindow></MainWindow>
      <div style={{ marginTop: "20px", padding: "10px", background: "#f0f0f0" }}>
        {data === null ? (
          <p>🔄 Se testează conexiunea la MongoDB...</p>
        ) : data.success ? (
          <p>✅ Conectat la DB. Colecții: {data.collections.join(", ")}</p>
        ) : (
          <p>❌ Eroare la conectare: {JSON.stringify(data.error)}</p>
        )}
      </div>
    </div>
  );
}
