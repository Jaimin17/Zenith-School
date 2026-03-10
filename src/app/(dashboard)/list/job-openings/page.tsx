import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import type { JobOpening } from "@/types/schemas";
import { fetchJobOpeningsAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import { ITEM_PER_PAGE } from "@/lib/settings";
import JobOpeningActiveToggle from "@/components/FromAnother/JobOpeningActiveToggle";
import { Briefcase, MapPin, Calendar, Users } from "lucide-react";

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: "Full Time",
  part_time: "Part Time",
  contract: "Contract",
  internship: "Internship",
};

const JOB_TYPE_COLORS: Record<string, string> = {
  full_time: "bg-blue-100 text-blue-700",
  part_time: "bg-purple-100 text-purple-700",
  contract: "bg-orange-100 text-orange-700",
  internship: "bg-teal-100 text-teal-700",
};

const TableSkeleton = () => (
  <div className="space-y-3 mt-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-4 p-4 border-b border-gray-200 animate-pulse">
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="hidden md:block w-24 h-4 bg-gray-200 rounded" />
        <div className="w-16 h-4 bg-gray-200 rounded" />
      </div>
    ))}
  </div>
);

const JobOpeningsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const auth = await requireAuth();
  const role = auth.role;

  if (role !== "admin") {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Access Denied</h2>
          <p className="text-red-600 text-sm">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search || undefined;

  const result = await fetchJobOpeningsAction(search, page);
  const data: JobOpening[] = result.data?.data || [];
  const count: number =
    result.totalCount || (result.data?.total_pages ? result.data.total_pages * ITEM_PER_PAGE : 0);

  const columns = [
    { header: "Job Opening", accessor: "opening" },
    { header: "Type", accessor: "type", className: "hidden md:table-cell" },
    { header: "Details", accessor: "details", className: "hidden lg:table-cell" },
    { header: "Status", accessor: "status", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item: JobOpening) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Job Opening title + deadline */}
      <td className="p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
          {item.deadline && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              Deadline: {new Date(item.deadline).toLocaleDateString()}
            </span>
          )}
        </div>
      </td>

      {/* Job Type */}
      <td className="hidden md:table-cell p-4">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
            JOB_TYPE_COLORS[item.job_type] || "bg-gray-100 text-gray-600"
          }`}
        >
          <Briefcase className="w-3 h-3" />
          {JOB_TYPE_LABELS[item.job_type] || item.job_type}
        </span>
      </td>

      {/* Details: positions, location */}
      <td className="hidden lg:table-cell p-4">
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {item.positions} position{item.positions !== 1 ? "s" : ""} · {item.experience}yr exp
          </span>
          {item.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {item.location}
            </span>
          )}
          {item.salary_range && (
            <span className="text-green-600 font-medium">{item.salary_range}</span>
          )}
        </div>
      </td>

      {/* Status toggle */}
      <td className="hidden md:table-cell p-4">
        <JobOpeningActiveToggle openingId={item.id} isActive={item.is_active} />
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center gap-2">
          <FormContainer table="jobOpening" type="update" data={item} />
          <FormContainer table="jobOpening" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Job Openings</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <FormContainer table="jobOpening" type="create" />
          </div>
        </div>
      </div>

      {!result.success && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{result.error || "Failed to load job openings."}</p>
        </div>
      )}

      {result.success && data.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No job openings found</p>
          <p className="text-gray-400 text-sm mt-1">Create your first job opening to get started.</p>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={data} />
      )}

      <Pagination page={page} count={count} />
    </div>
  );
};

export default JobOpeningsListPage;
