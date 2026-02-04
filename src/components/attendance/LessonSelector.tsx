"use client";

import React from "react";
import { Calendar, Clock, Users, BookOpen, CheckCircle, AlertCircle, MinusCircle } from "lucide-react";
import Link from "next/link";
import type { LessonForDateItem, LessonsForDateResponse } from "@/types/schemas";

interface LessonSelectorProps {
  lessonsData: LessonsForDateResponse | null;
  selectedDate: string;
  hasError?: boolean;
  errorMessage?: string;
}

const LessonSelector: React.FC<LessonSelectorProps> = ({
  lessonsData,
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
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
            Complete
          </span>
        );
      case "partial":
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
            Partial
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
            Not Taken
          </span>
        );
    }
  };

  const formatTime = (timeStr: string) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (hasError) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Lessons</h3>
          <p className="text-gray-500">{errorMessage || "Failed to load lessons"}</p>
        </div>
      </div>
    );
  }

  if (!lessonsData || lessonsData.lessons.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Lessons Found</h3>
          <p className="text-gray-500">There are no lessons scheduled for {lessonsData?.day_of_week || "this date"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {lessonsData.day_of_week}
          </h2>
          <p className="text-sm text-gray-500">
            {lessonsData.total_lessons} lesson{lessonsData.total_lessons !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessonsData.lessons.map((lesson: LessonForDateItem) => (
          <Link
            key={lesson.lesson_id}
            href={`/list/attendance/take?lessonId=${lesson.lesson_id}&date=${selectedDate}`}
            className="group block"
          >
            <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-200 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(lesson.attendance_status)}
                  <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {lesson.lesson_name}
                  </span>
                </div>
                {getStatusBadge(lesson.attendance_status)}
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span>{lesson.class_name}</span>
                  {lesson.subject_name && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-indigo-600">{lesson.subject_name}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>
                    {formatTime(lesson.start_time)} - {formatTime(lesson.end_time)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{lesson.students_count} students</span>
                </div>
              </div>

              {/* Attendance Progress */}
              {lesson.attendance_status !== "not_taken" && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-700">
                      {lesson.present_count + lesson.absent_count}/{lesson.students_count}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all"
                      style={{
                        width: `${((lesson.present_count + lesson.absent_count) / lesson.students_count) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-green-600">{lesson.present_count} Present</span>
                    <span className="text-red-600">{lesson.absent_count} Absent</span>
                  </div>
                </div>
              )}

              {/* Action Hint */}
              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <span className="text-xs text-indigo-600 font-medium group-hover:text-indigo-700">
                  {lesson.attendance_status === "not_taken"
                    ? "Click to Take Attendance →"
                    : "Click to Edit Attendance →"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LessonSelector;
