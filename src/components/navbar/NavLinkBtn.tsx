import { Button, SxProps, Theme } from "@mui/material";
import Link from "next/link";
import React from "react";

interface NavLinkBtnProps {
  href: string;
  title: string;
  sx?: SxProps<Theme>;
  className?: string;
}

const NavLinkBtn: React.FC<NavLinkBtnProps> = ({ href, title, sx = {}, className }) => {
  return (
    <Link href={href}>
      <Button
        className={className}
        sx={{
          color: "black",
          ...sx,
          textTransform: "none",
          fontWeight: "700",
          fontSize: "16px",
          "&:hover": {
            color: "green",
          },
        }}
      >
        {title}
      </Button>
    </Link>
  );
};

export default NavLinkBtn;