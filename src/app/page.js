"use client";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import StackCards from "@/components/ui/StackCards";
import { VisionMissionData } from "@/lib/data";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="w-full h-full"
      sx={{
        overflow: "hidden",
      }}
    >
      <ImagesSliderDemo />


      <StackCards data={VisionMissionData} />
    </Box>
  );
}
