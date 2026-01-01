import { CssBaseline } from "@mui/material";
import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "../contexts/authContext";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>Zenith</title>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          {/* THEME CSS */}
          <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/assets/css/all-fontawesome.min.css" />
          <link rel="stylesheet" href="/assets/css/animate.min.css" />
          <link rel="stylesheet" href="/assets/css/magnific-popup.min.css" />
          <link rel="stylesheet" href="/assets/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/assets/css/style.css" />
        </head>

        <body>
          <CssBaseline />

          {/* Scripts should load BEFORE components mount */}
          <Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive" />
          <Script src="/assets/js/owl.carousel.min.js" strategy="beforeInteractive" />

          {/* other JS */}
          <Script src="/assets/js/modernizr.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/jquery.appear.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/jquery.easing.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/counter-up.js" strategy="afterInteractive" />
          <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
          <Script src="/assets/js/main.js" strategy="afterInteractive" />

          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

