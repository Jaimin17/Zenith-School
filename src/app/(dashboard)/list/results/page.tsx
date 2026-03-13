import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import FormContainer from "@/components/FromAnother/FormContainer";
import ResultFilters from "@/components/FromAnother/ResultFilters";
import Image from "next/image";
import type { ResultWithRelations } from "@/types/schemas";
import { fetchResultsAction, fetchClassesListAction, fetchExamListAction, fetchAssignmentsAction, fetchAllClassesAction, fetchResultsOfStudentAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import { Award, User, ClipboardList, FileText, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cookies } from "next/headers";

// Skeleton Component
const TableSkeleton = () => (
  <div>
    <div className="space-y-3 mt-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="hidden md:block w-24 h-4 bg-gray-200 rounded"></div>
          <div className="hidden md:block w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

// Get score badge color and icon
const getScoreBadge = (score: number) => {
  if (score >= 90) {
    return {
      bgColor: "bg-green-100",
      textColor: "text-green-700",
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      label: "Excellent",
    };
  } else if (score >= 70) {
    return {
      bgColor: "bg-blue-100",
      textColor: "text-blue-700",
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      label: "Good",
    };
  } else if (score >= 50) {
    return {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-700",
      icon: <Minus className="w-3.5 h-3.5" />,
      label: "Average",
    };
  } else {
    return {
      bgColor: "bg-red-100",
      textColor: "text-red-700",
      icon: <TrendingDown className="w-3.5 h-3.5" />,
      label: "Needs Improvement",
    };
  }
};

// Get result type
const getResultType = (item: ResultWithRelations) => {
  if (item.exam) return "exam";
  if (item.assignment) return "assignment";
  return "unknown";
};

const ResultsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const auth = await requireAuth();
  const role = auth.role;

  const allowedRoles = ["admin", "teacher", "student", "parent"];
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
  const classId = params.classId || undefined;
  const examId = params.examId || undefined;
  const assignmentId = params.assignmentId || undefined;
  const filterType = params.type || undefined;
  const studentId = params.studentId || undefined;

  const cookieStore = await cookies();
  const yearId = cookieStore.get("selected_year_id")?.value;

  // Fetch results and filter data in parallel
  const [classesResult, examsResult, assignmentsResult] = await Promise.all([
    role !== "student" ? fetchAllClassesAction() : Promise.resolve(null),
    fetchExamListAction(undefined, 1),
    fetchAssignmentsAction(undefined, 1),
  ]);

  let result;

  if (studentId) {
    result = await fetchResultsOfStudentAction(search, page, studentId, {
      classId,
      examId,
      assignmentId,
      type: filterType
    });
  } else {
    result = await fetchResultsAction(search, page, {
      classId,
      examId,
      assignmentId,
      type: filterType,
      yearId,
    });
  }

  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error("Failed to fetch results:", result.error);
  }

  let data: ResultWithRelations[] = result.data?.data || [];
  const originalCount: number = result.totalCount || 0;
  let count: number = originalCount;

  // Get filter data
  const classes = classesResult?.data || [];
  const exams = examsResult.data?.data || [];
  const assignments = assignmentsResult.data?.data || [];

  // Check if any filters are active
  const hasActiveFilters = classId || examId || assignmentId || filterType;

  const columns = [
    { header: "Student", accessor: "student" },
    {
      header: "Type",
      accessor: "type",
      className: "hidden md:table-cell",
    },
    {
      header: "Exam/Assignment",
      accessor: "examOrAssignment",
      className: "hidden md:table-cell",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden lg:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [{ header: "Actions", accessor: "action" }] : []),
  ];

  const renderRow = (item: ResultWithRelations) => {
    const scoreBadge = getScoreBadge(item.score);
    const resultType = getResultType(item);

    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            src={getStudentImageUrl(item.student?.img)}
            alt={`${item.student?.first_name} ${item.student?.last_name}`}
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {item.student?.first_name} {item.student?.last_name}
            </h3>
            <p className="text-xs text-gray-500">{item.student?.email}</p>
          </div>
        </td>

        <td className="hidden md:table-cell">
          <div className="flex items-center gap-1.5">
            {resultType === "exam" ? (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                <ClipboardList className="w-3 h-3" />
                Exam
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 flex items-center gap-1">
                <FileText className="w-3 h-3" />
                Assignment
              </span>
            )}
          </div>
        </td>

        <td className="hidden md:table-cell">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-gray-700">
              {item.exam?.title || item.assignment?.title || "-"}
            </span>
            {item.exam?.lesson && (
              <span className="text-xs text-gray-500">
                {item.exam.lesson.subject?.name} - {item.exam.lesson.related_class?.name}
              </span>
            )}
            {item.assignment?.lesson && (
              <span className="text-xs text-gray-500">
                {item.assignment.lesson.subject?.name} - {item.assignment.lesson.related_class?.name}
              </span>
            )}
          </div>
        </td>

        <td className="hidden lg:table-cell">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${scoreBadge.textColor}`}>
              {item.score}
            </span>
            <span className="text-xs text-gray-500">/100</span>
          </div>
        </td>

        <td className="hidden lg:table-cell">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${scoreBadge.bgColor} ${scoreBadge.textColor} flex items-center gap-1 w-fit`}>
            {scoreBadge.icon}
            {scoreBadge.label}
          </span>
        </td>

        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormContainer table="result" type="update" data={item} />
                <FormContainer table="result" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Results
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormContainer table="result" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <ResultFilters
        classes={classes}
        exams={exams}
        assignments={assignments}
        currentClassId={classId}
        currentExamId={examId}
        currentAssignmentId={assignmentId}
        currentType={filterType}
        currentSearch={search}
        studentId={studentId}
        role={role}
      />

      {/* ERROR STATE */}
      {hasError ? (
        <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Results
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || "Unable to load results. Please try again later."}
          </p>
        </div>
      ) : data.length === 0 ? (
        /* EMPTY STATE */
        <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-1">
            {search
              ? `No results found matching "${search}"`
              : hasActiveFilters
                ? "No results match your filters"
                : "No results available"}
          </p>
          <p className="text-gray-500 text-sm">
            {hasActiveFilters
              ? "Try adjusting your filters or clear them to see all results"
              : role === "admin"
                ? "Add your first result to get started"
                : "Check back later for new results"}
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

export default ResultsPage;