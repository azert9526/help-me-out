"use client";

import React from "react";
import {Box, Typography} from "@mui/material";

export default function AppFooter(){
    return (
        <Box 
            component="footer"
            sx={{
                bgcolor: "primary.main",
                color:"white",
                py:2,
                mt:"auto",
                textAlign: "center"
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} | HelpMeOut. All rights reserved.
            </Typography>
        </Box>
    );
}