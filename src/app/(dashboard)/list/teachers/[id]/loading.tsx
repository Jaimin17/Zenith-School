"use client";

import { Box, Skeleton } from "@mui/material";

export default function TeacherDetailLoading() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 2 }}>
          <Skeleton variant="rounded" height={200} sx={{ flex: 1, borderRadius: 2 }} />
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Skeleton variant="rounded" height={80} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rounded" height={80} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
      </div>
      <div className="w-full xl:w-1/3">
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
      </div>
    </div>
  );
}
