import Image from "next/image";
import { Box, Typography } from "@mui/material";
import AttendanceChart from "./AttendanceChart";

type RawAttendance = {
  date: Date | string;
  present: boolean;
};

type AttendanceDay = {
  name: string;
  present: number;
  absent: number;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  // -------------------------
  //  API CALL (DUMMY FOR NOW)
  // -------------------------
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/attendance?from=${lastMonday.toISOString()}`,
  //   { cache: "no-store" }
  // );

  // const res: Response | null = null;

  let resData: RawAttendance[] = [];

  // if (res !== null && res.ok) {
  //   resData = await res.json();
  // } else {
    // --------------- DUMMY DATA ---------------
  resData = [
      { date: new Date(), present: true },
      { date: new Date(), present: false },
      { date: new Date(), present: true },
    ];
  // }

  const attendanceMap: Record<
    string,
    { present: number; absent: number }
  > = {
    Mon: { present: 0, absent: 0 },
    Tue: { present: 0, absent: 0 },
    Wed: { present: 0, absent: 0 },
    Thu: { present: 0, absent: 0 },
    Fri: { present: 0, absent: 0 },
  };

  resData.forEach(item => {
    const date = new Date(item.date);
    const dow = date.getDay(); // 1 = Mon, 5 = Fri

    if (dow >= 1 && dow <= 5) {
      const day = DAYS[dow - 1];
      item.present
        ? attendanceMap[day].present++
        : attendanceMap[day].absent++;
    }
  });

  const data: AttendanceDay[] = DAYS.map(day => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        p: 2,
        height: "100%",
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Attendance
        </Typography>

        <Image src="/moreDark.png" alt="menu" width={20} height={20} />
      </Box>

      {/* CHART */}
      <AttendanceChart data={data} />
    </Box>
  );
};

export default AttendanceChartContainer;
