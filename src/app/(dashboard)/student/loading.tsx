"use client";

import { Box, Skeleton } from "@mui/material";

export default function StudentLoading() {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3">
        <Box className="h-full bg-white p-4 rounded-md">
          <Skeleton variant="text" width={180} height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={400} sx={{ borderRadius: 2 }} />
        </Box>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={240} sx={{ borderRadius: 2 }} />
      </div>
    </div>
  );
}
