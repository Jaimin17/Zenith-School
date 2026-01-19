import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type ClassList = {
  id: number;
  name: string;
  capacity: number;
  supervisorId: string;
  gradeId: number;
  supervisor: {
    id: string;
    name: string;
    surname: string;
  };
};

// Static data for demonstration
const STATIC_CLASSES: ClassList[] = [
  {
    id: 1,
    name: "1A",
    capacity: 30,
    supervisorId: "teacher1",
    gradeId: 1,
    supervisor: { id: "teacher1", name: "John", surname: "Smith" },
  },
  {
    id: 2,
    name: "1B",
    capacity: 28,
    supervisorId: "teacher2",
    gradeId: 1,
    supervisor: { id: "teacher2", name: "Sarah", surname: "Johnson" },
  },
  {
    id: 3,
    name: "2A",
    capacity: 32,
    supervisorId: "teacher3",
    gradeId: 2,
    supervisor: { id: "teacher3", name: "Michael", surname: "Brown" },
  },
  {
    id: 4,
    name: "2B",
    capacity: 30,
    supervisorId: "teacher4",
    gradeId: 2,
    supervisor: { id: "teacher4", name: "Emily", surname: "Davis" },
  },
  {
    id: 5,
    name: "3A",
    capacity: 35,
    supervisorId: "teacher5",
    gradeId: 3,
    supervisor: { id: "teacher5", name: "David", surname: "Wilson" },
  },
  {
    id: 6,
    name: "3B",
    capacity: 33,
    supervisorId: "teacher6",
    gradeId: 3,
    supervisor: { id: "teacher6", name: "Jessica", surname: "Martinez" },
  },
  {
    id: 7,
    name: "4A",
    capacity: 30,
    supervisorId: "teacher7",
    gradeId: 4,
    supervisor: { id: "teacher7", name: "Robert", surname: "Anderson" },
  },
  {
    id: 8,
    name: "4B",
    capacity: 29,
    supervisorId: "teacher8",
    gradeId: 4,
    supervisor: { id: "teacher8", name: "Linda", surname: "Taylor" },
  },
  {
    id: 9,
    name: "5A",
    capacity: 32,
    supervisorId: "teacher9",
    gradeId: 5,
    supervisor: { id: "teacher9", name: "James", surname: "Thomas" },
  },
  {
    id: 10,
    name: "5B",
    capacity: 31,
    supervisorId: "teacher10",
    gradeId: 5,
    supervisor: { id: "teacher10", name: "Mary", surname: "Garcia" },
  },
  {
    id: 11,
    name: "6A",
    capacity: 28,
    supervisorId: "teacher11",
    gradeId: 6,
    supervisor: { id: "teacher11", name: "William", surname: "Rodriguez" },
  },
  {
    id: 12,
    name: "6B",
    capacity: 30,
    supervisorId: "teacher12",
    gradeId: 6,
    supervisor: { id: "teacher12", name: "Patricia", surname: "Miller" },
  },
];

const ClassListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin";

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
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

  const renderRow = (item: ClassList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">
        {item.supervisor.name + " " + item.supervisor.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="class" type="update" data={item} />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // Filter data based on query params
  let filteredData = STATIC_CLASSES;

  if (queryParams.search) {
    filteredData = filteredData.filter((classItem) =>
      classItem.name.toLowerCase().includes(queryParams.search!.toLowerCase())
    );
  }

  if (queryParams.supervisorId) {
    filteredData = filteredData.filter(
      (classItem) => classItem.supervisorId === queryParams.supervisorId
    );
  }

  // Pagination logic
  const count = filteredData.length;
  const startIndex = ITEM_PER_PAGE * (p - 1);
  const endIndex = startIndex + ITEM_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  // TODO: Replace with actual API call
  // const response = await fetch(
  //   `/api/classes?page=${p}&search=${queryParams.search || ''}&supervisorId=${queryParams.supervisorId || ''}`
  // );
  // const { data, count } = await response.json();

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="class" type="create" />}
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

export default ClassListPage;