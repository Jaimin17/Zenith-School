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
import { Facebook, Instagram, YouTube, WhatsApp, Search } from "@mui/icons-material";
import NavDropdown from "./NavDropdown"; // Import the new dropdown component
import NavLinkBtn from "./NavLinkBtn";
import { useState } from "react";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    const handleOpen = (index, event) => {
        setAnchorEl(event.currentTarget); // ✅ keep track of button element
        setOpenIndex(index);
    };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenIndex(null);
  };


  return (
    <Box>
      {/* Top Info Bar */}
      <Box sx={{ display: "flex", width: "100%" }}>
        {/* Left - Socials (Orange) */}
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
            <Facebook fontSize="large" sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }} />
            <Instagram fontSize="large" sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }} />
            <YouTube fontSize="large" sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }} />
            <WhatsApp fontSize="large" sx={{ p: "6px", bgcolor: "green", borderRadius: "50%" }} />
          </Stack>
        </Box>

        {/* Right - Contact Info (Green) */}
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

      {/* Main Navbar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: "white", color: "black", px: 4 }}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold", color: "#0f5c4d" }}>
            edu<span style={{ color: "orange" }}>ka</span>
          </Typography>

          {/* Menu Items */}
          <Stack direction="row" spacing={2}>
            <NavDropdown
              title="Overview"
              items={["Tribute to Our Founders", "Why Zenith School"]}
              links={["/overview/tribute-to-our-founders", "/overview/why-zenith-school"]}
              open={openIndex === 0}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(0, event)}
              onClose={handleClose}
            />

            {/* Reusable Dropdowns */}
            <NavDropdown
              title="About"
              items={["From Principal’s Desk", "State-of-the-Art Infrastructure", "Timeline", "Awards"]}
              links={["/about/from-principal-desk", "/about/state-of-the-art-infrastructure", "/about/timeline", "/about/awards"]}
              open={openIndex === 1}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(1, event)}
              onClose={handleClose}
            />
            <NavLinkBtn href={"/admission"} title="Admissions" />
            <NavDropdown
              title="Academics"
              items={["Curriculum", "Activities beyond Academics"]}
              links={["/academics/curriculum", "/academics/activities-beyond-academics"]}
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
            <NavLinkBtn href={"/contact-us"} title="Contact Us" />
            <NavLinkBtn href={"/careers"} title="Careers" />
            <NavLinkBtn href={"/alumni"} title="Alumni" />
          </Stack>

          {/* Right Side - Search + Apply Button */}
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
      </AppBar>
    </Box>
  );
}
