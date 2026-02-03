"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Building
} from "lucide-react";
import type { AttendanceDashboardSummary, ClasswiseAttendanceResponse, ClassAttendanceSummary } from "@/types/schemas";
import AttendanceDatePicker from "./AttendanceDatePicker";

interface AdminAttendanceDashboardProps {
  selectedDate: string;
  summary: AttendanceDashboardSummary | null;
  classesData: ClasswiseAttendanceResponse | null;
  hasError: boolean;
  errorMessage?: string;
}

const AdminAttendanceDashboard = ({
  selectedDate,
  summary,
  classesData,
  hasError,
  errorMessage,
}: AdminAttendanceDashboardProps) => {
  const router = useRouter();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: string) => {
    router.push(`/list/attendance?date=${date}`);
    setIsDatePickerOpen(false);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }).format(new Date(dateStr));
  };

  // Get status color based on attendance rate
  const getStatusColor = (rate: number, hasAttendance: boolean) => {
    if (!hasAttendance) return "bg-slate-100 text-slate-600 border border-slate-200";
    if (rate >= 90) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (rate >= 75) return "bg-amber-50 text-amber-700 border border-amber-200";
    return "bg-rose-50 text-rose-700 border border-rose-200";
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-emerald-500";
    if (rate >= 75) return "bg-amber-500";
    return "bg-rose-500";
  };

  // Get gradient colors for class cards - light pastel colors
  const getClassGradient = (index: number) => {
    const gradients = [
      "from-violet-100 to-purple-200",
      "from-sky-100 to-blue-200", 
      "from-emerald-100 to-teal-200",
      "from-amber-100 to-orange-200",
      "from-pink-100 to-rose-200",
      "from-indigo-100 to-blue-200",
      "from-teal-100 to-cyan-200",
      "from-fuchsia-100 to-pink-200",
    ];
    return gradients[index % gradients.length];
  };

  // Get text colors for class initials
  const getClassTextColor = (index: number) => {
    const colors = [
      "text-violet-600",
      "text-sky-600", 
      "text-emerald-600",
      "text-amber-600",
      "text-pink-600",
      "text-indigo-600",
      "text-teal-600",
      "text-fuchsia-600",
    ];
    return colors[index % colors.length];
  };

  // Get border accent color for cards
  const getClassBorderColor = (index: number) => {
    const colors = [
      "border-l-violet-400",
      "border-l-sky-400", 
      "border-l-emerald-400",
      "border-l-amber-400",
      "border-l-pink-400",
      "border-l-indigo-400",
      "border-l-teal-400",
      "border-l-fuchsia-400",
    ];
    return colors[index % colors.length];
  };

  if (hasError) {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Error Loading Attendance Data
          </h2>
          <p className="text-red-600 text-sm">
            {errorMessage || "Failed to load attendance data. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Monitor and manage attendance across all classes</p>
        </div>
        
        {/* Date Picker */}
        <div className="relative">
          <button
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">{formatDate(selectedDate)}</span>
          </button>
          {isDatePickerOpen && (
            <AttendanceDatePicker
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onClose={() => setIsDatePickerOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Classes */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Classes</p>
              <h3 className="text-3xl font-bold text-blue-700 mt-1">
                {summary?.total_classes || 0}
              </h3>
            </div>
            <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-green-700 mt-1">
                {summary?.classes_with_attendance || 0}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Pending</p>
              <h3 className="text-3xl font-bold text-amber-700 mt-1">
                {summary?.pending_classes || 0}
              </h3>
            </div>
            <div className="w-12 h-12 bg-amber-200 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Attendance Rate</p>
              <h3 className="text-3xl font-bold text-purple-700 mt-1">
                {summary?.attendance_rate?.toFixed(1) || 0}%
              </h3>
            </div>
            <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Present/Absent Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Students Present</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-800">{summary?.present_count || 0}</span>
                <span className="text-sm text-gray-400">/ {summary?.total_students || 0}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">Students Absent</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-800">{summary?.absent_count || 0}</span>
                <span className="text-sm text-gray-400">/ {summary?.total_students || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Class-wise Attendance */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-indigo-600" />
              </div>
              Class-wise Attendance
            </h2>
            <span className="text-sm text-gray-500">{classesData?.total_classes || 0} classes</span>
          </div>
        </div>
        
        {classesData?.classes && classesData.classes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {classesData.classes.map((classItem: ClassAttendanceSummary, index: number) => (
              <Link
                key={classItem.class_id}
                href={`/list/attendance/class/${classItem.class_id}?date=${selectedDate}`}
                className={`group relative bg-white rounded-xl border border-gray-100 border-l-4 ${getClassBorderColor(index)} hover:shadow-md hover:border-gray-200 transition-all duration-300 overflow-hidden`}
              >
                <div className="p-4">
                  {/* Class Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 bg-gradient-to-br ${getClassGradient(index)} rounded-xl flex items-center justify-center ${getClassTextColor(index)} font-bold text-lg`}>
                        {classItem.class_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                          {classItem.class_name}
                        </h3>
                        {classItem.grade_level && (
                          <p className="text-xs text-gray-400">Grade {classItem.grade_level}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-md border border-emerald-100">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-sm font-medium text-emerald-600">{classItem.present_count}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-rose-50 rounded-md border border-rose-100">
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-sm font-medium text-rose-600">{classItem.absent_count}</span>
                      </div>
                      {classItem.not_marked_count > 0 && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-md border border-gray-100">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm font-medium text-gray-500">{classItem.not_marked_count}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      {classItem.total_students} students
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(classItem.attendance_rate)} rounded-full transition-all duration-500`}
                        style={{ width: `${classItem.has_attendance ? classItem.attendance_rate : 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(classItem.attendance_rate, classItem.has_attendance)}`}>
                      {!classItem.has_attendance ? "Pending" : `${classItem.attendance_rate.toFixed(0)}% Present`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-600 font-semibold text-lg">No Classes Found</h3>
            <p className="text-gray-400 text-sm mt-2">No attendance data available for this date</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAttendanceDashboard;
