"use client";

import { Box, Skeleton } from "@mui/material";

export default function SettingsLoading() {
  return (
    <div className="p-4 space-y-6">
      <Box className="bg-white rounded-xl shadow-sm p-6">
        <Skeleton variant="text" width={120} height={40} />
        <Skeleton variant="text" width="70%" height={24} sx={{ mt: 1 }} />
      </Box>
      <Box className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex", gap: 1, p: 2 }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="rounded" width={100} height={40} sx={{ borderRadius: 2 }} />
          ))}
        </Box>
        <Box sx={{ p: 3 }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="rounded" height={56} sx={{ mt: 2, borderRadius: 2 }} />
          <Skeleton variant="rounded" height={56} sx={{ mt: 2, borderRadius: 2 }} />
          <Skeleton variant="rounded" height={56} sx={{ mt: 2, borderRadius: 2 }} />
        </Box>
      </Box>
    </div>
  );
}
