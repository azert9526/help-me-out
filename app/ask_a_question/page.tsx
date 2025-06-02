"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Paper,
} from "@mui/material";
import { useSession } from "@/hooks/useSession";
import { Question } from "@/domain/question";

type LeaderboardUser = {
  name: string;
  score: number;
};
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

export default function AskAQuestionPage() {
    const [question, setQuestion] = useState("");
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const { session, loading } = useSession();

    useEffect(() => {
        fetch("/api/users/highest-rated")
        .then((res) => res.json())
        .then(setLeaderboard)
        .catch(console.error);
    }, []);

    if(loading) return null;
    const handleAsk = async () => {
        if (!question.trim()) return;

        const newQuestion = {
            title: question,
            description: "",
            authorID: session?.userId, 
            createdDate:  new Date(),
            categories: [],
            rating: 0,
            likedBy: [],
            dislikedBy: []
        } as Omit<Question, "_id">;

        const res = await fetch("/api/questions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuestion),
        });

        const result = await res.json();
        if (res.ok) {
            alert("Question submitted!");
            setQuestion("");
        } else {
            alert(`Error: ${result.message || "Could not submit question"}`);
        }
    };

    console.log(leaderboard)
    return (
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
        <Paper
            elevation={3}
            sx={{
            p: 4,
            borderRadius: 4,
            maxWidth: 1000,
            width: "100%",
            height: "100vh",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 30 }}>
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                }}
            >
                <Typography variant="h4" sx={{ mb: 2 }}>
                Most active members
                </Typography>

                <Card sx={{ mb: 4 }}>
                <CardContent sx={{ maxHeight: 300, overflowY: "auto" }}>
                    <List>
                    {leaderboard.map((user, index) => (
                        <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                        </ListItemAvatar>

                        <ListItemText
                            primary={user.name}
                            secondary={`${user.score} points`}
                        />
                        </ListItem>
                    ))}
                    </List>
                </CardContent>
                </Card>
            </Box>

            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                justifyContent: "center",
                }}
            >
                <Typography variant="h5">Ask a question:</Typography>

                <TextField
                    fullWidth
                    label="Enter your question here..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAsk} fullWidth>
                Ask
                </Button>

                <Typography variant="body2" color="text.secondary">
                Explain your request in a few words!
                </Typography>
            </Box>
            </Box>
        </Paper>
        </Box>
    );
}
