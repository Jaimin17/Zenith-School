"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Users,
  CheckCircle,
  XCircle,
  ChevronDown
} from "lucide-react";
import type { ParentChildrenAttendanceResponse, ChildAttendanceSummary } from "@/types/schemas";
import { useState } from "react";

interface ParentAttendanceViewProps {
  month: number;
  year: number;
  childrenData: ParentChildrenAttendanceResponse | null;
  hasError: boolean;
  errorMessage?: string;
}

const ParentAttendanceView = ({
  month,
  year,
  childrenData,
  hasError,
  errorMessage,
}: ParentAttendanceViewProps) => {
  const router = useRouter();
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

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

  const getStatusColor = (rate: number) => {
    if (rate >= 90) return "bg-green-100 text-green-700 border-green-200";
    if (rate >= 75) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getProgressColor = (rate: number) => {
    if (rate >= 90) return "bg-green-500";
    if (rate >= 75) return "bg-yellow-500";
    return "bg-red-500";
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

  // Calculate overall stats
  const totalPresent = childrenData?.children?.reduce((sum, child) => sum + child.present_days, 0) || 0;
  const totalAbsent = childrenData?.children?.reduce((sum, child) => sum + child.absent_days, 0) || 0;
  const totalDays = childrenData?.children?.reduce((sum, child) => sum + child.total_days, 0) || 0;
  const overallRate = totalDays > 0 ? (totalPresent / totalDays) * 100 : 0;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Children&apos;s Attendance</h1>
        <p className="text-gray-500 text-sm mt-1">Monitor your children&apos;s attendance records</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 min-w-[180px] text-center">
          {getMonthName(month, year)}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-blue-600 text-xs font-medium">Children</p>
              <h3 className="text-xl font-bold text-blue-700">{childrenData?.children?.length || 0}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-green-600 text-xs font-medium">Total Present</p>
              <h3 className="text-xl font-bold text-green-700">{totalPresent}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-red-500" />
            <div>
              <p className="text-red-600 text-xs font-medium">Total Absent</p>
              <h3 className="text-xl font-bold text-red-700">{totalAbsent}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-purple-600 text-xs font-medium">Overall Rate</p>
              <h3 className="text-xl font-bold text-purple-700">{overallRate.toFixed(1)}%</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Children Cards */}
      <div className="space-y-4">
        {childrenData?.children && childrenData.children.length > 0 ? (
          childrenData.children.map((child: ChildAttendanceSummary) => (
            <div
              key={child.student_id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Child Header */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedChild(expandedChild === child.student_id ? null : child.student_id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {child.student_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{child.student_name}</h3>
                    <p className="text-sm text-gray-500">
                      {child.present_days} present, {child.absent_days} absent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Progress Bar */}
                  <div className="hidden md:block w-32">
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(child.attendance_rate)} rounded-full transition-all`}
                        style={{ width: `${child.attendance_rate}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Rate Badge */}
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusColor(child.attendance_rate)}`}>
                    {child.attendance_rate.toFixed(1)}%
                  </span>
                  
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedChild === child.student_id ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedChild === child.student_id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{child.total_days}</div>
                      <div className="text-xs text-gray-500">Total Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{child.present_days}</div>
                      <div className="text-xs text-gray-500">Present</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{child.absent_days}</div>
                      <div className="text-xs text-gray-500">Absent</div>
                    </div>
                  </div>
                  <Link
                    href={`/list/students/${child.student_id}`}
                    className="block w-full text-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    View Full Profile
                  </Link>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-600 font-medium">No Children Found</h3>
            <p className="text-gray-400 text-sm mt-1">No attendance data available for this month</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentAttendanceView;
