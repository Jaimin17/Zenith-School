"use client";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh", // fullscreen
        overflow: "hidden",
      }}
    >
      <ImagesSliderDemo />
    </Box>
  );
}
