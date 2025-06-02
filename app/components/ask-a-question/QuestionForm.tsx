"use client"


import React from 'react';
import {
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { textAlign } from "@mui/system";
import { useEffect, useState } from 'react';
import { Category } from '@/domain/category';

interface Props {
    subject: string;
    description: string;
    category: string;
    onSubjectChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onSubmit: () => void;
}

const categories = ['Technology', 'Cooking', 'Gardening', 'Health', 'Other']



export default function QuestionForm({ subject, description, category, onSubjectChange, onCategoryChange, onDescriptionChange, onSubmit }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                if (!res.ok) throw new Error("Failed to fetch categories");
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]); // fallback empty list
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", padding: 3 }}>
                <CircularProgress />
            </Box>
        );
    }
    return (
        <Box
            sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 3,
                width: "100%",
                maxWidth: 400,
                boxShadow: 1,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h5">Ask a question:</Typography>

                <TextField
                    fullWidth
                    label="Subject"
                    value={subject}
                    onChange={(e) => onSubjectChange(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Category"
                    select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    {categories.length === 0 ? (
                        <MenuItem disabled>No categories available</MenuItem>
                    ) : (
                        categories.map((cat, idx) => (
                            <MenuItem key={cat._id.toString()} value={cat._id.toString()}>                {cat.name}
                            </MenuItem>
                        ))
                    )}
                </TextField>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) => onDescriptionChange(e.target.value)}
                />
                <Button variant="contained" onClick={onSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};