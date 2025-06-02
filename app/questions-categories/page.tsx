"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";
import AppNavbar from "../components/AppNavbar";
import QuestionItem from "../components/QuestionItem";
import { Question } from "@/domain/question";
import { Category } from "@/domain/category";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const router = useRouter();

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadQuestions = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const res = await fetch(`/api/questions/recent?skip=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`);
    const newQuestions: Question[] = await res.json();

    if (newQuestions.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setQuestions((prev) => [...prev, ...newQuestions]);
    setPage((prev) => prev + 1);
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);

    loadQuestions();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadQuestions();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadQuestions, hasMore, loading]);

  const filteredItems = category
    ? questions.filter((q) =>  q.categories.includes(category._id))
    : questions;


  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <AppNavbar />
      <Box sx={{ paddingLeft: "1vw", paddingRight: "1vw", backgroundColor: "#6cb0f5" }}>
        <Box sx={{ paddingTop: "3vh", display: "flex" }}>
          <Typography sx={{ width: "15vw", paddingRight: "2vw", paddingLeft: "5vw" }}>
            Categories
          </Typography>
          <Typography sx={{ width: "85vw", paddingLeft: "10vw" }}>
            Questions
          </Typography>
        </Box>
        <Box sx={{ display: "flex", height: "80vh" }}>
          {/* Categories List */}
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
                onClick={() => category == item ? setCategory(null) : setCategory(item)}
                key={index}
                sx={{
                  paddingLeft: "3vw",
                  marginBottom: "1vh",
                  backgroundColor: category == item ? "#0465c7" : "#037ffc",
                  paddingInlineStart: "4vw",
                  borderRadius: "3vw",
                  transition: "all 0.2s ease-in-out",
                  border: category == item ? "2px black" : "0px", // Border portocaliu
                  "&:hover": {
                    cursor: "pointer",
                    boxShadow: 2,
                    transform: "scale(1.05)",
                  },
                  color: "#e8eaeb",
                }}
                tabIndex={0}
              >
                {item.name}
              </ListItem>
            ))}
          </List>

          {/* Questions List */}
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
                onClick={() => router.push(`/questions/${item._id.toString()}`)} 
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
                <QuestionItem<string> question={item} />
              </ListItem>
            ))}
            {loading && (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
            <div ref={observerRef} style={{ height: "1px" }}></div>
          </List>
        </Box>
      </Box>
    </div>
  );
}
