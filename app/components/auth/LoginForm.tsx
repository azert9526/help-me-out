'use client'

import {useState} from 'react';
import {TextField, Button, Stack, Typography, Box} from '@mui/material';
import dynamic from 'next/dynamic';
import Link from 'next/link';




export default function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        ///backend calls
       // console.log(email);
       // console.log(password);
    }

    return(
       <form onSubmit={handleSubmit}>
            <Stack sx={{borderRadius: '10px', bgcolor: 'white', paddingLeft: '3vw', paddingRight: '3vw', paddingBottom: '3vh', paddingTop: '3vh'}} spacing={2}>
                <Typography variant="h6" align={'center'}>Login</Typography>
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
                   Continue with Google
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
                  Continue with Facebook
                </Button>
                <Box sx={{ bgcolor: 'black', borderSpacing: '5vh' , height: '0.25vh', width: '100%' }} />
                <TextField
                sx={{
                    backgroundColor: '#f0f0f0', 
                    '& .MuiInputBase-root': {
                      backgroundColor: '#ffffff', 
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#1976d2',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1565c0', 
                      },
                    },
                  }}
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    size="small"
                />
                <TextField
                    label="Password"
                    type="password"
                    
                    value={password}
                    size="small"
                    sx={{
                        backgroundColor: '#f0f0f0', 
                        '& .MuiInputBase-root': {
                          backgroundColor: '#ffffff', 
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#1976d2', 
                          },
                          '&:hover fieldset': {
                            borderColor: '#1565c0',
                          },
                        },
                      }}
                    onChange={(e)=> setPassword(e.target.value)}
                />
                <Button type="submit"
                variant="contained"
                sx={{
                  borderRadius: '30vw',
                  textTransform: 'none'

                }}>
                Login 
                </Button>
                <Box sx=
                    {{
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',                      
                      }}>
                    <Typography>Don't have an account?</Typography>
                    <Link href="/auth/signup">
                      <Typography>Sign up here</Typography>
                    </Link>
                </Box>

            </Stack>
        </form>
    );
}