import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type AnnouncementList = {
  id: number;
  title: string;
  date: Date;
  classId: number | null;
  class: {
    id: number;
    name: string;
  } | null;
};

// Static data for demonstration
const STATIC_ANNOUNCEMENTS: AnnouncementList[] = [
  {
    id: 1,
    title: "Important: Exam Schedule Released",
    date: new Date("2024-01-15"),
    classId: 1,
    class: { id: 1, name: "Class 10A" },
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting - Next Week",
    date: new Date("2024-01-18"),
    classId: 2,
    class: { id: 2, name: "Class 9B" },
  },
  {
    id: 3,
    title: "School Holiday - Republic Day",
    date: new Date("2024-01-26"),
    classId: null,
    class: null,
  },
  {
    id: 4,
    title: "Science Fair Registration Open",
    date: new Date("2024-01-20"),
    classId: 3,
    class: { id: 3, name: "Class 11C" },
  },
  {
    id: 5,
    title: "Sports Day Announcement",
    date: new Date("2024-02-05"),
    classId: null,
    class: null,
  },
];

const AnnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin";
  const currentUserId = "admin1";

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: AnnouncementList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.date)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="announcement" type="update" data={item} />
              <FormContainer table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // Filter data based on search query
  let filteredData = STATIC_ANNOUNCEMENTS;

  if (queryParams.search) {
    filteredData = filteredData.filter((announcement) =>
      announcement.title
        .toLowerCase()
        .includes(queryParams.search!.toLowerCase())
    );
  }

  // Pagination logic
  const count = filteredData.length;
  const startIndex = ITEM_PER_PAGE * (p - 1);
  const endIndex = startIndex + ITEM_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  // TODO: Replace with actual API call
  // const response = await fetch(`/api/announcements?page=${p}&search=${queryParams.search || ''}`);
  // const { data, count } = await response.json();

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
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
            {role === "admin" && (
              <FormContainer table="announcement" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AnnouncementListPage;