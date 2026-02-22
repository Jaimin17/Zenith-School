"use client";

import { Box, Skeleton } from "@mui/material";

export default function DashboardLoading() {
  return (
    <div className="p-4">
      <Box sx={{ maxWidth: 480 }}>
        <Skeleton variant="text" width="70%" height={36} />
        <Skeleton variant="text" width="50%" height={24} sx={{ mt: 1 }} />
      </Box>
    </div>
  );
}
