"use client";

import { Skeleton } from "@mui/material";

export default function ClassAttendanceLoading() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
        <Skeleton variant="text" width={220} height={32} />
        <Skeleton variant="rounded" width={180} height={40} sx={{ borderRadius: 2 }} />
      </div>
      <Skeleton variant="rounded" height={400} sx={{ borderRadius: 2 }} />
    </div>
  );
}
