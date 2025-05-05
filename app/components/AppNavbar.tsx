"use client";
import React from "react";
import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AppNavbar() { 
  const router = useRouter();
    
  
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "primary.main", padding: "0.5rem" }}
    >
      <Toolbar>
        {}
        <Box
          component="div"
          sx={{ display: "flex", alignItems: "center", paddingRight: "80vw",
            "&:hover": {
                cursor: "pointer",
              }
           }}
        >
          <img src="/icons/LogoDeschis.svg" alt="Logo" width="40" height="40" 
          onClick={() => {router.push('/')}}/>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Button
            onClick={() => {
              router.push("/auth/login");
            }}
            color="inherit"
            variant="outlined"
          >
            Log In
          </Button>
          <Button
            onClick={() => {
              router.push("/profile");
            }}
            color="inherit"
            variant="outlined"
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
