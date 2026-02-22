"use client";

import { Box, Skeleton } from "@mui/material";

export default function TakeAttendanceLoading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
        <Box>
          <Skeleton variant="text" width={180} height={28} />
          <Skeleton variant="text" width={120} height={20} />
        </Box>
      </div>
      <Skeleton variant="rounded" width={260} height={48} sx={{ borderRadius: 2 }} />
      <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
    </div>
  );
}
