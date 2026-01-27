"use client";

import { useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown, RotateCcw, BookOpen, Users, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Subject, Teacher } from "@/types/schemas";

interface AssignmentFiltersProps {
  subjects: Subject[];
  teachers: Teacher[];
  currentSubjectId?: string;
  currentTeacherId?: string;
  currentStatus?: string;
  currentDate?: string;
  currentSearch?: string;
  teacherId?: string;
}

const AssignmentFilters = ({
  subjects,
  teachers,
  currentSubjectId,
  currentTeacherId,
  currentStatus,
  currentDate,
  currentSearch,
  teacherId,
}: AssignmentFiltersProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = currentSubjectId || currentTeacherId || currentStatus || currentDate;
  const activeFilterCount = [currentSubjectId, currentTeacherId, currentStatus, currentDate].filter(Boolean).length;

  // Build filter URL helper
  const buildFilterUrl = (
    newSubjectId?: string,
    newTeacherId?: string,
    newStatus?: string,
    newDate?: string
  ) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (newSubjectId) params.set("subjectId", newSubjectId);
    if (newTeacherId) params.set("filterTeacherId", newTeacherId);
    if (newStatus) params.set("status", newStatus);
    if (newDate) params.set("date", newDate);
    if (teacherId) params.set("teacherId", teacherId);
    const queryString = params.toString();
    return queryString ? `/list/assignments?${queryString}` : "/list/assignments";
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubjectId = e.target.value || undefined;
    router.push(buildFilterUrl(newSubjectId, currentTeacherId, currentStatus, currentDate));
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeacherId = e.target.value || undefined;
    router.push(buildFilterUrl(currentSubjectId, newTeacherId, currentStatus, currentDate));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value || undefined;
    router.push(buildFilterUrl(currentSubjectId, currentTeacherId, newStatus, currentDate));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value || undefined;
    router.push(buildFilterUrl(currentSubjectId, currentTeacherId, currentStatus, newDate));
  };

  return (
    <div className="mt-4">
      {/* Filter Header */}
      <div 
        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Filter Assignments</h3>
            <p className="text-xs text-gray-500">
              {hasActiveFilters 
                ? `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied` 
                : 'Narrow down your results'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Link
              href={teacherId ? `/list/assignments?teacherId=${teacherId}` : "/list/assignments"}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </Link>
          )}
          <ChevronDown 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {/* Filter Content */}
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="p-4 bg-white border-x border-b border-gray-200 rounded-b-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Subject Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <BookOpen className="w-3.5 h-3.5" />
                Subject
              </label>
              <div className="relative">
                <select
                  value={currentSubjectId || ""}
                  onChange={handleSubjectChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Teacher Filter */}
            {teacherId == null && 
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <Users className="w-3.5 h-3.5" />
                Teacher
              </label>
              <div className="relative">
                <select
                  value={currentTeacherId || ""}
                  onChange={handleTeacherChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Teachers</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.first_name} {teacher.last_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          }

            {/* Status Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <CheckCircle className="w-3.5 h-3.5" />
                Status
              </label>
              <div className="relative">
                <select
                  value={currentStatus || ""}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Date Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <Calendar className="w-3.5 h-3.5" />
                Due Date
              </label>
              <input
                type="date"
                value={currentDate || ""}
                onChange={handleDateChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilters;
