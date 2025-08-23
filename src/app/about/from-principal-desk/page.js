import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { BANNER_DATA, CONTENT_WRITEN_DATA } from "@/lib/data";
import Banner from "@/components/Banner";

const principalData = {
  image:
    "https://cdn.pixabay.com/photo/2022/10/07/18/35/potrait-7505634_1280.jpg",
  name: "Ms. Jayshree Shah",
  title: "Principal, Zenith School",
  description: CONTENT_WRITEN_DATA?.PRICIPLES_INTERVIEW,
};

const bannerData = BANNER_DATA["from-principal-desk"];

export default function fromPrincipalDeskPage() {
  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box
            sx={{
              flex: 2,
              backgroundColor: "#fafafa",
              p: { xs: 3, md: 5 },
              borderRadius: 3,
              boxShadow: 3,
              position: "relative",
            }}
          >
            {/* Decorative Accent Line */}
            <Box
              sx={{
                width: 60,
                height: 4,
                backgroundColor: "primary.main",
                borderRadius: 2,
                mb: 2,
              }}
            />

            {/* Heading */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: "serif",
                color: "text.primary",
              }}
            >
              From the Principal’s Desk
            </Typography>

            {/* Quote Style Text */}
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.9,
                textAlign: "justify",
                color: "text.secondary",
                fontSize: "1.05rem",
                fontStyle: "italic",
              }}
            >
              {principalData.description}
            </Typography>

            {/* Signature Line (Optional) */}
            <Typography
              variant="subtitle1"
              sx={{
                mt: 3,
                fontWeight: 600,
                color: "primary.main",
                fontFamily: "cursive",
                textAlign: "right",
              }}
            >
              — {principalData.name}
            </Typography>
          </Box>

          {/* Right: Principal Card */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                maxWidth: 350,
                minWidth: 300,
                textAlign: "center",
                p: 3,
                borderRadius: 2,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 4,
                },
              }}
            >
              {/* Principal Image */}
              <CardMedia
                component="img"
                image={principalData.image}
                alt={principalData.name}
                sx={{
                  height: 300,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />

              {/* Principal Details */}
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1, color: "text.primary" }}>
                  {principalData.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", fontStyle: "italic" }}
                >
                  {principalData.title}
                </Typography>
              </CardContent>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
