import Banner from "@/components/Banner";
import { Box } from "@mui/material";

export default function AcademicsLayout({ children }) {
    return (
        <Box sx={{}}>
            <Banner title={"Academics"} />
            {children}

        </Box>
    );
}
