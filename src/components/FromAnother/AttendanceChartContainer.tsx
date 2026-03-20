import Image from "next/image";
import { Box, Typography } from "@mui/material";
import AttendanceChart from "./AttendanceChart";
import type { AttendanceDashboardSummary } from "@/types/schemas";

type AttendanceDay = {
  name: string;
  present: number;
  absent: number;
};

const AttendanceChartContainer = ({
  summary,
}: {
  summary: AttendanceDashboardSummary | null;
}) => {
  const presentCount = summary?.present_count ?? 0;
  const absentCount = summary?.absent_count ?? 0;
  const totalStudents = summary?.total_students ?? presentCount + absentCount;
  const attendanceRate = summary?.attendance_rate ?? 0;
  const isHoliday = Boolean(summary?.is_holiday);
  const holidayReason = summary?.holiday_reason || "Holiday";
  const selectedDateLabel = summary?.date
    ? new Date(summary.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Today";

  const data: AttendanceDay[] = [
    {
      name: "Today",
      present: presentCount,
      absent: absentCount,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Today&apos;s Attendance
        </Typography>

        <Image src="/moreDark.png" alt="menu" width={20} height={20} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Typography variant="caption" color="text.secondary">
          {selectedDateLabel}
        </Typography>
        {!isHoliday ? (
          <Typography variant="caption" color="text.secondary">
            {attendanceRate.toFixed(1)}% present
          </Typography>
        ) : (
          <Typography
            variant="caption"
            sx={{
              color: "#b45309",
              fontWeight: 700,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: "#fef3c7",
              border: "1px solid #fde68a",
            }}
          >
            Attendance locked
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, mt: 1 }}>
        {!isHoliday ? (
          <AttendanceChart data={data} />
        ) : (
          <Box
            sx={{
              height: "100%",
              borderRadius: 2,
              border: "1px solid #fcd34d",
              background: "linear-gradient(135deg, #fffbeb 0%, #fff7ed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              px: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ color: "#92400e", fontWeight: 700 }}>
                Non-working day: {holidayReason}
              </Typography>
              <Typography variant="caption" sx={{ color: "#a16207", display: "block", mt: 0.5 }}>
                Attendance can be marked only on working days.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Typography variant="caption" color="text.secondary">
          Total Students: {totalStudents}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Present: {presentCount} | Absent: {absentCount}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={0.5}>
        <Typography variant="caption" color="text.secondary">
          Classes Completed: {summary?.classes_with_attendance ?? 0}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Pending: {summary?.pending_classes ?? 0}
        </Typography>
      </Box>
    </Box>
  );
};

export default AttendanceChartContainer;
