"use client";

import { Box, Skeleton } from "@mui/material";

export default function TableListSkeleton() {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={160} height={28} sx={{ flexShrink: 0 }} />
        <div className="flex items-center gap-4">
          <Skeleton variant="rounded" width={240} height={40} sx={{ borderRadius: 2 }} />
          <Skeleton variant="rounded" width={100} height={40} sx={{ borderRadius: 2 }} />
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider", py: 1.5, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="text" width={100} className="hidden md:inline-block" />
        <Skeleton variant="text" width={80} className="hidden md:inline-block" />
        <Skeleton variant="text" width={120} className="hidden lg:inline-block" />
      </Box>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" />
            <Skeleton variant="text" width="20%" height={20} />
          </Box>
          <Skeleton variant="text" width={60} sx={{ display: { xs: "none", md: "block" } }} />
          <Skeleton variant="text" width={80} sx={{ display: { xs: "none", md: "block" } }} />
          <Skeleton variant="rounded" width={32} height={32} sx={{ borderRadius: "50%" }} />
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 3 }}>
        <Skeleton variant="rounded" width={36} height={36} />
        <Skeleton variant="rounded" width={36} height={36} />
        <Skeleton variant="text" width={80} sx={{ alignSelf: "center" }} />
        <Skeleton variant="rounded" width={36} height={36} />
        <Skeleton variant="rounded" width={36} height={36} />
      </Box>
    </div>
  );
}
