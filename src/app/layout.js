"use client";
import { CssBaseline } from "@mui/material";
import Navbar from "@/components/navbar/index";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>zenith</title>
      <body>
        <CssBaseline />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
