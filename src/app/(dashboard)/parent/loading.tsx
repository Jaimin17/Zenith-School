"use client";

import { Box, Skeleton } from "@mui/material";

export default function ParentLoading() {
  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        <Box className="bg-white p-4 rounded-md">
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" height={360} sx={{ borderRadius: 2 }} />
        </Box>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
      </div>
    </div>
  );
}
