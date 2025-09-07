"use client";

import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  WhatsApp,
  Search,
  Menu,
  Close,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import NavDropdown from "./NavDropdown";
import NavLinkBtn from "./NavLinkBtn";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpand, setMobileExpand] = useState({
    overview: false,
    about: false,
    academics: false,
    gallery: false,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const handleOpen = (index, event) => {
    setOpenIndex(index); // only track which index is open
  };

  const handleClose = () => {
    setOpenIndex(null); // close all
  };

  const handleMobileMenuOpen = () => setMobileOpen(true);
  const handleMobileMenuClose = () => setMobileOpen(false);
  const toggleMobile = (key) =>
    setMobileExpand((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      {/* ✅ Top Info Bar (NOT sticky) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "100%",
          position: "relative",
        }}
      >
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

      {/* ✅ Sticky Responsive Navbar */}
      <Box
        sx={{
          position: "sticky",
          bgcolor: "white",
          color: "black",
          width: "100%",
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid #eee",
          justifyContent: "space-between",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "56px", md: "64px" },
            px: { xs: 2, md: 4 },
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "900", color: "#0f5c4d", pr: { xs: 2, md: 6 } }}
            >
              Zeni<span style={{ color: "orange" }}>th</span>
            </Typography>
          </Link>

          {/* Desktop Menu (with hover dropdowns) */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" }, // ⬅️ now hides earlier
              justifyContent: "center",
              alignItems: "center",
              "& .nav-item": {
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
                fontWeight: 500,
              },
            }}
          >
            <NavDropdown
              className="nav-item"
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
              className="nav-item"
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
            <NavLinkBtn
              className="nav-item"
              href={"/admission"}
              title="Admissions"
            />
            <NavDropdown
              className="nav-item"
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
            <NavLinkBtn className="nav-item" href={"/sports"} title="Sports" />
            <NavDropdown
              className="nav-item"
              title="Gallery"
              items={["Photo Gallery", "Event Gallery"]}
              links={["/gallery/photos", "/gallery/events"]}
              open={openIndex === 3}
              anchorEl={anchorEl}
              onOpen={(event) => handleOpen(3, event)}
              onClose={handleClose}
            />
            <NavLinkBtn
              className="nav-item"
              href={"/contact-us"}
              title="Contact Us"
            />
            <NavLinkBtn
              className="nav-item"
              href={"/careers"}
              title="Careers"
            />
            <NavLinkBtn className="nav-item" href={"/alumni"} title="Alumni" />
          </Stack>

          {/* Right Side */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              ml: { xs: 0, md: 3 },
              display: { xs: "none", xl: "flex" },
            }}
          >
            <IconButton>
              <Search />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                bgcolor: "orange",
                color: "white",
                fontWeight: "bold",
                fontSize: { xs: "0.75rem", md: "1rem" },
                px: { xs: 1.5, md: 3 },
                "&:hover": { bgcolor: "#e69500" },
              }}
            >
              APPLY NOW
            </Button>
          </Stack>

          {/* Mobile Menu Icon */}
          <Box
            sx={{
              display: { xs: "block", xl: "none" },
              ml: 2,
            }}
          >
            <IconButton onClick={handleMobileMenuOpen}>
              <Menu />
            </IconButton>
          </Box>
        </Toolbar>
      </Box>

      {/* ✅ Mobile Drawer with nested (collapsible) lists */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileMenuClose}
        sx={{ zIndex: 12002 }}
      >
        <Box sx={{ width: 280, p: 2 }}>
          {/* Drawer Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" fontWeight="bold" color="#0f5c4d">
              Zenith
            </Typography>
            <IconButton onClick={handleMobileMenuClose}>
              <Close />
            </IconButton>
          </Stack>

          <Divider sx={{ mb: 1 }} />

          <List component="nav" disablePadding>
            {/* ✅ Overview */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleMobile("overview")}>
                <ListItemText primary="Overview" />
                {mobileExpand.overview ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileExpand.overview} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/overview/tribute-to-our-founders"
                    onClick={handleMobileMenuClose}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Tribute to Our Founders" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    href="/overview/why-zenith-school"
                    onClick={handleMobileMenuClose}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary="Why Zenith School" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            {/* ✅ About */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleMobile("about")}>
                <ListItemText primary="About" />
                {mobileExpand.about ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileExpand.about} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  {
                    t: "From Principal’s Desk",
                    h: "/about/from-principal-desk",
                  },
                  {
                    t: "State-of-the-Art Infrastructure",
                    h: "/about/state-of-the-art-infrastructure",
                  },
                  { t: "Timeline", h: "/about/timeline" },
                  { t: "Awards", h: "/about/awards" },
                ].map((it) => (
                  <ListItem key={it.h} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={it.h}
                      onClick={handleMobileMenuClose}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={it.t} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* ✅ Admissions */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/admission"
                onClick={handleMobileMenuClose}
              >
                <ListItemText primary="Admissions" />
              </ListItemButton>
            </ListItem>

            {/* ✅ Academics */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleMobile("academics")}>
                <ListItemText primary="Academics" />
                {mobileExpand.academics ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileExpand.academics} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { t: "Curriculum", h: "/academics/curriculum" },
                  {
                    t: "Activities beyond Academics",
                    h: "/academics/activities-beyond-academics",
                  },
                ].map((it) => (
                  <ListItem key={it.h} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={it.h}
                      onClick={handleMobileMenuClose}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={it.t} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* ✅ Sports */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/sports"
                onClick={handleMobileMenuClose}
              >
                <ListItemText primary="Sports" />
              </ListItemButton>
            </ListItem>

            {/* ✅ Gallery */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => toggleMobile("gallery")}>
                <ListItemText primary="Gallery" />
                {mobileExpand.gallery ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={mobileExpand.gallery} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {[
                  { t: "Photo Gallery", h: "/gallery/photos" },
                  { t: "Event Gallery", h: "/gallery/events" },
                ].map((it) => (
                  <ListItem key={it.h} disablePadding>
                    <ListItemButton
                      component={Link}
                      href={it.h}
                      onClick={handleMobileMenuClose}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={it.t} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* ✅ Singles */}
            {[
              { t: "Contact Us", h: "/contact-us" },
              { t: "Careers", h: "/careers" },
              { t: "Alumni", h: "/alumni" },
            ].map((it) => (
              <ListItem key={it.h} disablePadding>
                <ListItemButton
                  component={Link}
                  href={it.h}
                  onClick={handleMobileMenuClose}
                >
                  <ListItemText primary={it.t} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Drawer Footer Actions */}
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton>
              <Search />
            </IconButton>
            <Button
              fullWidth
              variant="contained"
              sx={{
                bgcolor: "orange",
                color: "white",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#e69500" },
              }}
              onClick={handleMobileMenuClose}
            >
              APPLY NOW
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
