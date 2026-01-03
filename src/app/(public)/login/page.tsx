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
} from "@mui/material";
import { useAuth } from "@/contexts/authContext";

const useMockRouter = () => ({
  push: (path: string) => {
    console.log(`Navigation requested to: ${path}. (Mocked navigation)`);
  }
});

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const router = useMockRouter();

  const handleLogin = async (): Promise<void> => {
    setMsg("");
    setLoading(true);

    if (!username || !password) {
      setMsg("Please enter both username and password.");
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    await login(username, password);

    setLoading(false);
  };

  const isSuccess = msg.includes("successful");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Container maxWidth="xs">
        <Paper
          elevation={12}
          className="p-8 sm:p-10 rounded-2xl transition-shadow duration-300 hover:shadow-xl"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            className="font-extrabold text-gray-800 mb-8"
            style={{ color: '#1a202c' }}
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
                backgroundColor: loading ? '#90CAF9' : '#1976D2',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Log In'
              )}
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;