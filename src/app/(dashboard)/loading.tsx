"use client";

import { Box, Skeleton } from "@mui/material";

export default function DashboardRootLoading() {
  return (
    <div className="p-4">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
      </Box>
    </div>
  );
}
