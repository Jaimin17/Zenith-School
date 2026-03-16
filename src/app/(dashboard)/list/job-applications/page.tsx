import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import type { JobApplication, ApplicationStatus } from "@/types/schemas";
import { fetchJobApplicationsAction, fetchJobOpeningsAction } from "@/actions/admin";
import { requireAuth } from "@/lib/auth/serverAuth";
import { ITEM_PER_PAGE } from "@/lib/settings";
import JobApplicationStatusSelect from "@/components/FromAnother/JobApplicationStatusSelect";
import { getResumeUrl } from "@/utils/imageHelpers";
import { FileText, ExternalLink, Filter } from "lucide-react";
import Link from "next/link";

const STATUS_FILTER_OPTIONS: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const JobApplicationsListPage = async ({
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
  const statusFilter = params.status || undefined;
  const openingFilter = params.opening_id || undefined;

  const [result, openingsResult] = await Promise.all([
    fetchJobApplicationsAction(search, page, openingFilter, statusFilter),
    fetchJobOpeningsAction(undefined, 1),
  ]);

  const data: JobApplication[] = result.data?.data || [];
  const count: number =
    result.totalCount || (result.data?.total_pages ? result.data.total_pages * ITEM_PER_PAGE : 0);

  // Build opening id → title map for filter dropdown
  const openings = openingsResult.data?.data || [];

  const columns = [
    { header: "Applicant", accessor: "applicant" },
    { header: "Position", accessor: "position", className: "hidden md:table-cell" },
    { header: "Contact", accessor: "contact", className: "hidden lg:table-cell" },
    { header: "Resume", accessor: "resume", className: "hidden md:table-cell" },
    { header: "Status", accessor: "status" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item: JobApplication) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      {/* Applicant */}
      <td className="p-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <span className="text-xs text-gray-400">
            Applied {new Date(item.created_at).toLocaleDateString()}
          </span>
        </div>
      </td>

      {/* Position applied for */}
      <td className="hidden md:table-cell p-4">
        <span className="text-gray-700 text-xs line-clamp-1">
          {(item as any).jobOpenings?.title || item.jobOpening_id}
        </span>
      </td>

      {/* Contact */}
      <td className="hidden lg:table-cell p-4">
        <div className="flex flex-col gap-0.5 text-xs text-gray-500">
          <span>{item.email}</span>
          <span>{item.phone}</span>
          <span>{item.location}</span>
        </div>
      </td>

      {/* Resume */}
      <td className="hidden md:table-cell p-4">
        {item.resume ? (
          <a
            href={getResumeUrl(item.resume)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            View Resume
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        )}
      </td>

      {/* Status */}
      <td className="p-4">
        <JobApplicationStatusSelect
          applicationId={item.id}
          currentStatus={item.status as ApplicationStatus}
        />
      </td>

      {/* Actions */}
      <td className="p-4">
        <FormContainer table="jobApplication" type="delete" id={item.id} />
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Job Applications</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />

        {/* Status filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTER_OPTIONS.map(({ label, value }) => {
            const isActive = (params.status || "") === value;
            const href = value
              ? `?status=${value}${openingFilter ? `&opening_id=${openingFilter}` : ""}`
              : `?${openingFilter ? `opening_id=${openingFilter}` : ""}`;
            return (
              <Link
                key={value}
                href={href}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Opening filter */}
        {openings.length > 0 && (
          <div className="flex flex-wrap gap-1.5 ml-2 border-l border-gray-200 pl-2">
            <Link
              href={`?${statusFilter ? `status=${statusFilter}` : ""}`}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                !openingFilter
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Positions
            </Link>
            {openings.map((o) => (
              <Link
                key={o.id}
                href={`?opening_id=${o.id}${statusFilter ? `&status=${statusFilter}` : ""}`}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  openingFilter === o.id
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {o.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      {!result.success && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{result.error || "Failed to load applications."}</p>
        </div>
      )}

      {result.success && data.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No applications found</p>
          <p className="text-gray-400 text-sm mt-1">Applications will appear here once submitted.</p>
        </div>
      ) : (
        <Table columns={columns} renderRow={renderRow} data={data} />
      )}

      <Pagination page={page} count={count} />
    </div>
  );
};

export default JobApplicationsListPage;
