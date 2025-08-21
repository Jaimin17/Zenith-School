import { Button } from "@mui/material";
import Link from "next/link";

export default function NavLinkBtn({ href, title }) {
  return (
    <Link href={href}>
      <Button
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
      </Button>
    </Link>
  );
}
