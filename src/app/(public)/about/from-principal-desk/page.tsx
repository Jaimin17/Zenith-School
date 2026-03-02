import React, { JSX } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { BANNER_DATA, CONTENT_WRITTEN_DATA } from "../../../../lib/data";
import Banner from "../../../../components/Banner";

interface PrincipalData {
  image: string;
  name: string;
  title: string;
  description: string;
}

const principalData: PrincipalData = {
  image:
    "https://images.unsplash.com/photo-1750090669148-761d67513434?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  name: "Ms. Jayshree Shah",
  title: "Principal, Zenith School",
  description: CONTENT_WRITTEN_DATA?.PRINCIPLES_INTERVIEW,
};

const bannerData = BANNER_DATA["from-principal-desk"];

export default function FromPrincipalDeskPage() {
  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            boxShadow: 3,
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* Image Section */}
          <CardMedia
            component="img"
            image={principalData.image}
            alt={principalData.name}
            sx={{
              width: { xs: "80%", md: 300 },
              height: { xs: 250, md: 350 },
              borderRadius: 2,
              objectFit: "cover",
              alignSelf: "center",
            }}
          />

          {/* Content Section */}
          <CardContent sx={{ flex: 1 }}>
            {/* Accent Line */}
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
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontFamily: "serif",
                color: "text.primary",
              }}
            >
              From the Principal's Desk
            </Typography>

            {/* Quote Text */}
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                textAlign: "justify",
                color: "text.secondary",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                fontStyle: "italic",
              }}
            >
              {principalData.description}
            </Typography>

            {/* Signature */}
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

            {/* Title */}
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "right",
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              {principalData.title}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}