import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import Image from "next/image";
import type { Testimonial } from "@/types/schemas";
import { fetchTestimonialsAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import TestimonialActiveToggle from "@/components/FromAnother/TestimonialActiveToggle";

const TableSkeleton = () => (
  <div>
    <div className="space-y-3 mt-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="hidden md:block w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const renderStars = (rating: number) => {
  const rounded = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`${star <= rounded ? "fas fa-star text-amber-400" : "far fa-star text-gray-300"}`}
        />
      ))}
      <span className="ml-2 text-xs text-gray-500">{(rating ?? 0).toFixed(1)}</span>
    </div>
  );
};

const TestimonialListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;

  const auth = await requireAuth();
  const role = auth.role;
  const userId = auth.userId;

  if (role !== "admin" && role !== "student") {
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

  const result = await fetchTestimonialsAction(search, page);
  const hasError = !result.success || !result.data;
  const allData: Testimonial[] = result.data?.data || [];

  // Students only see their own testimonial; admins see everything
  const data: Testimonial[] =
    role === "student"
      ? allData.filter((item) => item.student?.id === userId)
      : allData;

  const count: number =
    role === "student" ? data.length : result.totalCount || 0;

  // A student may only have ONE testimonial
  const studentHasTestimonial =
    role === "student" && data.length > 0;

  const columns = [
    { header: "Testimonial", accessor: "testimonial" },
    { header: "Rating", accessor: "rating", className: "hidden md:table-cell" },
    { header: "Status", accessor: "status", className: "hidden md:table-cell" },
    { header: "Actions", accessor: "action" },
  ];

  const renderRow = (item: Testimonial) => {
    const ownerId = item.student?.id;
    const canStudentEdit = role === "student" && ownerId === userId;

    return (
      <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className="p-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-gray-900">
              {item.student.username || `${item.student.first_name || ""} ${item.student.last_name || ""}`.trim() || "Student"}
            </h3>
            <p className="text-gray-600 line-clamp-2">{item.description}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{renderStars(item.rating || 0)}</td>
        <td className="hidden md:table-cell">
          {role === "admin" ? (
            <TestimonialActiveToggle testimonialId={item.id} isActive={item.is_active} />
          ) : (
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                item.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.is_active ? "Active" : "Inactive"}
            </span>
          )}
        </td>
        <td>
          <div className="flex items-center gap-2">
            {role === "student" && canStudentEdit && (
              <FormContainer table="testimonial" type="update" data={item} />
            )}
            {role === "admin" && <FormContainer table="testimonial" type="delete" id={item.id} />}
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Testimonials</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "student" && !studentHasTestimonial && (
              <FormContainer table="testimonial" type="create" />
            )}
          </div>
        </div>
      </div>

      {hasError ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">Error Loading Testimonials</h2>
          <p className="text-red-600 text-sm">
            {result.error || "Unable to load testimonials. Please try again later."}
          </p>
        </div>
      ) : data.length === 0 ? (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <p className="text-gray-600">
            {search
              ? `No testimonials found matching "${search}"`
              : "No testimonials available yet."}
          </p>
        </div>
      ) : (
        <Suspense fallback={<TableSkeleton />}>
          <Table columns={columns} renderRow={renderRow} data={data} />
        </Suspense>
      )}

      {!hasError && count > 0 && <Pagination page={page} count={count} />}
    </div>
  );
};

export default TestimonialListPage;
