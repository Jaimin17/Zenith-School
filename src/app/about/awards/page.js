"use client";

import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { AWARDS_DATA, BANNER_DATA } from "@/lib/data";
import Banner from "@/components/Banner";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function AwardsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const bannerData = BANNER_DATA["awards"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ p: { xs: 2, sm: 4 } }}>
        {/* Page Title */}
        {/* <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: { xs: 3, sm: 5 },
          }}
        >
          Awards and Recognition
        </Typography> */}

        <Box sx={{
          pb: 8
        }}>
          <AnimatedHeader
            title="Awards and Recognition"
            subtitle="Celebrating achievements that inspire excellence and pride."
            align="center"
            titleVariant="h3"
            subtitleVariant="body1"
          />
        </Box>

        {/* Awards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 card per row on mobile
              sm: "1fr 1fr", // 2 cards per row on tablets
              md: "1fr 1fr 1fr", // 3 cards per row on medium+
            },
            gap: { xs: 2, sm: 3 },
          }}
        >
          {AWARDS_DATA.map((award, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: 6,
                },
                "&:hover img": {
                  transform: "scale(1.08)",
                },
                "&:hover .overlay": {
                  opacity: 1,
                },
              }}
            >
              {/* Award Image */}
              <Box
                component="img"
                src={award.image}
                alt={award.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
              />

              {/* Hover Overlay */}
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(0,0,0,0.55)",
                  color: "white",
                  p: 2,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    mb: 0.5,
                    ml: 1.5,
                  }}
                >
                  {award.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    ml: 1.5,
                  }}
                >
                  {award.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
