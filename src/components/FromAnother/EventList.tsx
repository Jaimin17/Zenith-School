"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchEventsByDateAction } from "@/actions/admin";
import type { Events } from "@/types/schemas";
import { Skeleton, Box, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

const EventList = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const dateParam = searchParams.get('date');

  // Fetch events whenever date changes (or on mount)
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      
      // Use date from URL or default to today
      const searchDate = dateParam ? new Date(dateParam) : new Date();
      const result = await fetchEventsByDateAction(searchDate);
      
      if (result.success) {
        setEvents(result.data);
      } else {
        console.error('Failed to fetch events:', result.error);
        setEvents([]);
      }
      
      setIsLoading(false);
    };

    fetchEvents();
  }, [dateParam]);

  const formatDate = (dateString: string) => {
    const eventDate = new Date(dateString);
    return eventDate.getHours().toString().padStart(2, '0') + ':' + 
           eventDate.getMinutes().toString().padStart(2, '0');
  };

  // Loading state
  if (isLoading) {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={80} />
        ))}
      </Box>
    );
  }

  // Empty state
  if (events.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        py={4}
        color="text.secondary"
      >
        <EventIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
        <Typography variant="body2">
          No events scheduled for this day
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {events.map((event) => (
        <div
          className="p-3 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          key={event.id}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600 text-sm">{event.title}</h1>
            <span className="text-gray-300 text-xs">
              {formatDate(event.start_time)}
            </span>
          </div>

          <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
        </div>
      ))}
    </>
  );
};

export default EventList;