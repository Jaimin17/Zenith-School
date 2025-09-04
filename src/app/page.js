"use client";
import ActivityEventGallery from "@/components/activityAndEvents/ActivityEventGallery";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import SchoolStatistics from "@/components/statistics/SchoolStatistics";
import { OurTimeline } from "@/components/ui/our-timeline";
import StackCards from "@/components/ui/StackCards";
import { VisionMissionData } from "@/lib/data";
import { Box, Typography } from "@mui/material";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import { CardCarousel } from "@/components/alumni/CardCarousel";
import ContactUsContainer from "@/components/ContactUs/ContactUsContainer";

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
      {/* Vission and Mission Cards */}
      <StackCards data={VisionMissionData} />

      {/* Animated Header */}
      <AnimatedHeader
        miniHeader="🏫 Foundation"
        title="Our Proud "
        highlight="Alumni"
        descriptions={[
          "Meet the incredible alumni who inspire the next generation."
        ]}
        align="center"
        titleVariant="h3"
        subtitleVariant="body1"
      />
      <CardCarousel />

      {/* Contact Us */}
      <AnimatedHeader
        miniHeader="📞 Contact Us"
        title="Get in "
        highlight="Touch"
        subtitle="We'd love to hear from you!"
        descriptions={[
          "Whether you have questions about admissions, programs, or events, our team is here to assist you every step of the way.",
          "Reach out to us via email, phone, or visit our campus — we’d be happy to connect with you.",
        ]}
        align="center"
        titleVariant="h3"
        subtitleVariant="body1"
      />

      <ContactUsContainer />

      <SchoolStatistics />

      <OurTimeline />
    </Box>
  );
}
