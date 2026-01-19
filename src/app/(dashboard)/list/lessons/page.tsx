import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type LessonList = {
  id: number;
  name: string;
  day: string;
  startTime: Date;
  endTime: Date;
  subjectId: number;
  classId: number;
  teacherId: string;
  subject: {
    id: number;
    name: string;
  };
  class: {
    id: number;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
    surname: string;
  };
};

// Static data for demonstration
const STATIC_LESSONS: LessonList[] = [
  {
    id: 1,
    name: "Mathematics - Algebra",
    day: "MONDAY",
    startTime: new Date("2024-01-01T09:00:00"),
    endTime: new Date("2024-01-01T10:00:00"),
    subjectId: 1,
    classId: 1,
    teacherId: "teacher1",
    subject: { id: 1, name: "Mathematics" },
    class: { id: 1, name: "Class 10A" },
    teacher: { id: "teacher1", name: "John", surname: "Smith" },
  },
  {
    id: 2,
    name: "Physics - Mechanics",
    day: "TUESDAY",
    startTime: new Date("2024-01-01T10:00:00"),
    endTime: new Date("2024-01-01T11:00:00"),
    subjectId: 2,
    classId: 2,
    teacherId: "teacher2",
    subject: { id: 2, name: "Physics" },
    class: { id: 2, name: "Class 11B" },
    teacher: { id: "teacher2", name: "Sarah", surname: "Johnson" },
  },
  {
    id: 3,
    name: "Chemistry - Organic",
    day: "WEDNESDAY",
    startTime: new Date("2024-01-01T11:00:00"),
    endTime: new Date("2024-01-01T12:00:00"),
    subjectId: 3,
    classId: 3,
    teacherId: "teacher3",
    subject: { id: 3, name: "Chemistry" },
    class: { id: 3, name: "Class 12C" },
    teacher: { id: "teacher3", name: "Michael", surname: "Brown" },
  },
  {
    id: 4,
    name: "English - Literature",
    day: "MONDAY",
    startTime: new Date("2024-01-01T13:00:00"),
    endTime: new Date("2024-01-01T14:00:00"),
    subjectId: 4,
    classId: 1,
    teacherId: "teacher4",
    subject: { id: 4, name: "English" },
    class: { id: 1, name: "Class 10A" },
    teacher: { id: "teacher4", name: "Emily", surname: "Davis" },
  },
  {
    id: 5,
    name: "Biology - Genetics",
    day: "THURSDAY",
    startTime: new Date("2024-01-01T09:00:00"),
    endTime: new Date("2024-01-01T10:00:00"),
    subjectId: 5,
    classId: 4,
    teacherId: "teacher5",
    subject: { id: 5, name: "Biology" },
    class: { id: 4, name: "Class 9A" },
    teacher: { id: "teacher5", name: "David", surname: "Wilson" },
  },
  {
    id: 6,
    name: "History - World Wars",
    day: "FRIDAY",
    startTime: new Date("2024-01-01T14:00:00"),
    endTime: new Date("2024-01-01T15:00:00"),
    subjectId: 6,
    classId: 2,
    teacherId: "teacher6",
    subject: { id: 6, name: "History" },
    class: { id: 2, name: "Class 11B" },
    teacher: { id: "teacher6", name: "Jessica", surname: "Martinez" },
  },
  {
    id: 7,
    name: "Computer Science - Programming",
    day: "TUESDAY",
    startTime: new Date("2024-01-01T15:00:00"),
    endTime: new Date("2024-01-01T16:00:00"),
    subjectId: 7,
    classId: 3,
    teacherId: "teacher7",
    subject: { id: 7, name: "Computer Science" },
    class: { id: 3, name: "Class 12C" },
    teacher: { id: "teacher7", name: "Robert", surname: "Anderson" },
  },
  {
    id: 8,
    name: "Mathematics - Geometry",
    day: "WEDNESDAY",
    startTime: new Date("2024-01-01T10:00:00"),
    endTime: new Date("2024-01-01T11:00:00"),
    subjectId: 1,
    classId: 4,
    teacherId: "teacher1",
    subject: { id: 1, name: "Mathematics" },
    class: { id: 4, name: "Class 9A" },
    teacher: { id: "teacher1", name: "John", surname: "Smith" },
  },
  {
    id: 9,
    name: "English - Grammar",
    day: "THURSDAY",
    startTime: new Date("2024-01-01T11:00:00"),
    endTime: new Date("2024-01-01T12:00:00"),
    subjectId: 4,
    classId: 2,
    teacherId: "teacher4",
    subject: { id: 4, name: "English" },
    class: { id: 2, name: "Class 11B" },
    teacher: { id: "teacher4", name: "Emily", surname: "Davis" },
  },
  {
    id: 10,
    name: "Physics - Electricity",
    day: "FRIDAY",
    startTime: new Date("2024-01-01T09:00:00"),
    endTime: new Date("2024-01-01T10:00:00"),
    subjectId: 2,
    classId: 1,
    teacherId: "teacher2",
    subject: { id: 2, name: "Physics" },
    class: { id: 1, name: "Class 10A" },
    teacher: { id: "teacher2", name: "Sarah", surname: "Johnson" },
  },
];

const LessonListPage = async ({
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
      header: "Class",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
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

  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {item.teacher.name + " " + item.teacher.surname}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="lesson" type="update" data={item} />
              <FormContainer table="lesson" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // Filter data based on query params
  let filteredData = STATIC_LESSONS;

  if (queryParams.search) {
    const searchLower = queryParams.search.toLowerCase();
    filteredData = filteredData.filter(
      (lesson) =>
        lesson.subject.name.toLowerCase().includes(searchLower) ||
        lesson.teacher.name.toLowerCase().includes(searchLower) ||
        lesson.teacher.surname.toLowerCase().includes(searchLower)
    );
  }

  if (queryParams.classId) {
    filteredData = filteredData.filter(
      (lesson) => lesson.classId === parseInt(queryParams.classId!)
    );
  }

  if (queryParams.teacherId) {
    filteredData = filteredData.filter(
      (lesson) => lesson.teacherId === queryParams.teacherId
    );
  }

  // Pagination logic
  const count = filteredData.length;
  const startIndex = ITEM_PER_PAGE * (p - 1);
  const endIndex = startIndex + ITEM_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  // TODO: Replace with actual API call
  // const response = await fetch(
  //   `/api/lessons?page=${p}&search=${queryParams.search || ''}&classId=${queryParams.classId || ''}&teacherId=${queryParams.teacherId || ''}`
  // );
  // const { data, count } = await response.json();

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="lesson" type="create" />}
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

export default LessonListPage;