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
      <div className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-top-wrap">
              <div className="header-top-left">
                <div className="header-top-social">
                  <span>Follow Us: </span>
                  <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link href="#"><i className="fab fa-instagram"></i></Link>
                  <Link href="#"><i className="fab fa-youtube"></i></Link>
                  <Link href="#"><i className="fab fa-whatsapp"></i></Link>
                </div>
              </div>

              <div className="header-top-right">
                <div className="header-top-contact">
                  <ul>
                    <li>
                      <Link href="#"><i className="far fa-location-dot"></i> 25/B Milford Road, New York</Link>
                    </li>
                    <li>
                      <Link href="#"><i className="far fa-envelopes"></i> [email protected]</Link>
                    </li>
                    <li>
                      <Link href="tel:+21236547898"><i className="far fa-phone-volume"></i> +2 123 654 7898</Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="bg-primary text-white px-4 py-1 rounded-md hover:bg-primary/90"
                      >
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>


            </div>
          </div>
        </div>

      </div>

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
              sx={{
                fontWeight: "900",
                color: "#0f5c4d",
                pr: { xs: 2, md: 6 },
              }}
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
            <NavLinkBtn
              className="nav-item"
              href={"/sports"}
              title="Sports"
            />
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
            <NavLinkBtn
              className="nav-item"
              href={"/alumni"}
              title="Alumni"
            />
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
            <Box className="search-btn">
              <Button type="button" className="nav-right-link search-box-outer"><i
                className="far fa-search"></i></Button>
            </Box>
            <Box className="nav-right-btn mt-2">
              <Link href="/admission" className="theme-btn"><span
                className="fal fa-pencil"></span>Apply Now</Link>
            </Box>
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
            <Collapse
              in={mobileExpand.academics}
              timeout="auto"
              unmountOnExit
            >
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
      {/* </div> */}
    </>
  );
}
