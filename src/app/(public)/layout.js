import Banner from "@/components/Banner";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import SearchPopUp from "@/components/search-popup/SearchPopUp";
import { Box } from "@mui/material";

export default function PublicLayout({ children }) {
    return (
        <>
            <Navbar />

            <SearchPopUp />

            {/* Main Content */}
            <Box component="main" className="main">
                <ProtectedRoute>{children}</ProtectedRoute>
            </Box>

            {/* Footer always at bottom */}
            <Footer />
        </>
    );
}
