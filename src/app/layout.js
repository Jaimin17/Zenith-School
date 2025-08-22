"use client";
import { CssBaseline, Box } from "@mui/material";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "../../src/app/globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zenith</title>
      </head>
      <body>
        <CssBaseline />
        {/* Sticky Navbar */}
        <Navbar />

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
