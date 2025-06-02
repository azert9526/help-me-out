"use client"

import React from 'react';
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
  Typography,
} from "@mui/material";
import { textAlign } from "@mui/system";

interface Member {
  username: string;
  answers: number;
  avatar: string;
}

interface Props {
  members: Member[];
}

export default function ActiveMembers({members}: Props){
    return (
        <Box 
          sx={{
            display:"flex", 
            flexDirection:"column", 
            gap:2, 
            alignItems:"center", 
            justifyContent:"center", 
            height:'100vh',
          }}
        >
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                ml: 2,
                textAlign: 'center'
              }}
            >
                Most active members
            </Typography>

            <Card sx={{mb:4, ml:10}}>
                <CardContent sx={{maxHeight:300, overflowY:'auto'}}>
                    <List>
                        {members.map((member,index)=>(
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar src={member.avatar}/>
                                </ListItemAvatar>
                                
                                <ListItemText 
                                    primary={member.username}
                                    secondary={`${member.answers} questions answered`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};