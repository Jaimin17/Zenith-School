import Banner from "../../../components/Banner";
import { Box } from "@mui/material";
import { JSX, ReactNode } from "react";

interface AcademicsLayoutProps {
  children: ReactNode;
}

export default function AcademicsLayout({ children }: AcademicsLayoutProps) {
  return (
    <Box sx={{}}>
      <Banner title={"Academics"} />
      {children}
    </Box>
  );
}