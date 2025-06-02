"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useParams } from "next/navigation";
import AppNavbar from "@/app/components/AppNavbar";
import { useSession } from "@/hooks/useSession";

const PAGE_SIZE = 10;

export default function QuestionPage() {
  const { session, loading : sessionLoading } = useSession();
  const { _id } = useParams();
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [answerText, setAnswerText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "date">("rating");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const loadAnswers = useCallback(async () => {
    if (!_id || loading || !hasMore) return;
    setLoading(true);

    const res = await fetch(
      `/api/questions/${_id}/answers?sort=${sortBy}&skip=${page * PAGE_SIZE}&limit=${PAGE_SIZE}`
    );
    const newAnswers = await res.json();
    if (newAnswers.length < PAGE_SIZE) setHasMore(false);

    setAnswers((prev) => [...prev, ...newAnswers]);
    setPage((p) => p + 1);
    setLoading(false);
  }, [_id, page, sortBy, loading, hasMore]);

  useEffect(() => {
    if (!_id) return;
    fetch(`/api/questions/${_id}`)
      .then((res) => res.json())
      .then(setQuestion)
      .catch(console.error);

    loadAnswers();
  }, [_id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadAnswers();
        }
      },
      { threshold: 1 }
    );
    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadAnswers]);

  const handlePostAnswer = async () => {
    if (!answerText.trim()) return;
    await fetch(`/api/questions/${_id}/answers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: answerText,
        authorID: session
      }),
    });
    setAnswerText("");
    setAnswers([]);
    setPage(0);
    setHasMore(true);
    loadAnswers();
  };


  if (sessionLoading) return null;
  
  return (
    <>
    <AppNavbar></AppNavbar>
    <Box sx={{ p: 4 }}>
      {question && (
        <>
          <Typography variant="h4">{question.title}</Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {question.description}
          </Typography>
        </>
      )}

      <TextField
        label="Your Answer"
        value={answerText}
        onChange={(e) => setAnswerText(e.target.value)}
        multiline
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Video URL (optional)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handlePostAnswer}>
        Post Answer
      </Button>

      <TextField
        select
        value={sortBy}
        onChange={(e) => {
          setAnswers([]);
          setPage(0);
          setHasMore(true);
          setSortBy(e.target.value as "date" | "rating");
        }}
        sx={{ my: 2 }}
        label="Sort by"
      >
        <MenuItem value="date">Most Recent</MenuItem>
        <MenuItem value="rating">Highest Rating</MenuItem>
      </TextField>

      <List>
        {answers.map((answer, idx) => (
          <ListItem key={idx} sx={{ mb: 2, backgroundColor: "#f1f1f1", borderRadius: 2 }}>
            <Box>
              <Typography>{answer.text}</Typography>
              <Typography variant="caption">
                {new Date(answer.createdDate).toLocaleString()} • Rating: {answer.rating}
              </Typography>
            </Box>
          </ListItem>
        ))}
        {loading && <CircularProgress />}
        <div ref={observerRef} style={{ height: "1px" }}></div>
      </List>
    </Box>
    </>
  );
}
