"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  ChevronRight,
  Users,
  BookOpen,
  AlertCircle,
  ClipboardCheck
} from "lucide-react";
import type { TeacherClassesAttendanceResponse, TeacherClassSummary } from "@/types/schemas";
import AttendanceDatePicker from "./AttendanceDatePicker";

interface TeacherAttendanceViewProps {
  selectedDate: string;
  teacherData: TeacherClassSummary[] | null;
  hasError: boolean;
  errorMessage?: string;
}

const TeacherAttendanceView = ({
  selectedDate,
  teacherData,
  hasError,
  errorMessage,
}: TeacherAttendanceViewProps) => {
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

  const getDayColor = (day: string) => {
    const colors: Record<string, string> = {
      MONDAY: "bg-blue-100 text-blue-700",
      TUESDAY: "bg-purple-100 text-purple-700",
      WEDNESDAY: "bg-green-100 text-green-700",
      THURSDAY: "bg-orange-100 text-orange-700",
      FRIDAY: "bg-pink-100 text-pink-700",
      SATURDAY: "bg-cyan-100 text-cyan-700",
      SUNDAY: "bg-red-100 text-red-700",
    };
    return colors[day] || "bg-gray-100 text-gray-700";
  };

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

  const markedClasses = teacherData?.filter(c => c.attendance_marked) || [];
  const pendingClasses = teacherData?.filter(c => !c.attendance_marked) || [];

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Classes Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">Mark and manage attendance for your classes</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Take Attendance Button */}
          <Link
            href={`/list/attendance/take?date=${selectedDate}`}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <ClipboardCheck className="w-5 h-5" />
            <span>Take Attendance</span>
          </Link>

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
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Classes</p>
              <h3 className="text-2xl font-bold text-blue-700">{teacherData?.length || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <h3 className="text-2xl font-bold text-green-700">{markedClasses.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-amber-600 text-sm font-medium">Pending</p>
              <h3 className="text-2xl font-bold text-amber-700">{pendingClasses.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Classes Section */}
      {pendingClasses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Pending Attendance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingClasses.map((classItem: TeacherClassSummary) => (
              <Link
                key={classItem.lesson_id}
                href={`/list/attendance/class/${classItem.class_id}?date=${selectedDate}`}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                      {classItem.class_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                        {classItem.class_name}
                      </h3>
                      <p className="text-sm text-gray-500">{classItem.lesson_name}</p>
                      {classItem.subject_name && (
                        <span className="text-xs text-amber-600">{classItem.subject_name}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDayColor(classItem.day)}`}>
                      {classItem.day.charAt(0) + classItem.day.slice(1).toLowerCase()}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{classItem.total_students}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed Classes Section */}
      {markedClasses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Completed
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {markedClasses.map((classItem: TeacherClassSummary) => (
                <Link
                  key={classItem.lesson_id}
                  href={`/list/attendance/class/${classItem.class_id}?date=${selectedDate}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {classItem.class_name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{classItem.class_name}</h3>
                      <p className="text-sm text-gray-500">{classItem.lesson_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium text-green-600">{classItem.present_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-red-600">{classItem.absent_count}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      Completed
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!teacherData || teacherData.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-600 font-medium">No Classes Today</h3>
          <p className="text-gray-400 text-sm mt-1">You don&apos;t have any classes scheduled for this date</p>
        </div>
      )}
    </div>
  );
};

export default TeacherAttendanceView;
