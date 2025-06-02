"use client";

import { useState } from "react";
import { TextField, Button, Stack, Typography, Box } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = email;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    if (res.status >= 200 && res.status <= 299) {
      router.push("/main-window");
    } else {
      setErrMessage(data.message || "Eroare necunoscuta");
    }
  };


  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setErrMessage("Autentificarea Google nu a returnat un token valid.");
      return;
    }

    try {
      const res = await fetch("/api/auth/google/login", { // Aici vei folosi un endpoint nou pentru Google Login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: credentialResponse.credential, // Trimitem token-ul ID de la Google
        }),
        
      });
/*
      console.log(res);
      const data = await res.json();
      console.log(data);

      if (res.status >= 200 && res.status <= 299) {
        router.push("/main-window"); // Redirecționează la fel ca la login-ul normal
      } else {
        setErrMessage(data.message || "Eroare la autentificarea Google.");
      }*/
    } catch (error) {
      console.error("Eroare la trimiterea token-ului Google la backend:", error);
      setErrMessage("A apărut o problemă la conectare. Încearcă din nou.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <Stack
        sx={{
          borderRadius: "10px",
          bgcolor: "white",
          paddingLeft: "3vw",
          paddingRight: "3vw",
          paddingBottom: "3vh",
          paddingTop: "3vh",
        }}
        spacing={2}
      >

        <Typography variant="h6" align={"center"}>
          Login
        </Typography>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log('Login Failed');
          }}
        />

        <Box
          sx={{
            bgcolor: "black",
            borderSpacing: "5vh",
            height: "0.25vh",
            width: "100%",
          }}
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="small"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderRadius: "30vw",
            textTransform: "none",
          }}
        >
          Login
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography>Don't have an account?</Typography>
          <Link href="/auth/signup">
            <Typography>Sign up here</Typography>
          </Link>
        </Box>
        {errMessage && (
          <Typography color="error" align="center">
            {errMessage}
          </Typography>
        )}

      </Stack>
    </form>
  );
}
