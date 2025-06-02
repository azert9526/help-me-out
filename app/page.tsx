'use client'

import Image from "next/image";
import LoginForm from "./components/auth/LoginForm";
import { Container } from "@mui/material";
import { useState, useEffect } from 'react'
import ProfilePage from '@/app/profile/page'
import MainWindow from "./components/MainWindow";
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
    </div>
  );
}
