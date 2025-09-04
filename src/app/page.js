"use client";
import ActivityEventGallery from "@/components/activityAndEvents/ActivityEventGallery";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import SchoolStatistics from "@/components/statistics/SchoolStatistics";
import { OurTimeline } from "@/components/ui/our-timeline";
import StackCards from "@/components/ui/StackCards";
import { VisionMissionData } from "@/lib/data";
import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box
      className="w-full h-full"
      // sx={{
      //   overflow: "hidden",
      // }}
    >
      <ImagesSliderDemo />
      {/* Activities And Events Gallery Section */}
      <ActivityEventGallery />

      <StackCards data={VisionMissionData} />

      <SchoolStatistics />

      <OurTimeline />
    </Box>
  );
}
