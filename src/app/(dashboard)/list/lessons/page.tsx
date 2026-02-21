import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import FormContainer from "@/components/FromAnother/FormContainer";
import type { Lesson } from "@/types/schemas";
import { fetchLessonsAction, fetchLessonsForClassAction, fetchLessonsForTeacherAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { BookOpen, Clock, Users, User } from "lucide-react";

// Helper function to format time
const formatTime = (timeString: string): string => {
  if (!timeString) return "-";
  try {
    // Handle time string format (HH:MM:SS or HH:MM)
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  } catch {
    return timeString;
  }
};

// Day badge colors
const getDayColor = (day: string): string => {
  const colors: Record<string, string> = {
    'MONDAY': 'bg-blue-100 text-blue-700',
    'TUESDAY': 'bg-purple-100 text-purple-700',
    'WEDNESDAY': 'bg-green-100 text-green-700',
    'THURSDAY': 'bg-amber-100 text-amber-700',
    'FRIDAY': 'bg-pink-100 text-pink-700',
    'SATURDAY': 'bg-cyan-100 text-cyan-700',
    'SUNDAY': 'bg-red-100 text-red-700',
  };
  return colors[day?.toUpperCase()] || 'bg-gray-100 text-gray-700';
};

// Skeleton Component
const TableSkeleton = () => (
  <div>
    <div className="space-y-3 mt-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="hidden md:block w-20 h-4 bg-gray-200 rounded"></div>
          <div className="hidden md:block w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const LessonListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const auth = await requireAuth();
  const role = auth.role;

  const allowedRoles = ['admin', 'teacher'];
  if (role && !allowedRoles.includes(role)) {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Access Denied
          </h2>
          <p className="text-red-600 text-sm">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search || undefined;
  const teacherId = params.teacherId || undefined;
  const classId = params.classId || undefined;

  let result;

  if(teacherId){
    result = await fetchLessonsForTeacherAction(teacherId, search, page);
  } else if (classId) {
    result = await fetchLessonsForClassAction(classId, search, page);
  } else {
    result = await fetchLessonsAction(search, page);
  }

  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error('Failed to fetch lessons:', result.error);
  }

  const data: Lesson[] = result.data?.data || [];
  const count: number = result.totalCount || 0;

  const columns = [
    { header: "Lesson", accessor: "lesson" },
    {
      header: "Day",
      accessor: "day",
      className: "hidden sm:table-cell",
    },
    {
      header: "Time",
      accessor: "time",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: Lesson) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purple-50 transition-colors"
    >
      {/* Lesson Info */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {item.name || item.subject?.name || "Unnamed Lesson"}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {item.subject?.name || "-"}
            </p>
          </div>
        </div>
      </td>

      {/* Day */}
      <td className="hidden sm:table-cell">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDayColor(item.day)}`}>
          {item.day ? item.day.charAt(0) + item.day.slice(1).toLowerCase() : "-"}
        </span>
      </td>

      {/* Time */}
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Clock className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-xs">
            {formatTime(item.start_time)} - {formatTime(item.end_time)}
          </span>
        </div>
      </td>

      {/* Class */}
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span>{item.related_class?.name || "-"}</span>
        </div>
      </td>

      {/* Teacher */}
      <td className="hidden lg:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <User className="w-3.5 h-3.5 text-gray-400" />
          <span className="truncate max-w-[150px]">
            {item.teacher ? `${item.teacher.first_name} ${item.teacher.last_name}` : "-"}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="lesson" type="update" data={item} />
              <FormContainer table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Lessons
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormContainer table="lesson" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* ERROR STATE */}
      {hasError ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Lessons
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || 'Unable to load lessons. Please try again later.'}
          </p>
        </div>
      ) : data.length === 0 ? (
        /* EMPTY STATE */
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-1">
            {search 
              ? `No lessons found matching "${search}"` 
              : 'No lessons available'}
          </p>
          <p className="text-gray-500 text-sm">
            {role === "admin" 
              ? "Create your first lesson to get started" 
              : "Check back later for scheduled lessons"}
          </p>
        </div>
      ) : (
        /* LIST */
        <Suspense fallback={<TableSkeleton />}>
          <Table columns={columns} renderRow={renderRow} data={data} />
        </Suspense>
      )}

      {/* PAGINATION */}
      {!hasError && count > 0 && (
        <Pagination page={page} count={count} />
      )}
    </div>
  );
};

export default LessonListPage;