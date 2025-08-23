"use client";

import { CssBaseline, Box } from "@mui/material";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zenith</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Normalize & baseline styles */}
        <CssBaseline />

        {/* Sticky Navbar */}
        <Navbar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          {children}
        </Box>

        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}
