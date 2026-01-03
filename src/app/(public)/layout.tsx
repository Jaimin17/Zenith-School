import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SearchPopUp from "@/components/search-popup/SearchPopUp";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      <SearchPopUp />

      {/* Main Content */}
      <Box component="main" className="main">
        <>{children}</>
      </Box>

      {/* Footer always at bottom */}
      <Footer />
    </>
  );
}