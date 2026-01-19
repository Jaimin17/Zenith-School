import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type SubjectList = {
  id: number;
  name: string;
  teachers: {
    id: string;
    name: string;
    surname: string;
  }[];
};

// Static data for demonstration
const STATIC_SUBJECTS: SubjectList[] = [
  {
    id: 1,
    name: "Mathematics",
    teachers: [
      { id: "teacher1", name: "John", surname: "Smith" },
      { id: "teacher8", name: "Linda", surname: "Taylor" },
    ],
  },
  {
    id: 2,
    name: "Physics",
    teachers: [
      { id: "teacher2", name: "Sarah", surname: "Johnson" },
    ],
  },
  {
    id: 3,
    name: "Chemistry",
    teachers: [
      { id: "teacher3", name: "Michael", surname: "Brown" },
    ],
  },
  {
    id: 4,
    name: "English",
    teachers: [
      { id: "teacher4", name: "Emily", surname: "Davis" },
      { id: "teacher9", name: "James", surname: "Thomas" },
    ],
  },
  {
    id: 5,
    name: "Biology",
    teachers: [
      { id: "teacher5", name: "David", surname: "Wilson" },
    ],
  },
  {
    id: 6,
    name: "History",
    teachers: [
      { id: "teacher6", name: "Jessica", surname: "Martinez" },
      { id: "teacher11", name: "William", surname: "Rodriguez" },
    ],
  },
  {
    id: 7,
    name: "Computer Science",
    teachers: [
      { id: "teacher7", name: "Robert", surname: "Anderson" },
    ],
  },
  {
    id: 8,
    name: "Geography",
    teachers: [
      { id: "teacher10", name: "Mary", surname: "Garcia" },
    ],
  },
  {
    id: 9,
    name: "Physical Education",
    teachers: [
      { id: "teacher12", name: "Patricia", surname: "Miller" },
      { id: "teacher13", name: "Daniel", surname: "Moore" },
    ],
  },
  {
    id: 10,
    name: "Art",
    teachers: [
      { id: "teacher14", name: "Lisa", surname: "Jackson" },
    ],
  },
  {
    id: 11,
    name: "Music",
    teachers: [
      { id: "teacher15", name: "Christopher", surname: "White" },
    ],
  },
  {
    id: 12,
    name: "Economics",
    teachers: [
      { id: "teacher16", name: "Nancy", surname: "Harris" },
    ],
  },
];

const SubjectListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin";

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
    {
      header: "Actions",
      accessor: "action",
    },
  ];

  const renderRow = (item: SubjectList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">
        {item.teachers.map((teacher) => teacher.name).join(",")}
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

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // Filter data based on search query
  let filteredData = STATIC_SUBJECTS;

  if (queryParams.search) {
    filteredData = filteredData.filter((subject) =>
      subject.name.toLowerCase().includes(queryParams.search!.toLowerCase())
    );
  }

  // Pagination logic
  const count = filteredData.length;
  const startIndex = ITEM_PER_PAGE * (p - 1);
  const endIndex = startIndex + ITEM_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  // TODO: Replace with actual API call
  // const response = await fetch(`/api/subjects?page=${p}&search=${queryParams.search || ''}`);
  // const { data, count } = await response.json();

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
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
              <FormContainer table="subject" type="create" />
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

export default SubjectListPage;