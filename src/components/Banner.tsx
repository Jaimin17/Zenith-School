import React from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import { BANNER_IMAGE } from "@/lib/data";
import NavLinkBtn from "./navbar/NavLinkBtn";

interface BannerProps {
  title: string;
  backgroundImage?: string | null;
}

const Banner: React.FC<BannerProps> = ({ title, backgroundImage = null }) => {
  const bgImage = backgroundImage ? backgroundImage : BANNER_IMAGE;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: 300,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        px: 2,
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Centered content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          className="font-bold text-xl md:text-6xl text-white text-center bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        <Breadcrumbs
          sx={{
            mt: 1,
            "& a": {
              color: "#fff",
              textDecoration: "none",
              fontWeight: 500,
              "&:hover": { color: "#f59e0b" },
            },
            "& .MuiTypography-root": {
              color: "#f59e0b",
              fontWeight: 600,
            },
          }}
          separator=">>"
          color="white"
          aria-label="breadcrumb"
        >
          <NavLinkBtn
            href="/"
            title="Home"
            sx={{ color: "#fff !important", padding: "0px" }}
          />
          <Typography sx={{ px: 1 }}>{title}</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default Banner;