import { CssBaseline } from "@mui/material";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/loader/preloader";
import SearchPopUp from "@/components/search-popup/SearchPopUp";
import Script from "next/script";
import { AuthProvider } from "@/contexts/authContext";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `
          }} />
          <title>Zenith</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          {/* THEME CSS */}
          <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/assets/css/all-fontawesome.min.css" />
          <link rel="stylesheet" href="/assets/css/animate.min.css" />
          <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
          <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/assets/css/style.css" />
        </head>

        <body>
          <NextTopLoader color="#1976D2" showSpinner={false} height={3} />
          <CssBaseline />

          {/* Scripts */}
          <Script
            src="/assets/js/jquery-3.7.1.min.js"
            strategy="beforeInteractive"
          />
          <Script
            src="/assets/js/owl.carousel.min.js"
            strategy="beforeInteractive"
          />

          <Script
            src="/assets/js/modernizr.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/bootstrap.bundle.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/imagesloaded.pkgd.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/jquery.magnific-popup.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/isotope.pkgd.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/jquery.appear.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/jquery.easing.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="/assets/js/counter-up.js"
            strategy="afterInteractive"
          />
          <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/main.js" strategy="afterInteractive" />

          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
