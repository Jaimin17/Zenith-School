import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import FormContainer from "@/components/FromAnother/FormContainer";
import ParentFilters from "@/components/FromAnother/ParentFilters";
import Image from "next/image";
import Link from "next/link";
import type { Parent, ParentWithRelations } from "@/types/schemas";
import { fetchParentsAction, fetchAllClassesAction, fetchFullGradeListAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { getParentImageUrl } from "@/utils/imageHelpers";
import { Eye, UserCircle, Users } from "lucide-react";
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
          <div className="hidden md:block w-20 h-4 bg-gray-200 rounded"></div>
          <div className="hidden md:block w-32 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const ParentListPage = async ({
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
  const classId = params.class_id || undefined;
  const gradeId = params.grade_id || undefined;

  const cookieStore = await cookies();
  const yearId = cookieStore.get("selected_year_id")?.value;

  const [gradesResult, classesResult] = await Promise.all([
    fetchFullGradeListAction(),
    fetchAllClassesAction(),
  ]);
  const grades = gradesResult.data ?? [];
  const classes = classesResult.data ?? [];

  const result = await fetchParentsAction(search, page, yearId, classId, gradeId);

  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error('Failed to fetch parents:', result.error);
  }

  const data: ParentWithRelations[] = result.data?.data || [];
  const count: number = result.totalCount || 0;

  const columns = [
    { header: "Info", accessor: "info" },
    {
      header: "Username",
      accessor: "username",
      className: "hidden md:table-cell",
    },
    {
      header: "Students",
      accessor: "students",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: ParentWithRelations) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={getParentImageUrl(item.address ? item.address : undefined)}
          alt={`${item.first_name} ${item.last_name}`}
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{item.first_name} {item.last_name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>

      <td className="hidden md:table-cell text-gray-600">{item.username}</td>
      
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-1.5 text-gray-600">
          <Users className="w-3.5 h-3.5 text-gray-400" />
          <span>
            {item.students && item.students.length > 0 
              ? `${item.students.length} student${item.students.length > 1 ? 's' : ''}`
              : "-"}
          </span>
        </div>
      </td>
      
      <td className="hidden lg:table-cell text-gray-600">{item.phone || "-"}</td>
      <td className="hidden lg:table-cell text-gray-600 max-w-[150px] truncate">{item.address || "-"}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/parents/${item.id}`}>
            <button 
              className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
          </Link>

          {role === "admin" && (
            <>
              <FormContainer table="parent" type="update" data={item} />
              <FormContainer table="parent" type="delete" id={item.id} />
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
          All Parents
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            {role === "admin" && (
              <FormContainer table="parent" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <ParentFilters
        grades={grades}
        classes={classes}
        currentGradeId={gradeId}
        currentClassId={classId}
        currentSearch={search}
      />

      {/* ERROR STATE */}
      {hasError ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Parents
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || 'Unable to load parents. Please try again later.'}
          </p>
        </div>
      ) : data.length === 0 ? (
        /* EMPTY STATE */
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <UserCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium mb-1">
            {search || classId || gradeId
              ? "No parents match the applied filters"
              : "No parents available"}
          </p>
          <p className="text-gray-500 text-sm">
            {role === "admin" 
              ? "Add your first parent to get started" 
              : "Check back later for registered parents"}
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

export default ParentListPage;