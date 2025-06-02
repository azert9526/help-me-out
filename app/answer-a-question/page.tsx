'use client'
import { Question } from "@/domain/question";
import QuestionItem from "../components/QuestionItem";
import { ListItem, List, Button, Stack, CircularProgress } from "@mui/material";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";
import { useState, useEffect } from "react";

export default function AnswerAQuestion() {
    const itemsPerPage = 2; 
    const [currentPage, setCurrentPage] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);


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

        fetchQuestions();
    }, []);


    const paginatedQuestions = questions.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage
    );

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100vw'
        }}>
            <AppNavbar />

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '5vh' }}>
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <List>
                        {paginatedQuestions.map((item, index) => (
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
                                <QuestionItem<string> question={item} />
                            </ListItem>
                        ))}
                    </List>
                    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                        <Button
                            variant="outlined"
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={(currentPage + 1) * itemsPerPage >= questions.length}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >
                            Next
                        </Button>
                    </Stack>
                </>
            )}
            <AppFooter />
        </div>
    );
}
