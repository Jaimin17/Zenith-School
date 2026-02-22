"use client";

import { Box, Skeleton } from "@mui/material";

export default function AttendanceLoading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Skeleton variant="text" width={200} height={36} />
        <Skeleton variant="rounded" width={200} height={40} sx={{ borderRadius: 2 }} />
      </div>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rounded" width={140} height={100} sx={{ borderRadius: 2 }} />
        ))}
      </Box>
      <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
    </div>
  );
}
