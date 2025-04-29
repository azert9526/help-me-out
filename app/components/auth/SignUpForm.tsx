'use client'
import { Stack, Typography, Button, Box, TextField } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpForm()
{
     const router = useRouter();
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [confirmedPassword, setConfirmedPassword] = useState('');
     const [name, setName] = useState('');
        
    const handleSubmit = async (e: React.FormEvent) => {

        if(password !== confirmedPassword){
          alert("parolele nu corespund!");
          e.preventDefault();
          return;

        }
        e.preventDefault();
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({name, email, password}),
        });
        const data = await res.json();

        if(res.status >= 200 && res.status <= 299){
            router.push("/main-window");
        }
        else{
          console.log("Ceva nu a mers bine la inregistrare!");
        }

    }
    return( <form onSubmit={handleSubmit}>
        <Stack sx={{borderRadius: '10px', bgcolor: 'white', paddingLeft: '3vw', paddingRight: '3vw', paddingBottom: '3vh', paddingTop: '3vh'}} spacing={2}>
            <Typography variant="h6" align={'center'}>Sign up</Typography>
            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                size="small"
            />
            <TextField
                label="Username"
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                size="small"
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                size="small"
                onChange={(e)=> setPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                type="password"
                value={confirmedPassword}
                size="small"
                onChange={(e)=> setConfirmedPassword(e.target.value)}
            />
            <Button type="submit"
            variant="contained"
            sx={{
              borderRadius: '30vw',
              textTransform: 'none'

            }}>
            Sign up 
            </Button>
            <Box sx={{display:'flex', alignItems: 'center'}}>
                <Box sx={{ bgcolor: 'black', borderSpacing: '5vh' , height: '0.25vh', width: '43%' }} />
                <Typography sx={{padding: '0.5vw', fontSize: '14px'}}>Or</Typography>
                <Box sx={{ bgcolor: 'black', borderSpacing: '5vh' , height: '0.25vh', width: '43%' }} />

            </Box>
            <Button sx=
            {{bgcolor: 'black', 
              borderRadius: '30vw',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              pr: '2vw'

            }} type="submit" variant="contained">
              <Box 
                component="img"
                src="/icons/GoogleLogo.svg"
                alt="Google"
                sx={{ width: '20px', height: '20px', paddingRight: '3vw' }}
              />  
               Sign up with Google
            </Button>
            <Button sx={{bgcolor: 'black', 
              borderRadius: '30vw',
              textTransform: 'none',
              display: 'flex',
              justifyContent: 'flex-start',
              fontWeight: 'bold',
              pr: '2vw'
            }} 
             type="submit" 
             variant="contained">
                <Box 
                component="img"
                src="/icons/FacebookLogo.svg"
                alt="Facebook"
                sx={{ width: '20px', height: '20px', paddingRight: '3vw' }}
              />
              Sign up with Facebook
            </Button>
            <Box sx={{ bgcolor: 'black', borderSpacing: '5vh' , height: '0.2vh', width: '100%' }} />
            <Box sx=
                {{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px',                      
                  }}>
                <Typography>Already have an account?</Typography>
                <Link href="/auth/login">
                  <Typography>Log in here</Typography>
                </Link>
            </Box>

        </Stack>
    </form>);
}