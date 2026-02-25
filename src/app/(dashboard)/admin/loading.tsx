"use client";

import { Box, Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
const TerminalChatbot = dynamic(() => import("../../../components/chatbot/TerminalChatbot"), { ssr: false });

export default function AdminLoading() {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT - same layout as admin page */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User cards row - 4 cards */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              variant="rounded"
              sx={{
                flex: 1,
                minWidth: 130,
                height: 100,
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
        {/* Charts row - Count chart (1/3) + Attendance chart (2/3) */}
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <Skeleton
              variant="rounded"
              height="100%"
              sx={{ borderRadius: 2 }}
            />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <Skeleton
              variant="rounded"
              height="100%"
              sx={{ borderRadius: 2 }}
            />
          </div>
        </div>
        {/* TERMINAL CHATBOT */}
        <div className="w-full">
          <TerminalChatbot />
        </div>
      </div>
      {/* RIGHT - Calendar + Announcements */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <Skeleton
          variant="rounded"
          height={320}
          sx={{ borderRadius: 2 }}
        />
        <Skeleton
          variant="rounded"
          height={280}
          sx={{ borderRadius: 2 }}
        />
      </div>
    </div>
  );
}
