import { CheckCircle2, CalendarDays, TrendingUp, XCircle } from "lucide-react";
import { StudentYearDataResponse } from "@/types/schemas";

interface YearAttendanceSummaryCardProps {
  yearData: StudentYearDataResponse;
  title?: string;
}

export default function YearAttendanceSummaryCard({ yearData, title }: YearAttendanceSummaryCardProps) {
  const summary = yearData.attendance_summary;
  const pct = Math.max(0, Math.min(100, summary.attendance_percentage || 0));

  return (
    <div className="bg-white rounded-md p-4 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title || "Attendance"}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{yearData.academic_year.year_label} · Excluding Sundays and public holidays</p>
          <p className="text-xs text-gray-500 mt-0.5">{summary.working_days_left} working day(s) left in this academic year</p>
          <p className="text-xs text-gray-500 mt-0.5">{summary.public_holiday_count} public holiday(s) in this academic year (excluding Sundays)</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-emerald-600">{pct.toFixed(1)}%</span>
          <span className="text-xs text-gray-500">Attendance Rate</span>
        </div>
        <div className="mt-2 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-50 rounded-md p-2">
          <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-semibold text-green-700">{summary.present_days}</p>
          <p className="text-[11px] text-gray-500">Present</p>
        </div>
        <div className="bg-red-50 rounded-md p-2">
          <XCircle className="w-4 h-4 text-red-600 mx-auto mb-1" />
          <p className="text-sm font-semibold text-red-700">{summary.absent_days}</p>
          <p className="text-[11px] text-gray-500">Absent</p>
        </div>
        <div className="bg-blue-50 rounded-md p-2">
          <CalendarDays className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-semibold text-blue-700">{summary.total_working_days}</p>
          <p className="text-[11px] text-gray-500">Working Days Passed</p>
        </div>
      </div>
    </div>
  );
}
