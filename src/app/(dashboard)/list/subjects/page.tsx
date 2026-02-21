import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import SubjectFilters from "@/components/FromAnother/SubjectFilters";
import type { SubjectWithRelations } from "@/types/schemas";
import { fetchFullTeachersListAction, fetchSubjectFullListAction, fetchSubjectListAction, fetchTeachersListAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { BookOpen, Users } from "lucide-react";

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
          <div className="hidden md:block w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const SubjectListPage = async ({
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

  // Fetch subjects and teachers in parallel
  const [result, teachersResult] = await Promise.all([
    fetchSubjectListAction(search, page),
    fetchFullTeachersListAction()
  ]);

  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error('Failed to fetch subjects:', result.error);
  }

  let data: SubjectWithRelations[] = result.data?.data || [];
  let count: number = result.totalCount || 0;

  // Get teachers for filter
  const teachers = teachersResult.data || [];

  // Filter by teacher (client-side since API doesn't support it)
  if (teacherId && data.length > 0) {
    data = data.filter(subject => 
      subject.teachers?.some(t => t.id === teacherId)
    );
    count = data.length;
  }

  const columns = [
    {
      header: "Subject Name",
      accessor: "name",
    },
    {
      header: "Teachers",
      accessor: "teachers",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: SubjectWithRelations) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-gray-500" />
        </div>
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span>
            {item.teachers && item.teachers.length > 0
              ? item.teachers.map((t) => `${t.first_name} ${t.last_name}`).join(", ")
              : "-"}
          </span>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="subject" type="update" data={item} />
              <FormContainer table="subject" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  // Check if any filters are active
  const hasActiveFilters = !!teacherId;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormContainer table="subject" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <SubjectFilters
        teachers={teachers}
        currentTeacherId={teacherId}
      />

      {/* ERROR STATE */}
      {hasError ? (
        <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Subjects
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || 'Unable to load subjects. Please try again later.'}
          </p>
        </div>
      ) : data.length === 0 ? (
        /* EMPTY STATE */
        <div className="mt-4 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-1">
            {search 
              ? `No subjects found matching "${search}"` 
              : hasActiveFilters
                ? 'No subjects match your filters'
                : 'No subjects available'}
          </p>
          <p className="text-gray-500 text-sm">
            {hasActiveFilters
              ? "Try adjusting your filters or clear them to see all subjects"
              : role === "admin" 
                ? "Create your first subject to get started" 
                : "Check back later for available subjects"}
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

export default SubjectListPage;