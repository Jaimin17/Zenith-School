import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import Image from "next/image";
import type { Achievement } from "@/types/schemas";
import { fetchAchievementsAction } from "@/actions/admin";
import { Suspense } from "react";
import { requireAuth } from "@/lib/auth/serverAuth";
import { ImageIcon } from "lucide-react";
import { getAchievementImageUrl } from "@/utils/imageHelpers";
import AchievementActiveToggle from "@/components/FromAnother/AchievementActiveToggle";

const TableSkeleton = () => (
  <div>
    <div className="space-y-3 mt-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 p-4 border-b border-gray-200">
          <div className="w-20 h-14 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="hidden md:block w-24 h-4 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const AchievementListPage = async ({
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

  const result = await fetchAchievementsAction(search, page);
  const hasError = !result.success || !result.data;

  if (hasError) {
    console.error("Failed to fetch achievements:", result.error);
  }

  const data: Achievement[] = result.data?.data || [];
  const count: number = result.totalCount || 0;

  const columns = [
    {
      header: "Achievement",
      accessor: "achievement",
    },
    {
      header: "Description",
      accessor: "description",
      className: "hidden md:table-cell",
    },
    {
      header: "Status",
      accessor: "status",
      className: "hidden md:table-cell",
    },
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: Achievement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.img ? (
          <img
            src={getAchievementImageUrl(item.img)}
            alt={item.title}
            className="w-20 h-14 object-cover rounded-md"
          />
        ) : (
          <div className="w-20 h-14 bg-gray-100 rounded-md flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-gray-400" />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <span className="text-gray-600 line-clamp-2">{item.description}</span>
      </td>
      <td className="hidden md:table-cell">
        <AchievementActiveToggle achievementId={item.id} isActive={item.is_active} />
      </td>
      <td>
        <div className="flex items-center gap-2">
          <FormContainer table="achievement" type="update" data={item} />
          <FormContainer table="achievement" type="delete" id={item.id} />
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Achievements
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>

            <FormContainer table="achievement" type="create" />
          </div>
        </div>
      </div>

      {hasError ? (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Error Loading Achievements
          </h2>
          <p className="text-red-600 text-sm">
            {result.error || "Unable to load achievements. Please try again later."}
          </p>
        </div>
      ) : data.length === 0 ? (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-md text-center">
          <p className="text-gray-600">
            {search
              ? `No achievements found matching "${search}"`
              : "No achievements available. Create your first achievement!"}
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

export default AchievementListPage;
