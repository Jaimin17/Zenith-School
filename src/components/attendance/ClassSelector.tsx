"use client";

import React from "react";
import { Calendar, Users, CheckCircle, AlertCircle, MinusCircle, Ban } from "lucide-react";
import Link from "next/link";
import type { ClassForDateItem, ClassesForDateResponse } from "@/types/schemas";

interface ClassSelectorProps {
  classesData: ClassesForDateResponse | null;
  selectedDate: string;
  hasError?: boolean;
  errorMessage?: string;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({
  classesData,
  selectedDate,
  hasError,
  errorMessage,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "partial":
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      default:
        return <MinusCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">Complete</span>;
      case "partial":
        return <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Partial</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Not Taken</span>;
    }
  };

  if (hasError) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Classes</h3>
          <p className="text-gray-500">{errorMessage || "Failed to load classes"}</p>
        </div>
      </div>
    );
  }

  if (!classesData || classesData.classes.length === 0) {
    const isHoliday = Boolean(classesData?.is_holiday);
    const holidayReason = classesData?.holiday_reason || "Holiday";

    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isHoliday ? "bg-amber-100" : "bg-gray-100"}`}>
            {isHoliday ? <Ban className="w-8 h-8 text-amber-600" /> : <Calendar className="w-8 h-8 text-gray-400" />}
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {isHoliday ? "Attendance Locked" : "No Classes Found"}
          </h3>
          <p className="text-gray-500">
            {isHoliday
              ? `Attendance cannot be taken on ${holidayReason}.`
              : `There are no classes available for ${classesData?.day_of_week || "this date"}`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{classesData.day_of_week}</h2>
          <p className="text-sm text-gray-500">{classesData.total_classes} class{classesData.total_classes !== 1 ? "es" : ""} available</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classesData.classes.map((classItem: ClassForDateItem) => (
          <Link key={classItem.class_id} href={`/list/attendance/take?classId=${classItem.class_id}&date=${selectedDate}`} className="group block">
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 h-full">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(classItem.attendance_status)}
                  <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{classItem.class_name}</span>
                </div>
                {getStatusBadge(classItem.attendance_status)}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{classItem.students_count} students</span>
                </div>
              </div>

              {classItem.attendance_status !== "not_taken" && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">
                      {classItem.present_count + classItem.absent_count}/{classItem.students_count}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
                      style={{
                        width: `${classItem.students_count > 0 ? ((classItem.present_count + classItem.absent_count) / classItem.students_count) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-green-600">{classItem.present_count} Present</span>
                    <span className="text-red-600">{classItem.absent_count} Absent</span>
                  </div>
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ClassSelector;
