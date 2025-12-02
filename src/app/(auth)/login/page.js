"use client";

import React, { useState } from "react";
// Import necessary MUI components
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
} from "@mui/material";

// Mocking the router functionality for demonstration purposes in a single-file environment
const useMockRouter = () => ({
    push: (path) => {
        console.log(`Navigation requested to: ${path}. (Mocked navigation)`);
        // In a real application, you would use next/navigation's useRouter here.
    }
});

const App = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // Mock Router
    const router = useMockRouter();

    const handleLogin = async () => {
        setMsg(""); // Clear previous messages
        setLoading(true);

        if (!username || !password) {
            setMsg("Please enter both username and password.");
            setLoading(false);
            return;
        }

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // --- Mocked Login Logic ---
        const MOCK_USERNAME = "user123";
        const MOCK_PASSWORD = "password123";

        if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
            setMsg("Login successful! Redirecting...");
            router.push("/dashboard");
        } else {
            setMsg("Invalid username or password.");
        }

        setLoading(false);
    };

    const isSuccess = msg.includes("successful");

    // Using Tailwind classes for the main layout container and responsiveness (max-width, centering)
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Container maxWidth="xs">
                {/* Paper component provides elevation and a clean card look */}
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

                    <Box component="form" className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

                        {/* Username Field (FullWidth MUI TextField) */}
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

                        {/* Password Field (FullWidth MUI TextField) */}
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

                        {/* Message Area */}
                        {msg && (
                            <Typography
                                align="center"
                                className={`font-medium ${isSuccess ? "text-green-600" : "text-red-600"}`}
                                variant="body2"
                            >
                                {msg}
                            </Typography>
                        )}

                        {/* Login Button */}
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
                                '&:hover': { backgroundColor: '#1565C0' }
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

export default App;