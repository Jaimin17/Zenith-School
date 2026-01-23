"use client";

import { useRouter } from "next/navigation";
import { SlidersHorizontal, ChevronDown, RotateCcw, GraduationCap, ClipboardList, FileText, Award } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ClassBase, ExamBase, AssignmentBase } from "@/types/schemas";

interface ResultFiltersProps {
  classes: ClassBase[];
  exams: ExamBase[];
  assignments: AssignmentBase[];
  currentClassId?: string;
  currentExamId?: string;
  currentAssignmentId?: string;
  currentType?: string;
  currentSearch?: string;
}

const ResultFilters = ({
  classes,
  exams,
  assignments,
  currentClassId,
  currentExamId,
  currentAssignmentId,
  currentType,
  currentSearch,
}: ResultFiltersProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = currentClassId || currentExamId || currentAssignmentId || currentType;
  const activeFilterCount = [currentClassId, currentExamId, currentAssignmentId, currentType].filter(Boolean).length;

  // Build filter URL helper
  const buildFilterUrl = (
    newClassId?: string,
    newExamId?: string,
    newAssignmentId?: string,
    newType?: string
  ) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (newClassId) params.set("classId", newClassId);
    if (newExamId) params.set("examId", newExamId);
    if (newAssignmentId) params.set("assignmentId", newAssignmentId);
    if (newType) params.set("type", newType);
    const queryString = params.toString();
    return queryString ? `/list/results?${queryString}` : "/list/results";
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newClassId = e.target.value || undefined;
    router.push(buildFilterUrl(newClassId, currentExamId, currentAssignmentId, currentType));
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newExamId = e.target.value || undefined;
    router.push(buildFilterUrl(currentClassId, newExamId, currentAssignmentId, currentType));
  };

  const handleAssignmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newAssignmentId = e.target.value || undefined;
    router.push(buildFilterUrl(currentClassId, currentExamId, newAssignmentId, currentType));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value || undefined;
    router.push(buildFilterUrl(currentClassId, currentExamId, currentAssignmentId, newType));
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
            <h3 className="text-sm font-semibold text-gray-800">Filter Results</h3>
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
              href="/list/results"
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
            {/* Class Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <GraduationCap className="w-3.5 h-3.5" />
                Class
              </label>
              <div className="relative">
                <select
                  value={currentClassId || ""}
                  onChange={handleClassChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Classes</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <Award className="w-3.5 h-3.5" />
                Type
              </label>
              <div className="relative">
                <select
                  value={currentType || ""}
                  onChange={handleTypeChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Types</option>
                  <option value="exam">Exam</option>
                  <option value="assignment">Assignment</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Exam Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <ClipboardList className="w-3.5 h-3.5" />
                Exam
              </label>
              <div className="relative">
                <select
                  value={currentExamId || ""}
                  onChange={handleExamChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Exams</option>
                  {exams.map((exam) => (
                    <option key={exam.id} value={exam.id}>
                      {exam.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Assignment Filter */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <FileText className="w-3.5 h-3.5" />
                Assignment
              </label>
              <div className="relative">
                <select
                  value={currentAssignmentId || ""}
                  onChange={handleAssignmentChange}
                  className="w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors"
                >
                  <option value="">All Assignments</option>
                  {assignments.map((assignment) => (
                    <option key={assignment.id} value={assignment.id}>
                      {assignment.title}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultFilters;
