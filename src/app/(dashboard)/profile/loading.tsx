"use client";

import { Box, Skeleton } from "@mui/material";

export default function ProfileLoading() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm m-4">
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 200 }}>
          <Skeleton variant="circular" width={120} height={120} />
          <Skeleton variant="rounded" width={80} height={28} sx={{ mt: 2, borderRadius: 2 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={36} />
          <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 2 }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} variant="rounded" width={160} height={48} sx={{ borderRadius: 2 }} />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}
