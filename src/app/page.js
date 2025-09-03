"use client";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="w-full h-full"
      sx={{
        overflow: "hidden",
      }}
    >
      <ImagesSliderDemo />
    </Box>
  );
}
