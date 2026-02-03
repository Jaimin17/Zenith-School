"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Calendar, 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  BookOpen,
  User,
  AlertCircle
} from "lucide-react";
import type { ClassAttendanceDetailResponse, ClassStudentAttendance } from "@/types/schemas";
import AttendanceDatePicker from "./AttendanceDatePicker";

interface ClassAttendanceDetailProps {
  classData: ClassAttendanceDetailResponse;
  selectedDate: string;
  role: string;
}

const ClassAttendanceDetail = ({
  classData,
  selectedDate,
  role,
}: ClassAttendanceDetailProps) => {
  const router = useRouter();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date: string) => {
    router.push(`/list/attendance/class/${classData.class_id}?date=${date}`);
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

  const getStatusBadge = (present: boolean | null, isCompact?: boolean) => {
    if (present === null) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
          {!isCompact && <span className="text-sm text-gray-500">Not Marked</span>}
        </div>
      );
    }
    if (present) {
      return (
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          {!isCompact && <span className="text-sm text-green-600 font-medium">Present</span>}
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
        {!isCompact && <span className="text-sm text-red-600 font-medium">Absent</span>}
      </div>
    );
  };

  const attendanceRate = classData.total_students > 0 
    ? ((classData.present_count / (classData.total_students - classData.not_marked_count)) * 100) || 0
    : 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            href={`/list/attendance?date=${selectedDate}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{classData.class_name}</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              {classData.lesson_name && (
                <>
                  <BookOpen className="w-4 h-4" />
                  {classData.lesson_name}
                </>
              )}
            </p>
          </div>
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-blue-600 text-xs font-medium">Total</p>
              <h3 className="text-xl font-bold text-blue-700">{classData.total_students}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-green-600 text-xs font-medium">Present</p>
              <h3 className="text-xl font-bold text-green-700">{classData.present_count}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-red-600 text-xs font-medium">Absent</p>
              <h3 className="text-xl font-bold text-red-700">{classData.absent_count}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-500" />
            <div>
              <p className="text-amber-600 text-xs font-medium">Pending</p>
              <h3 className="text-xl font-bold text-amber-700">{classData.not_marked_count}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 transform -rotate-90">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#e9d5ff"
                  strokeWidth="4"
                  fill="none"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#a855f7"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(attendanceRate / 100) * 100.53} 100.53`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-purple-600 text-xs font-medium">Rate</p>
              <h3 className="text-xl font-bold text-purple-700">
                {isNaN(attendanceRate) ? '0' : attendanceRate.toFixed(0)}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            Student List
            <span className="text-sm font-normal text-gray-400 ml-1">• {classData.total_students} students</span>
          </h2>
          {classData.not_marked_count > 0 && (role === 'admin' || role === 'teacher') && (
            <Link
              href={`/list/attendance/take?classId=${classData.class_id}&date=${selectedDate}`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Take Attendance
            </Link>
          )}
        </div>
        
        {classData.students && classData.students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Username</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Time</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {classData.students.map((student: ClassStudentAttendance, index: number) => (
                  <tr 
                    key={student.student_id} 
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                          {student.student_name.charAt(0).toUpperCase()}
                        </div>
                        <Link 
                          href={`/list/students/${student.student_id}`}
                          className="font-medium text-gray-800 hover:text-indigo-600 transition-colors"
                        >
                          {student.student_name}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <span className="text-sm text-gray-500">@{student.username}</span>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      {student.marked_at ? (
                        <span className="text-sm text-gray-500">
                          {new Date(student.marked_at).toLocaleTimeString("en-US", { 
                            hour: "2-digit", 
                            minute: "2-digit" 
                          })}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-300">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        {getStatusBadge(student.present)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-600 font-medium">No Students Found</h3>
            <p className="text-gray-400 text-sm mt-1">This class has no students enrolled</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassAttendanceDetail;
