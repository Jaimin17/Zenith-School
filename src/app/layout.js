"use client";
import { CssBaseline } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>zenith</title>
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}
