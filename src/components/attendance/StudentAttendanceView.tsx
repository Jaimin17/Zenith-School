"use client";

import { useRouter } from "next/navigation";
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import type { CalendarHeatmapResponse, CalendarDayData } from "@/types/schemas";

interface StudentAttendanceViewProps {
  studentId: string;
  month: number;
  year: number;
  calendarData: CalendarHeatmapResponse | null;
  hasError: boolean;
  errorMessage?: string;
}

const StudentAttendanceView = ({
  studentId,
  month,
  year,
  calendarData,
  hasError,
  errorMessage,
}: StudentAttendanceViewProps) => {
  const router = useRouter();

  const changeMonth = (delta: number) => {
    let newMonth = month + delta;
    let newYear = year;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    
    router.push(`/list/attendance?month=${newMonth}&year=${newYear}`);
  };

  const getMonthName = (m: number, y: number) => {
    return new Date(y, m - 1, 1).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
  };

  const getDaysInMonth = (m: number, y: number) => {
    const firstDay = new Date(y, m - 1, 1);
    const lastDay = new Date(y, m, 0);
    return {
      daysInMonth: lastDay.getDate(),
      startingDay: firstDay.getDay()
    };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(month, year);

  // Create a map of day data for quick lookup
  const dayDataMap = new Map<number, CalendarDayData>();
  calendarData?.days?.forEach(day => {
    const date = new Date(day.date);
    if (date.getMonth() + 1 === month && date.getFullYear() === year) {
      dayDataMap.set(date.getDate(), day);
    }
  });

  const getDateColor = (day: number) => {
    const data = dayDataMap.get(day);
    if (!data || data.total_records === 0) return "bg-gray-100 text-gray-400";
    
    const rate = data.attendance_rate;
    if (rate === 100) return "bg-green-500 text-white";
    if (rate >= 75) return "bg-green-300 text-green-800";
    if (rate >= 50) return "bg-yellow-300 text-yellow-800";
    if (rate > 0) return "bg-orange-300 text-orange-800";
    return "bg-red-500 text-white";
  };

  const getDateTooltip = (day: number) => {
    const data = dayDataMap.get(day);
    if (!data || data.total_records === 0) return "No records";
    return `Present: ${data.present_count}, Absent: ${data.absent_count}`;
  };

  // Build calendar days
  const calendarDays = [];
  for (let i = 0; i < startingDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-10 h-10" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const data = dayDataMap.get(day);
    calendarDays.push(
      <div
        key={day}
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium cursor-default transition-all hover:scale-105 ${getDateColor(day)}`}
        title={getDateTooltip(day)}
      >
        {day}
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Error Loading Attendance
          </h2>
          <p className="text-red-600 text-sm">
            {errorMessage || "Failed to load attendance data. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  const summary = calendarData?.monthly_summary;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">Track your attendance throughout the month</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-20 text-blue-500" />
            <div>
              <p className="text-blue-600 text-xs font-medium">Total Days</p>
              <h3 className="text-xl font-bold text-blue-700">{summary?.total_days || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-green-600 text-xs font-medium">Present</p>
              <h3 className="text-xl font-bold text-green-700">{summary?.present_days || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-red-600 text-xs font-medium">Absent</p>
              <h3 className="text-xl font-bold text-red-700">{summary?.absent_days || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-purple-600 text-xs font-medium">Rate</p>
              <h3 className="text-xl font-bold text-purple-700">{summary?.attendance_rate?.toFixed(1) || 0}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">
            {getMonthName(month, year)}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="w-10 h-10 flex items-center justify-center text-xs font-semibold text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-600">100% Present</span>
          </div>
          {/* <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-green-300"></div>
            <span className="text-gray-600">75%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-yellow-300"></div>
            <span className="text-gray-600">50%+</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-orange-300"></div>
            <span className="text-gray-600">&lt;50%</span>
          </div> */}
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-gray-600">Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-gray-100"></div>
            <span className="text-gray-600">No Record</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceView;
