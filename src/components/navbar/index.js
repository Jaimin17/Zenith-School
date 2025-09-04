"use client";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  WhatsApp,
  Search,
} from "@mui/icons-material";
import NavDropdown from "./NavDropdown";
import NavLinkBtn from "./NavLinkBtn";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpen = (index, event) => {
    setAnchorEl(event.currentTarget);
    setOpenIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };

  return (
    <>
      {/* ✅ Top Info Bar (NOT sticky) */}
      <Box sx={{ display: "flex", width: "100%", position: "relative"}}>
        {/* Left - Socials */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "orange",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            px: 2,
            py: 1.5,
            fontSize: 14,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" fontWeight="bold">
              Follow Us:
            </Typography>
            <Facebook
              fontSize="large"
              sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }}
            />
            <Instagram
              fontSize="large"
              sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }}
            />
            <YouTube
              fontSize="large"
              sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }}
            />
            <WhatsApp
              fontSize="large"
              sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }}
            />
          </Stack>
        </Box>

        {/* Right - Contact Info */}
        <Box
          sx={{
            flex: 2,
            bgcolor: "#0f5c4d",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
            py: 1.5,
            fontSize: 16,
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography variant="body2">📍 Bharuch, Gujarat</Typography>
            <Typography variant="body2">✉ info@zenithschool.com</Typography>
            <Typography variant="body2">📞 +91 12365-47898</Typography>
          </Stack>
        </Box>
      </Box>

      {/* ✅ Sticky Navbar only */}
      <Box
        sx={{
          position: "sticky",
          bgcolor: "white",
          color: "black",
          width: "100%",
          px: 4,
          top: 0, // sticky offset
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", 
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            color: "black",
            px: 4
          }}
        >
        <Toolbar sx={{ minHeight: "64px" }}>
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              paddingRight: 60,
            }}
          >
            <Typography
              variant="h4"
              sx={{ flexGrow: 1, fontWeight: "900", color: "#0f5c4d" }}
            >
              Zeni<span style={{ color: "orange" }}>th</span>
            </Typography>
          </Link>

          {/* Menu Items */}
          <Stack direction="row" spacing={2} display={"flex"} justifyContent="center" alignItems={"center"}>
            <NavDropdown
              title="Overview"
              items={["Tribute to Our Founders", "Why Zenith School"]}
              links={[
                "/overview/tribute-to-our-founders",
                "/overview/why-zenith-school",
              ]}
              open={openIndex === 0}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(0, event)}
              onClose={handleClose}
            />

            <NavDropdown
              title="About"
              items={[
                "From Principal’s Desk",
                "State-of-the-Art Infrastructure",
                "Timeline",
                "Awards",
              ]}
              links={[
                "/about/from-principal-desk",
                "/about/state-of-the-art-infrastructure",
                "/about/timeline",
                "/about/awards",
              ]}
              open={openIndex === 1}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(1, event)}
              onClose={handleClose}
            />
            <NavLinkBtn href={"/admission"} title="Admissions" />
            <NavDropdown
              title="Academics"
              items={["Curriculum", "Activities beyond Academics"]}
              links={[
                "/academics/curriculum",
                "/academics/activities-beyond-academics",
              ]}
              open={openIndex === 2}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(2, event)}
              onClose={handleClose}
            />
            <NavLinkBtn href={"/sports"} title="Sports" />
            <NavDropdown
              title="Gallery"
              items={["Photo Gallery", "Event Gallery"]}
              links={["/gallery/photos", "/gallery/events"]}
              open={openIndex === 3}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(3, event)}
              onClose={handleClose}
            />
            <NavLinkBtn href={"/contact-us"} title="Contact Us" sx={{ width: "max-content" }} />
            <NavLinkBtn href={"/careers"} title="Careers" />
            <NavLinkBtn href={"/alumni"} title="Alumni" />
          </Stack>

          {/* Right Side */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ ml: 3 }}>
            <IconButton>
              <Search />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                bgcolor: "orange",
                color: "white",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#e69500" },
              }}
            >
              APPLY NOW
            </Button>
          </Stack>
        </Toolbar>
        </Box>
      </Box>
    </>
  );
}
