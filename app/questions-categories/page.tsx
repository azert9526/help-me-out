"use client";
import AppNavbar from "../components/AppNavbar";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Question } from "@/domain/question";
import QuestionItem from "../components/QuestionItem";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [category, setCategory] = useState<string>("");

  //aici eventual sa fie incarcate categoriile din backend ??
  //de adaugat si iconite poate?
  const categories = [
    { title: "Programming" },
    { title: "Cooking" },
    { title: "Cleaning" },
    { title: "Mathematics" },
    { title: "Medicine" },
    { title: "Cars" },
  ];

  //hardcoded
  const testItemsListQuestions: Question<string>[] = [
    {
      _id: "1",
      title: "Q1",
      description: "desc1",
      createdDate: "06/05/2025",
      authorID: "1",
      answerCount: 3,
      category: "Cooking",
    },
    {
      _id: "2",
      title: "Q2",
      description: "desc2",
      createdDate: "03/05/2025",
      authorID: "2",
      answerCount: 15,
      category: "Cooking",
    },
    {
      _id: "3",
      title: "Q3",
      description: "desc3",
      createdDate: "01/05/2025",
      authorID: "3",
      answerCount: 13,
      category: "Medicine",
    },
    {
      _id: "4",
      title: "Q4",
      description: "desc4",
      createdDate: "12/05/2024",
      authorID: "4",
      answerCount: 10,
      category: "Programming",
    },
  ];

  const filteredItems = category
    ? testItemsListQuestions.filter((q) => q.category === category)
    : testItemsListQuestions;

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <AppNavbar></AppNavbar>
      <Box sx={{ paddingLeft:"1vw", paddingRight: "1vw", backgroundColor: "#6cb0f5" }}>
        <Box sx={{ paddingTop: "3vh", display: "flex", }}>
          <Typography
            sx={{ width: "15vw", paddingRight: "2vw", paddingLeft: "5vw" }}
          >
            Categories
          </Typography>
          <Typography sx={{ width: "85vw", paddingLeft: "10vw" }}>
            Questions
          </Typography>
        </Box>
        <Box sx={{ display: "flex", height: "80vh" }}>
          <List
            sx={{
              width: "15vw",
              overflowY: "auto",
              paddingRight: "2vw",
              paddingLeft: "1vw",
            }}
          >
            {categories.map((item, index) => (
              <ListItem
                onClick={() => {
                  setCategory(item.title);
                }}
                key={index}
                sx={{
                  paddingLeft: "3vw",
                  marginBottom: "1vh",
                  backgroundColor: "#037ffc",
                  paddingInlineStart: "4vw",
                  borderRadius: "3vw",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: 2,
                    transform: "scale(1.05)",
                  },
                  "&:focus": {
                    // Stiluri când elementul este selectat
                    backgroundColor: "#0465c7", // Culoare de fundal diferită
                    border: "2px black", // Border portocaliu
                    transform: "scale(1.1)", // Mărirea elementului
                  },
                  color: "#e8eaeb",
                }}
                tabIndex={0}
              >
                {item.title}
              </ListItem>
            ))}
          </List>
          <List
            sx={{
              width: "60vw",
              overflowY: "auto",
              paddingLeft: "10vw",
              paddingRight: "10vw",
            }}
          >
            {filteredItems.map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  paddingLeft: "3vw",
                  marginBottom: "1vh",
                  backgroundColor: "#037ffc",
                  borderRadius: "3vw",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: 2,
                    transform: "scale(1.02)",
                  },
                  color: "#e8eaeb",
                }}
              >
                <QuestionItem<string> question={item}></QuestionItem>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}
