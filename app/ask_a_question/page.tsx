"use client"

import { useState } from "react";
import {
  Box,
  Paper,
} from "@mui/material";
import { textAlign } from "@mui/system";

import ActiveMembers from "../components/ask-a-question/ActiveMembers";
import QuestionForm from "../components/ask-a-question/QuestionForm";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

const members = [
  { username: "anapopescu", answers: 87, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
  { username: "ionionescu", answers: 74, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
  { username: "mariageorgescu", answers: 68, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
];

export default function MembersPage() {
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit=()=>{
        alert(`Subject ${subject}\nCategory: ${category}\nDescription: ${description}`);
    }

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
      <AppNavbar/>
      <Box 
        sx={{ 
          display: 'flex',
          justifyContent: 'center', 
          alignItems:"center",
          px:2
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            p: 4, 
            borderRadius:4,
            display: 'flex',
            justifyContent: 'row', 
            gap:4,
            maxWidth:1000,
            width:'100%',
            alignItems: 'flex-start',
          }}
        >
          <Box 
            sx={{
              display:"flex", 
              flexDirection:"row", 
              gap:30, 
              alignItems: 'center'
            }}
          >
            <ActiveMembers members={members}/>
            <QuestionForm 
              subject={subject}
              category={category}
              description={description}
              onSubjectChange={setSubject}
              onCategoryChange={setCategory}
              onDescriptionChange={setDescription}
              onSubmit={handleSubmit}
            />
          </Box>
        </Paper>
      </Box>
      <AppFooter/>
    </div>
  );
}
