"use client";

import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA, SPORTS_DATA } from "@/lib/data";
import { GALLERY_DATA } from "../gallery/photos/page";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Fragment } from "react";
import SportsCarousel from "@/components/ui/InfiniteCarousel";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function photoGalleryPage() {
  const bannerData = BANNER_DATA["sports"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      {/* Middle content for about sports complex */}
      <Fragment>
        {/* <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, }}>
                        Multipurpose Sports Complex
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        Explore our state-of-the-art sports facilities and the vibrant athletic culture at our school.
                    </Typography>
                </Box> */}
        <Box
          sx={{
            pb: 2,
          }}
        >
          <AnimatedHeader
            title="Multipurpose Sports Complex"
            subtitle="Explore our state-of-the-art sports facilities and the vibrant athletic culture at our school."
            align="center"
            titleVariant="h3"
            subtitleVariant="body1"
          />
        </Box>
        <DynamicGallery data={GALLERY_DATA} />
      </Fragment>

      {/* About Sports Section */}
      <Fragment>
        {/* <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, }}>
                        Our Sports Programs
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        We offer a wide range of sports designed to foster teamwork,
                        discipline, and holistic growth. From popular field games
                        to individual skill-based sports, every student finds their passion here.
                    </Typography>
                </Box> */}

        <Box
          sx={{
            pb: 8,
          }}
        >
          <AnimatedHeader
            title="Our Sports Programs"
            subtitle="We offer a wide range of sports designed to foster teamwork,
                        discipline, and holistic growth. From popular field games
                        to individual skill-based sports, every student finds their passion here."
            align="center"
            titleVariant="h3"
            subtitleVariant="body1"
          />
        </Box>

        <InfiniteCarousel
          data={SPORTS_DATA}
          cardWidth={400}
          gap={20}
          speed={60}
          renderCard={(sport, idx) => (
            <Card
              sx={{
                width: { xs: 240, sm: 280, md: 340, lg: 400 },
                height: { xs: 300, sm: 340, md: 380, lg: 450 },
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                "&:hover": { transform: "scale(1.04)" },
                transition: "transform 0.3s ease",
              }}
            >
              <CardMedia
                component="img"
                image={sport.image}
                alt={sport.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  p: 3,
                  color: "#fff",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {sport.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {sport.description}
                </Typography>
              </Box>
            </Card>
          )}
        />
      </Fragment>
    </>
  );
}
