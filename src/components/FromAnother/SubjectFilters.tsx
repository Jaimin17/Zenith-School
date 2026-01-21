"use client";

import { useRouter } from "next/navigation";
import { SlidersHorizontal, Users, ChevronDown, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SubjectFiltersProps {
  teachers: { id: string; first_name: string; last_name: string }[];
  currentTeacherId?: string;
  currentSearch?: string;
}

const SubjectFilters = ({
  teachers,
  currentTeacherId,
  currentSearch,
}: SubjectFiltersProps) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = !!currentTeacherId;

  // Build filter URL helper
  const buildFilterUrl = (newTeacherId?: string) => {
    const params = new URLSearchParams();
    if (currentSearch) params.set("search", currentSearch);
    if (newTeacherId) params.set("teacherId", newTeacherId);
    const queryString = params.toString();
    return queryString ? `/list/subjects?${queryString}` : "/list/subjects";
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeacherId = e.target.value || undefined;
    router.push(buildFilterUrl(newTeacherId));
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
            <h3 className="text-sm font-semibold text-gray-800">Filter Subjects</h3>
            <p className="text-xs text-gray-500">
              {hasActiveFilters 
                ? '1 filter applied' 
                : 'Narrow down your results'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Link
              href="/list/subjects"
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
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <div className="p-4 bg-white border-x border-b border-gray-200 rounded-b-xl">
          <div className="max-w-md">
            {/* Teacher Filter */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectFilters;
