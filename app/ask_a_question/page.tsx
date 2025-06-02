"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useSession } from "@/hooks/useSession";
import { Question } from "@/domain/question";
import { ObjectId } from "mongodb";

type LeaderboardUser = {
    name: string;
    score: number;
};
import { textAlign } from "@mui/system";

import ActiveMembers from "../components/ask-a-question/ActiveMembers";
import QuestionForm from "../components/ask-a-question/QuestionForm";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";

export default function AskAQuestionPage() {
    const [question, setQuestion] = useState("");
    const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
    const { session, loading } = useSession();


    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = () => {
        alert(`Subject ${subject}\nCategory: ${category}\nDescription: ${description}`);
    }


    useEffect(() => {
        fetch("/api/users/highest-rated")
            .then((res) => res.json())
            .then(setLeaderboard)
            .catch(console.error);
    }, []);

    if (loading) return null;
    const handleAsk = async () => {
        console.log(category);
        const newQuestion = {
            title: subject,    
            description: description,
            authorID: session?.userId,
            createdDate: new Date(),
            categories: [],
            rating: 0,
            likedBy: [],
            dislikedBy: []
        } as unknown as Omit<Question, "_id">;


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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                width: "100vw",
                backgroundColor: "#f5f5f5",
            }}
        >
            <AppNavbar></AppNavbar>
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
                            <QuestionForm
                                subject={subject}
                                category={category}
                                description={description}
                                onSubjectChange={setSubject}
                                onCategoryChange={setCategory}
                                onDescriptionChange={setDescription}
                                onSubmit={handleAsk}
                            />
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <AppFooter />
        </div>
    );
}
