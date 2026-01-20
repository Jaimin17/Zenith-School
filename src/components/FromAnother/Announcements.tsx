"use client";

import { Box, Typography, Skeleton } from "@mui/material";
import { useState, useTransition } from "react";
import type { Announcement, AnnouncementListResponse } from "@/types/schemas";
import AnnouncementIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RefreshIcon from '@mui/icons-material/Refresh';
import { fetchAnnouncementsAction } from "@/actions/admin";

const cardColors = [
  "rgba(56, 189, 248, 0.15)",   // sky light
  "rgba(168, 85, 247, 0.15)",   // purple light
  "rgba(250, 204, 21, 0.15)",   // yellow light
];

interface AnnouncementsProps {
  initialAnnouncements: AnnouncementListResponse;
}

const Announcements = ({ initialAnnouncements }: AnnouncementsProps) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements.data);
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
      startTransition(async () => {
          const result = await fetchAnnouncementsAction();
          if (result.success && result.data) {
            setAnnouncements(result.data.data);
          }
      });
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(dateString));
  };

  return (
    <Box bgcolor="#fff" p={2} borderRadius={2} boxShadow={1}>
      {/* HEADER */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <AnnouncementIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Announcements
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <RefreshIcon 
            sx={{ 
              fontSize: 20,
              cursor: "pointer",
              color: "text.secondary",
              transition: "transform 0.3s",
              transform: isPending ? "rotate(360deg)" : "rotate(0deg)",
              "&:hover": { color: "primary.main" }
            }}
            onClick={handleRefresh}
          />
          <Typography 
            variant="caption" 
            color="primary"
            sx={{ 
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            View All
          </Typography>
        </Box>
      </Box>


      {/* EMPTY STATE */}
      {isPending && (
        <Box display="flex" flexDirection="column" gap={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={100} />
          ))}
        </Box>
      )}

      {!isPending && announcements?.length === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          py={4}
          color="text.secondary"
        >
          <AnnouncementIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
          <Typography variant="body2">
            No announcements at this time
          </Typography>
        </Box>
      )}

      {/* LIST */}
      {!isPending && announcements?.length > 0 && (
        <Box display="flex" flexDirection="column" gap={2}>
          {announcements.map((item: Announcement, index: number) => (
            <Box
              key={item.id}
              sx={{
                bgcolor: cardColors[index % cardColors.length],
                p: 2,
                borderRadius: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 2,
                }
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="start">
                <Typography fontWeight={600} sx={{ flex: 1, pr: 2 }}>
                  {item.title}
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    boxShadow: 1,
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 12, color: "text.secondary" }} />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {formatDate(item.announcement_date)}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.description}
              </Typography>

              {item.related_class && (
                <Box 
                  mt={1} 
                  display="inline-block"
                  bgcolor="rgba(0,0,0,0.05)"
                  px={1}
                  py={0.25}
                  borderRadius={1}
                >
                  <Typography variant="caption" fontWeight={500}>
                    {item.related_class.name || "Class"}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Announcements;
