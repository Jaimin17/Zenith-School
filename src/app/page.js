"use client";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import StackCards from "@/components/ui/StackCards";
import { VisionMissionData } from "@/lib/data";
import { Box, Typography } from "@mui/material";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { CardCarousel } from "@/components/alumni/CardCarousel";
import ContactUsContainer from "@/components/ContactUs/ContactUsContainer";

export default function HomePage() {
  return (
    <Box className="w-full h-full"
      sx={{
        overflow: "hidden",
      }}
    >
      <ImagesSliderDemo />

      {/* Vission and Mission Cards */}
      <StackCards data={VisionMissionData} />

      {/* Alumni Reviews */}
      <AnimatedHeader
        title="Our Proud Alumni"
        subtitle="Meet the incredible alumni who inspire the next generation."
        align="center"
        titleVariant="h3"
        subtitleVariant="body1"
      />
      <CardCarousel />

      {/* Contact Us */}
      <AnimatedHeader
        title="Get in Touch"
        subtitle="We'd love to hear from you!"
        align="center"
        titleVariant="h3"
        subtitleVariant="body1"
      />
      <ContactUsContainer />
    </Box>
  );
}
