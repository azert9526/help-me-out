"use client";
import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { useSession } from "@/hooks/useSession";

export default function AppNavbar() {
  const router = useRouter();
  const { session, loading } = useSession();

  if (loading) return null;

  console.log(session)

  return (
    <div>
      <AppBar
        position="static"
        sx={{ padding: "0.5rem" }}
      >
        <Toolbar>
          <Box component="div"
            sx={{ display: "flex", alignItems: "center", flexGrow: 1, "&:hover": { cursor: "pointer", } }}
          >
            <img src="/icons/LogoDeschis.svg" alt="Logo" width="40" height="40"
              onClick={() => { router.push('/') }} />
          </Box>

          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            {!session?.userId && (
              <Button color="inherit" onClick={() => router.push("/auth/login")}>Log In</Button>
            )}
            {session?.userId != null && (
              <>
                <Button variant="contained" onClick={() => router.push("/profile")}>Profile</Button>
              </>
            )}

          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
