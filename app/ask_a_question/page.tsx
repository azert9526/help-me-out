"use client"

import { useState } from "react";
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
import { textAlign } from "@mui/system";

const members = [
  { name: "Ana Popescu", answers: 87, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
  { name: "Ion Ionescu", answers: 74, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
  { name: "Maria Georgescu", answers: 68, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s" },
];

export default function MembersPage() {
  const [question, setQuestion] = useState("");

  const handleSearch = () => {
    alert('Button pressed');
  };

  return (
    <Box sx={{ p: 4, display: 'flex',justifyContent: 'center'}}>
        <Paper elevation={3} sx={{p: 4, 
            borderRadius:4,
            maxWidth:1000,
            width:'100%',
            height:'100vh'
         }}>
            <Box sx={{display:"flex", flexDirection:"row", gap:30}}>
                <Box sx={{display:"flex", flexDirection:"column", gap:2, alignItems:"center", justifyContent:"center", height:'100vh'
                }}>
                    <Typography variant="h4" sx={{mb: 2}}>
                        Most active members
                    </Typography>

                    <Card sx={{mb:4}}>
                    <CardContent sx={{maxHeight:300, overflowY:'auto'}}>
                        <List>
                            {members.map((member,index)=>(
                                <ListItem key={index}>
                                    <ListItemAvatar>
                                        <Avatar src={member.avatar}/>
                                    </ListItemAvatar>
                                
                                    <ListItemText 
                                        primary={member.name}
                                        secondary={`${member.answers} questions answered`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
                </Box>
                <Box sx={{display:"flex", flexDirection:"column",gap:2, justifyContent:"center"}}>
                    <Typography variant="h5">
                        Ask a question:
                    </Typography>

                    <TextField 
                        fullWidth
                        label="Enter your question here..."
                        value={question}
                        onChange={(e)=>setQuestion(e.target.value)}
                        sx={{mb:2}}
                    />
                    <Button 
                        variant="contained"
                        onClick={handleSearch}
                        fullWidth
                    >
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
