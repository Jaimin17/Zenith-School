import Image from "next/image";
import { Box, Typography } from "@mui/material";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = () => {

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
      }}
    >
      {/* CALENDAR */}
      <EventCalendar />

      {/* HEADER */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        my={2}
      >
        <Typography variant="h6" fontWeight={600}>
          Events
        </Typography>

        <Image src="/moreDark.png" alt="menu" width={20} height={20} />
      </Box>

      {/* EVENT LIST */}
      <Box display="flex" flexDirection="column" gap={2}>

        {/* <EventCalendarContainer searchParams={searchParams} /> */}
        {/* <EventList dateParam={date} /> */}
      </Box>
    </Box>
  );
};

export default EventCalendarContainer;
