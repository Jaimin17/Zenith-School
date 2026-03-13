"use client";

import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useAuth } from "@/contexts/authContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const handleLogin = async (): Promise<void> => {
    setMsg("");
    if (!username?.trim() || !password) {
      setMsg("Please enter both username and password.");
      return;
    }

    setLoading(true);

    // Let the loading UI paint before starting the API call
    await new Promise((r) => setTimeout(r, 0));

    try {
      const success = await login(username.trim(), password);
      if (!success) {
        setMsg("Login failed. Check your username and password, or try again later.");
        setLoading(false); // only dismiss overlay on failure; on success the page unmounts
      }
      // On success: login() already called router.push(); let the component
      // unmount naturally so the overlay stays visible during navigation.
    } catch {
      setLoading(false);
    }
  };

  const isSuccess = msg.includes("successful");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          className="p-8 sm:p-10 rounded-2xl transition-shadow duration-300 hover:shadow-xl relative overflow-hidden"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
          }}
        >
          {/* Top loading bar - visible as soon as loading starts */}
          {loading && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                "& .MuiLinearProgress-bar": {
                  animationDuration: "1.5s",
                },
              }}
            />
          )}

          {/* Overlay when logging in */}
          {loading && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(255,255,255,0.92)",
                zIndex: 10,
                borderRadius: "inherit",
              }}
            >
              <CircularProgress size={48} thickness={4} sx={{ mb: 2 }} />
              <Typography variant="body1" fontWeight={600} color="text.secondary">
                Logging you in...
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Please wait
              </Typography>
            </Box>
          )}

          <Typography
            variant="h4"
            component="h1"
            align="center"
            className="font-extrabold text-gray-800 mb-8"
            style={{ color: "#1a202c" }}
          >
            Login
          </Typography>

          <Box
            component="form"
            className="flex flex-col gap-6"
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
              InputLabelProps={{ shrink: true }}
              className="bg-white rounded-lg"
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              InputLabelProps={{ shrink: true }}
              className="bg-white rounded-lg"
            />

            {msg && (
              <Typography
                align="center"
                className={`font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}
                variant="body2"
              >
                {msg}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 py-3 rounded-xl font-bold transition-all duration-200"
              style={{
                backgroundColor: loading ? "#90CAF9" : "#1976D2",
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;