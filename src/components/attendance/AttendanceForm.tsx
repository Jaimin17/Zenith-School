"use client";

import React, { useState, useTransition } from "react";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Save, 
  AlertCircle,
  UserCheck,
  UserX,
  Check,
  X,
  Loader2,
  ArrowLeft,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LessonRosterResponse, StudentRosterItem, AttendanceRecord } from "@/types/schemas";
import { submitAttendanceAction } from "@/actions/admin";

interface AttendanceFormProps {
  rosterData: LessonRosterResponse | null;
  selectedDate: string;
  hasError?: boolean;
  errorMessage?: string;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  rosterData,
  selectedDate,
  hasError,
  errorMessage,
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Initialize attendance state from roster data
  const [attendanceState, setAttendanceState] = useState<Record<string, boolean | null>>(() => {
    if (!rosterData?.students) return {};
    const initial: Record<string, boolean | null> = {};
    rosterData.students.forEach((student) => {
      initial[student.student_id] = student.present;
    });
    return initial;
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const toggleAttendance = (studentId: string, present: boolean) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === present ? null : present,
    }));
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const markAllPresent = () => {
    if (!rosterData?.students) return;
    const newState: Record<string, boolean | null> = {};
    rosterData.students.forEach((student) => {
      newState[student.student_id] = true;
    });
    setAttendanceState(newState);
  };

  const markAllAbsent = () => {
    if (!rosterData?.students) return;
    const newState: Record<string, boolean | null> = {};
    rosterData.students.forEach((student) => {
      newState[student.student_id] = false;
    });
    setAttendanceState(newState);
  };

  const clearAll = () => {
    if (!rosterData?.students) return;
    const newState: Record<string, boolean | null> = {};
    rosterData.students.forEach((student) => {
      newState[student.student_id] = null;
    });
    setAttendanceState(newState);
  };

  const handleSubmit = async () => {
    if (!rosterData) return;

    // Check if all students have been marked
    const unmarked = Object.values(attendanceState).filter((v) => v === null).length;
    if (unmarked > 0) {
      setSubmitError(`Please mark attendance for all ${unmarked} remaining student(s)`);
      return;
    }

    const records: AttendanceRecord[] = Object.entries(attendanceState).map(
      ([student_id, present]) => ({
        student_id,
        present: present as boolean,
      })
    );

    startTransition(async () => {
      const result = await submitAttendanceAction({
        lesson_id: rosterData.lesson_id,
        attendance_date: selectedDate,
        records,
        overwrite_existing: rosterData.attendance_exists,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
        // Redirect after successful submission
        setTimeout(() => {
          router.push("/list/attendance/take");
          router.refresh();
        }, 1500);
      } else {
        setSubmitError(result.error || "Failed to submit attendance");
      }
    });
  };

  // Calculate statistics
  const presentCount = Object.values(attendanceState).filter((v) => v === true).length;
  const absentCount = Object.values(attendanceState).filter((v) => v === false).length;
  const unmarkedCount = Object.values(attendanceState).filter((v) => v === null).length;
  const totalStudents = rosterData?.total_students || 0;

  if (hasError) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Roster</h3>
          <p className="text-gray-500">{errorMessage || "Failed to load student roster"}</p>
          <Link
            href="/list/attendance/take"
            className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  if (!rosterData || rosterData.students.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Students Found</h3>
          <p className="text-gray-500">This class has no students enrolled</p>
          <Link
            href="/list/attendance/take"
            className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-gray-800">{rosterData.lesson_name}</h2>
              {rosterData.attendance_exists && (
                <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                  Edit Mode
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-gray-400" />
                {rosterData.class_name}
                {rosterData.subject_name && ` • ${rosterData.subject_name}`}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(rosterData.target_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-400" />
                {totalStudents} Students
              </span>
            </div>
          </div>
          <Link
            href="/list/attendance/take"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-800">{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Present</p>
              <p className="text-xl font-bold text-green-600">{presentCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <UserX className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Absent</p>
              <p className="text-xl font-bold text-red-600">{absentCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-xl font-bold text-gray-600">{unmarkedCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-gray-600">Quick Actions:</span>
          <button
            onClick={markAllPresent}
            className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            Mark All Present
          </button>
          <button
            onClick={markAllAbsent}
            className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 transition-colors flex items-center gap-1.5"
          >
            <XCircle className="w-4 h-4" />
            Mark All Absent
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Student List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            Student Roster
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Present
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Absent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rosterData.students.map((student: StudentRosterItem) => {
                const status = attendanceState[student.student_id];
                return (
                  <tr key={student.student_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium text-sm shadow-sm">
                          {student.student_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{student.student_name}</p>
                          <p className="text-xs text-gray-500">@{student.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleAttendance(student.student_id, true)}
                          className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                            status === true
                              ? "bg-green-500 text-white shadow-md scale-110"
                              : "bg-green-100 text-green-600 hover:bg-green-200"
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center">
                        <button
                          onClick={() => toggleAttendance(student.student_id, false)}
                          className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                            status === false
                              ? "bg-red-500 text-white shadow-md scale-110"
                              : "bg-red-100 text-red-600 hover:bg-red-200"
                          }`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Submit Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{submitError}</p>
          </div>
        )}

        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Attendance submitted successfully! Redirecting...</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            {unmarkedCount > 0 ? (
              <span className="text-amber-600 font-medium">
                ⚠ {unmarkedCount} student(s) not marked yet
              </span>
            ) : (
              <span className="text-green-600 font-medium">
                ✓ All students marked
              </span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isPending || submitSuccess}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {rosterData.attendance_exists ? "Update Attendance" : "Submit Attendance"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;
