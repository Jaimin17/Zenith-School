"use client";

import { useState } from "react";
import { Button, Paper, MenuList, MenuItem, Popper, Grow, ClickAwayListener } from "@mui/material";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NavDropdown({ title, items, links, open, onOpen, onClose }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleEnter = (event) => {
    setAnchorEl(event.currentTarget); // anchor for Popper
    onOpen(event);                    // tell parent which index is open
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

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              onMouseLeave={handleLeave}
              sx={{ bgcolor: "#0f5c4d", color: "white", mt: "6px" }}
            >
              <ClickAwayListener onClickAway={handleLeave}>
                <MenuList autoFocusItem={open}>
                  {items.map((item, i) => (
                    <MenuItem
                      key={i}
                      onClick={handleLeave}
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
