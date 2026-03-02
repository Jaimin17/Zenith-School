"use client";

import { Box, Typography, Container } from "@mui/material";
import Banner from "@/components/Banner";
import { ALUMNI_DATA, BANNER_DATA, WHY_ZENITH_DATA } from "@/lib/data";
import SchoolStatistics from "@/components/statistics/SchoolStatistics";
import { CardCarousel } from "@/components/alumni/CardCarousel";
import AboutUs from "@/components/about/AboutUs";

export default function WhyZenithSchoolPage() {
  const bannerData = BANNER_DATA["why-zenith-school"];

  return (
    <>
      {/* Banner Section */}
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      {/* Subheading Section Hidden For Now */}
      <Container maxWidth="md" className="max-w-screen overflow-hidden" sx={{ display: 'none' }}>
        <Box textAlign="center" mt={6} mb={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              color: "text.primary",
            }}
          >
            {WHY_ZENITH_DATA?.title}
          </Typography>
        </Box>

        {/* Paragraph Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
            {WHY_ZENITH_DATA?.description}
          </Typography>
        </Box>

        {/* Horizontal School Image */}
        <Box display="flex" justifyContent="center" mb={6} padding={2}>
          <img
            src={WHY_ZENITH_DATA?.image}
            alt="Zenith School"
            style={{
              maxHeight: "400px",
              maxWidth: "900px",
              borderRadius: "16px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          />
        </Box>
      </Container>

      {/* About Section */}
      <AboutUs />

      <SchoolStatistics />

      <div className="testimonial-area bg py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> Testimonials
                </span>
                <h2 className="site-title">
                  What Our Students <span>Say's</span>
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of
                  a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
          <CardCarousel data={ALUMNI_DATA} />
        </div>
      </div>
    </>
  );
}