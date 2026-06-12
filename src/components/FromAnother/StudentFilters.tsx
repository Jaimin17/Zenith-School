"use client";

import { useRouter } from "next/navigation";
import { SlidersHorizontal, GraduationCap, Users, ChevronDown, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { ClassReadonly, Grade } from "@/types/schemas";

interface StudentFiltersProps {
  classes: ClassReadonly[];
  grades: Grade[];
  currentClassId?: string;
  currentGradeId?: string;
  currentSex?: string;
  currentSearch?: string;
}

const StudentFilters = ({
  classes,
  grades,
  currentClassId,
  currentGradeId,
  currentSex,
  currentSearch,
}: StudentFiltersProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const activeCount = [currentClassId, currentGradeId, currentSex].filter(Boolean).length;

  const buildFilterUrl = ({
    classId = currentClassId,
    gradeId = currentGradeId,
    sex = currentSex,
  }: {
    classId?: string;
    gradeId?: string;
    sex?: string;
  }) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (classId) params.set("class_id", classId);
    if (gradeId) params.set("grade_id", gradeId);
    if (sex) params.set("sex", sex);
    const qs = params.toString();
    return qs ? `/list/students?${qs}` : "/list/students";
  };

  // When a grade is selected, narrow the class dropdown to that grade only
  const filteredClasses = currentGradeId
    ? classes.filter((c) => c.grade?.id === currentGradeId)
    : classes;

  const selectClass = "w-full px-3 py-2 pr-8 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none appearance-none cursor-pointer transition-colors";

  return (
    <div className="mt-4">
      {/* Header */}
      <div
        className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-t-xl cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Filter Students</h3>
            <p className="text-xs text-gray-500">
              {activeCount > 0
                ? `${activeCount} filter${activeCount > 1 ? "s" : ""} applied`
                : "Narrow down your results"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <Link
              href="/list/students"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </Link>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Body */}
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? "max-h-96" : "max-h-0"}`}>
        <div className="p-4 bg-white border-x border-b border-gray-200 rounded-b-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Grade */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <GraduationCap className="w-3.5 h-3.5" />
                Grade
              </label>
              <div className="relative">
                <select
                  value={currentGradeId || ""}
                  onChange={(e) => {
                    const gradeId = e.target.value || undefined;
                    // Clearing grade also clears class (class is grade-scoped)
                    router.push(buildFilterUrl({ gradeId, classId: undefined }));
                  }}
                  className={selectClass}
                >
                  <option value="">All Grades</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      Grade {g.level}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Class */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-xs font-medium text-gray-600">
                <Users className="w-3.5 h-3.5" />
                Class
              </label>
              <div className="relative">
                <select
                  value={currentClassId || ""}
                  onChange={(e) => {
                    const classId = e.target.value || undefined;
                    router.push(buildFilterUrl({ classId }));
                  }}
                  className={selectClass}
                >
                  <option value="">All Classes</option>
                  {filteredClasses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none">
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Sex */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Sex</label>
              <div className="relative">
                <select
                  value={currentSex || ""}
                  onChange={(e) => router.push(buildFilterUrl({ sex: e.target.value || undefined }))}
                  className={selectClass}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
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

export default StudentFilters;
