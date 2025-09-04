"use client";
import ActivityEventGallery from "@/components/activityAndEvents/ActivityEventGallery";
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
      
      {/* Activities And Events Gallery Section */}
      <ActivityEventGallery />
    </Box>
  );
}
