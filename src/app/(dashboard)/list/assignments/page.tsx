import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import FormContainer from "@/components/FromAnother/FormContainer";
import AssignmentFilters from "@/components/FromAnother/AssignmentFilters";
import type { AssignmentWithRelations } from "@/types/schemas";
import { fetchAssignmentsAction, fetchTeachersListAction, fetchSubjectFullListAction, fetchAnnouncementsOfTeacherAction, fetchAssignmentsOfTeacherAction, fetchAssignmentsOfClassAction, fetchAssignmentsOfStudentAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { FileText, Calendar, BookOpen, User, Clock } from "lucide-react";

// Skeleton Component
const TableSkeleton = () => (
  <div className="animate-pulse">
    <div className="space-y-3 mt-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="hidden md:block w-24 h-4 bg-gray-200 rounded"></div>
          <div className="hidden md:block w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// Format date helper
const formatDate = (dateStr: string) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Check if assignment is overdue
const isOverdue = (dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
};

// Get status badge
const getStatusBadge = (startDate: string, dueDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  const due = new Date(dueDate);

  if (due < today) {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
        Overdue
      </span>
    );
  } else if (start > today) {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
        Upcoming
      </span>
    );
  } else {
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
        Active
      </span>
    );
  }
};

const AssignmentsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const auth = await requireAuth();
  const role = auth.role;

  const allowedRoles = ["admin", "teacher"];
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
  const subjectId = params.subjectId || undefined;
  const filterTeacherId = params.filterTeacherId || undefined;
  const status = params.status || undefined;
  const filterDate = params.date || undefined;
  const teacherId = params.teacherId || undefined;
  const classId = params.classId || undefined;
  const studentId = params.studentId || undefined;

  // Fetch assignments, teachers, and subjects in parallel
  const [teachersResult, subjectsResult] = await Promise.all([
    fetchTeachersListAction(undefined, 1),
    fetchSubjectFullListAction(),
  ]);

  let result;

  if (teacherId) {
    result = await fetchAssignmentsOfTeacherAction(teacherId, search, page, subjectId, status, filterDate);
  } else if (classId) {
    result = await fetchAssignmentsOfClassAction(classId, search, page, subjectId, filterTeacherId, status, filterDate);
  } else if (studentId) {
    result = await fetchAssignmentsOfStudentAction(studentId, search, page, subjectId, filterTeacherId, status, filterDate);
  } else {
    result = await fetchAssignmentsAction(search, page, subjectId, filterTeacherId, status, filterDate);
  }

  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error("Failed to fetch assignments:", result.error);
  }

  let data: AssignmentWithRelations[] = result.data?.data || [];
  let count: number = result.totalCount || 0;

  // Get teachers and subjects for filters
  const teachers = teachersResult.data || [];
  const subjects = subjectsResult.data || [];

  // Check if any filters are active
  const hasActiveFilters = subjectId || filterTeacherId || status || filterDate;

  const columns = [
    { header: "Assignment", accessor: "assignment" },
    {
      header: "Lesson",
      accessor: "lesson",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Date",
      accessor: "startDate",
      className: "hidden md:table-cell",
    },
    {
      header: "Due Date",
      accessor: "dueDate",
      className: "hidden lg:table-cell",
    },
    {
      header: "Status",
      accessor: "status",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: AssignmentWithRelations) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isOverdue(item.due_date) ? "bg-red-100" : "bg-gray-100"
          }`}>
          <FileText className={`w-5 h-5 ${isOverdue(item.due_date) ? "text-red-500" : "text-gray-500"
            }`} />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          {item.pdf_name && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {item.pdf_name}
            </p>
          )}
        </div>
      </td>

      <td className="hidden md:table-cell">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-gray-700">
            <BookOpen className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-medium">{item.lesson?.name || "-"}</span>
          </div>
          {item.lesson?.teacher && (
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <User className="w-3 h-3 text-gray-400" />
              <span>
                {item.lesson.teacher.first_name} {item.lesson.teacher.last_name}
              </span>
            </div>
          )}
        </div>
      </td>

      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>{formatDate(item.start_date)}</span>
        </div>
      </td>

      <td className="hidden lg:table-cell">
        <div className={`flex items-center gap-1.5 ${isOverdue(item.due_date) ? "text-red-600" : "text-gray-600"
          }`}>
          <Clock className={`w-3.5 h-3.5 ${isOverdue(item.due_date) ? "text-red-400" : "text-gray-400"
            }`} />
          <span>{formatDate(item.due_date)}</span>
        </div>
      </td>

      <td className="hidden lg:table-cell">
        {getStatusBadge(item.start_date, item.due_date)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="assignment" type="update" data={item} />
              <FormContainer table="assignment" type="delete" id={item.id} />
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
          All Assignments
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormContainer table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <AssignmentFilters
        subjects={subjects}
        teachers={teachers}
        currentSubjectId={subjectId}
        currentTeacherId={filterTeacherId}
        currentStatus={status}
        currentDate={filterDate}
        currentSearch={search}
        teacherId={teacherId}
        classId={classId}
        studentId={studentId}
      />

      {/* ERROR STATE */}
      {hasError ? (
        <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Assignments
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || "Unable to load assignments. Please try again later."}
          </p>
        </div>
      ) : data.length === 0 ? (
        /* EMPTY STATE */
        <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-1">
            {search
              ? `No assignments found matching "${search}"`
              : hasActiveFilters
                ? "No assignments match your filters"
                : "No assignments available"}
          </p>
          <p className="text-gray-500 text-sm">
            {hasActiveFilters
              ? "Try adjusting your filters or clear them to see all assignments"
              : role === "admin"
                ? "Create your first assignment to get started"
                : "Check back later for new assignments"}
          </p>
        </div>
      ) : (
        /* LIST */
        <Suspense fallback={<TableSkeleton />}>
          <Table columns={columns} renderRow={renderRow} data={data} />
        </Suspense>
      )}

      {/* PAGINATION */}
      {!hasError && count > 0 && <Pagination page={page} count={count} />}
    </div>
  );
};

export default AssignmentsPage;