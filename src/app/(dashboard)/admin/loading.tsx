"use client";

import { Box, Skeleton } from "@mui/material";

export default function AdminLoading() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User cards */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              sx={{ flex: 1, minWidth: 130, height: 100, borderRadius: 2 }}
            />
          ))}
        </Box>

        {/* Charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2 }} />
      </div>

      {/* NOTE: Chatbot floats globally via layout.tsx — no skeleton needed here */}
    </div>
  );
}