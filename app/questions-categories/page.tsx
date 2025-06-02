"use client";
import AppNavbar from "../components/AppNavbar";
import { Box, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Question } from "@/domain/question";
import QuestionItem from "../components/QuestionItem";
import { useState, useEffect } from "react";
import AppFooter from "../components/AppFooter";
import { Category } from "@/domain/category";

export default function CategoriesPage() {
  const [category, setCategory] = useState<string>("");


  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);



  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        const data = await res.json();
        setQuestions(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);

      }
      catch (error) {
        console.error("Error fetching categories:", error);

      }
      finally {
        setLoading(false);
      }
    }


    fetchQuestions();
    fetchCategories();
  }, []);


  const selectedCategory = categories.find(c => c.name === category);

  const filteredItems = category && selectedCategory
    ? questions.filter(q =>
      q.categories.some(catId => catId.toString() === selectedCategory._id.toString())
    )
    : questions;

  console.log(categories);
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100vw'
    }}>
      <AppNavbar></AppNavbar>
      <Box sx={{
        flexGrow: 1,
        paddingLeft: "1vw",
        paddingRight: "1vw",
        backgroundColor: "#6cb0f5",
        display: 'flex',
        flexDirection: 'column'
      }}
      >
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
                  setCategory(item.name);
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
                    backgroundColor: "#0465c7",
                    border: "2px black",
                    transform: "scale(1.1)",
                  },
                  color: "#e8eaeb",
                }}
                tabIndex={0}
              >
                {item.name}
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
      <AppFooter />
    </div>
  );
}
