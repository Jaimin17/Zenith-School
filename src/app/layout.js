"use client";

import { CssBaseline, Box } from "@mui/material";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/all-fontawesome.min.css";
import "../assets/css/animate.min.css";
import "../assets/css/magnific-popup.min.css";
import "../assets/css/owl.carousel.min.css";
import "../assets/css/style.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/loader/preloader";
import SearchPopUp from "@/components/search-popup/SearchPopUp";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zenith</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </head>
      <body>
        <CssBaseline />

        {/* <Loader /> */}
        {/* Sticky Navbar */}
        <Navbar />

        <SearchPopUp />

        {/* Main Content */}
        <Box component="main" className="main">
          <ProtectedRoute>{children}</ProtectedRoute>
        </Box>

        {/* Footer always at bottom */}
        <Footer />
      </body>
    </html>
  );
}
