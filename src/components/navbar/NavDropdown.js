"use client";

import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function NavDropdown({ title, items, links, open, anchorEl, onOpen, onClose }) {

  return (
    <>
      <Button
        onMouseEnter={onOpen}
        sx={{
          color: "black",
          textTransform: "none",
          fontWeight: "700",
          fontSize: "16px",
          "&:hover": {
            color: "green",
          },
        }}
      >
        {title}
        <KeyboardArrowDownIcon sx={{ marginLeft: "4px" }} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
            onMouseLeave: onClose,
        }}
        PaperProps={{
          sx: {
            bgcolor: "#0f5c4d", // Dark green
            color: "white",
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} onClick={onClose} 
            sx={{
              "&:hover .itemText": {
                color: "orange",
                transform: "translateX(5px)",
              },
              "&:hover .slashes": {
                opacity: 1,
                transform: "translateX(0)",
                color: "orange",
              },
            }}
          >
            <Link href={links[index]}
                style={{ textDecoration: "none", color: "inherit", width: "100%", display: "flex", alignItems: "center" }}
            >
              <span
                className="itemText"
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                {item}
              </span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
