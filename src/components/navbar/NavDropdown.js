"use client";

import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NavDropdown({ title, items, links, open, onOpen, onClose }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEnter = (event) => {
    setAnchorEl(event.currentTarget); // local anchor
    onOpen(event);                    // tell parent which index to open
  };

  const handleLeave = () => {
    setAnchorEl(null);
    onClose();
  };

  return (
    <>
      <Button
        onMouseEnter={handleEnter}
        sx={{
          color: "black",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "16px",
          "&:hover": { color: "green" },
        }}
      >
        {title}
        <KeyboardArrowDownIcon sx={{ ml: "4px" }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleLeave}
        MenuListProps={{
          onMouseLeave: handleLeave,
        }}
        PaperProps={{
          sx: { bgcolor: "#0f5c4d", color: "white", mt: '13px' },
        }}
      >
        {items.map((item, i) => (
          <MenuItem key={i} onClick={handleLeave}
            sx={{
              "&:hover .itemText": {
                color: "orange",
                transform: "translateX(5px)",
              },
            }}
          >
            <Link
              href={links[i]}
              style={{
                textDecoration: "none",
                color: "inherit",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span className="itemText" style={{ transition: "all 0.3s ease" }}>
                {item}
              </span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
