"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AppNavbar from './AppNavbar';

const MainWindow = () => {
  const router = useRouter();

  const items = [
    { title: "Categories", description: "Explore the available categories", path: "/questions-categories" },
    { title: "Ask a Question", description: "Post your question here", path: "/ask_a_question"  },
    {
      title: "Answer a Question",
      description: "Help others by answering questions",
      path: "/",
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
    {/*  
      <AppBar
        position="static"
        sx={{ bgcolor: "primary.main", padding: "0.5rem" }}
      >
        <Toolbar>
          {}
          <Box component="div" sx={{ display: "flex", alignItems: "center", paddingRight: "80vw" }}>
            <img
              src="/icons/LogoDeschis.svg"
              alt="Logo"
              width="40"
              height="40"
            
            />
          </Box>
          <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
      */}
      <AppNavbar></AppNavbar>
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        {/* Header */}
        <Typography variant="h4" gutterBottom>
          How can we help you?
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "2rem",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TextField
            placeholder="Search..."
            variant="outlined"
            fullWidth
            sx={{
              bgcolor: "white",
              borderRadius: "5px",
              boxShadow: 1,
            }}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: "1rem", height: "56px" }}
          >
            Search
          </Button>
        </div>
{/*
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Categories",
              description: "Explore the available categories",
            },
            { title: "Ask a Question", description: "Post your question here" },
            {
              title: "Answer a Question",
              description: "Help others by answering questions",
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: "center", padding: "2vh" }}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>*/}
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
          {items.map((item, index) => (
            <Box key={index} width={{ xs: "100%", sm: "30%" }}>
              <Card sx={{ textAlign: "center", padding: "2vh", height: "13vh",     
              "&:hover": {
                cursor: "pointer",
                boxShadow: 4,
                transform: "scale(1.02)",
              }, }}
              onClick={() => router.push(item.path)}>
                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default MainWindow;
