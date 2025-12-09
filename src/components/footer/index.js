"use client";

import { Box, Typography, Grid, Link as MuiLink, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from "next/link";

export default function Footer() {
  const quickLinksTitle = ["About Us", "Timeline", "Curriculum", "Gallery", "Contact Us", "Careers"];
  const quickLinks = ["/about/from-principal-desk", "/about/timeline", "/academics/curriculum", "/gallery/photos", "/contact-us", "/careers"];


  return (
    <Box sx={{ bgcolor: "#0c2840", color: "white", py: { xs: 6, sm: 8 }, px: { xs: 4, md: 12 } }}>
      <Grid container spacing={6}>

        {/* Logo & About */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>
            Zenith<span style={{ color: "#ccc" }}>School</span>
          </Typography>
          <Typography variant="body2" sx={{ mt: 2, color: "#b0bec5" }}>
            Unlocking every student's potential by offering a stimulating and supportive environment here.
          </Typography>
          <Box sx={{ mt: 4, display: "flex", gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 40,
                border: "1px solid #455a64",
                transform: "rotate(45deg)",
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 40,
                border: "1px solid #455a64",
                transform: "rotate(45deg)",
              }}
            />
          </Box>
        </Grid>

        {/* Links */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
            Quick Links
          </Typography>
          {quickLinksTitle.map(
            (item, i) => (
              <MuiLink
                key={i}
                href={quickLinks[i]}
                component={Link}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#b0bec5",
                  mb: 1,
                  transition: "color 0.3s ease",
                  "&:hover": { color: "orange" },
                }}
              >
                <ArrowRightIcon /> {item}
              </MuiLink>

            )
          )}
        </Grid>

        {/* Programs
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Programs
          </Typography>
          {[
            "College AP Program",
            "STEM Program",
            "Arts Program",
            "Athletics Program",
            "Languages Program",
            "Humanities Program",
          ].map((item, i) => (
            <MuiLink
              key={i}
              href="#"
              underline="none"
              sx={{
                display: "block",
                color: "#b0bec5",
                mb: 1,
                transition: "color 0.3s ease",
                "&:hover": { color: "orange" },
              }}
            >
              {item}
            </MuiLink>
          ))}
        </Grid> */}

        {/* Address */}
        <Grid item xs={12} sm={4} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: "white" }}>
            Address
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0bec5", mb: 1 }}>
            1234 Education Lane, Learning City, EDFG States 05
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0bec5", mb: 1 }}>
            +91 12345-67890
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0bec5", mb: 3 }}>
            info@zenithschool.edu
          </Typography>

          {/* Social Icons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton sx={{ border: "1px solid white", color: "white", "&:hover": { color: "orange", borderColor: "orange" } }}>
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton sx={{ border: "1px solid white", color: "white", "&:hover": { color: "orange", borderColor: "orange" } }}>
              <Instagram fontSize="small" />
            </IconButton>
            <IconButton sx={{ border: "1px solid white", color: "white", "&:hover": { color: "orange", borderColor: "orange" } }}>
              <Twitter fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Footer */}
      <Box sx={{ mt: 6, borderTop: "1px solid #455a64", pt: 3, display: "flex", justifyContent: "space-between", flexWrap: "wrap", color: "#b0bec5" }}>
        <Typography variant="body2">Copyright © ZenithSchool 2025. All rights reserved.</Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          <MuiLink href="#" sx={{ color: "#b0bec5", transition: "color 0.3s ease", "&:hover": { color: "orange" } }}>Privacy Policy</MuiLink>
          <MuiLink href="#" sx={{ color: "#b0bec5", transition: "color 0.3s ease", "&:hover": { color: "orange" } }}>Terms and Conditions</MuiLink>
        </Box>
      </Box>
    </Box>
  );
}
