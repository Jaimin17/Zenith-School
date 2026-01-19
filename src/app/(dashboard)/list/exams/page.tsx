import FormContainer from "@/components/FromAnother/FormContainer";
import Pagination from "@/components/FromAnother/Pagination";
import Table from "@/components/FromAnother/Table";
import TableSearch from "@/components/FromAnother/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";

type ExamList = {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  lessonId: number;
  lesson: {
    id: number;
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
};

// Static data for demonstration
const STATIC_EXAMS: ExamList[] = [
  {
    id: 1,
    title: "Mid-term Mathematics Exam",
    startTime: new Date("2024-02-10T09:00:00"),
    endTime: new Date("2024-02-10T11:00:00"),
    lessonId: 1,
    lesson: {
      id: 1,
      subject: { id: 1, name: "Mathematics" },
      class: { id: 1, name: "Class 10A" },
      teacher: { id: "teacher1", name: "John", surname: "Smith" },
    },
  },
  {
    id: 2,
    title: "Physics Final Exam",
    startTime: new Date("2024-02-15T10:00:00"),
    endTime: new Date("2024-02-15T12:00:00"),
    lessonId: 2,
    lesson: {
      id: 2,
      subject: { id: 2, name: "Physics" },
      class: { id: 2, name: "Class 11B" },
      teacher: { id: "teacher2", name: "Sarah", surname: "Johnson" },
    },
  },
  {
    id: 3,
    title: "Chemistry Quiz",
    startTime: new Date("2024-02-18T14:00:00"),
    endTime: new Date("2024-02-18T15:00:00"),
    lessonId: 3,
    lesson: {
      id: 3,
      subject: { id: 3, name: "Chemistry" },
      class: { id: 3, name: "Class 12C" },
      teacher: { id: "teacher3", name: "Michael", surname: "Brown" },
    },
  },
  {
    id: 4,
    title: "English Literature Exam",
    startTime: new Date("2024-02-20T09:00:00"),
    endTime: new Date("2024-02-20T11:30:00"),
    lessonId: 4,
    lesson: {
      id: 4,
      subject: { id: 4, name: "English" },
      class: { id: 1, name: "Class 10A" },
      teacher: { id: "teacher4", name: "Emily", surname: "Davis" },
    },
  },
  {
    id: 5,
    title: "Biology Mid-term",
    startTime: new Date("2024-02-22T10:00:00"),
    endTime: new Date("2024-02-22T12:00:00"),
    lessonId: 5,
    lesson: {
      id: 5,
      subject: { id: 5, name: "Biology" },
      class: { id: 4, name: "Class 9A" },
      teacher: { id: "teacher5", name: "David", surname: "Wilson" },
    },
  },
  {
    id: 6,
    title: "History Final Exam",
    startTime: new Date("2024-02-25T13:00:00"),
    endTime: new Date("2024-02-25T15:00:00"),
    lessonId: 6,
    lesson: {
      id: 6,
      subject: { id: 6, name: "History" },
      class: { id: 2, name: "Class 11B" },
      teacher: { id: "teacher6", name: "Jessica", surname: "Martinez" },
    },
  },
  {
    id: 7,
    title: "Computer Science Practical",
    startTime: new Date("2024-02-28T11:00:00"),
    endTime: new Date("2024-02-28T13:00:00"),
    lessonId: 7,
    lesson: {
      id: 7,
      subject: { id: 7, name: "Computer Science" },
      class: { id: 3, name: "Class 12C" },
      teacher: { id: "teacher7", name: "Robert", surname: "Anderson" },
    },
  },
];

const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin";
  const currentUserId = "admin1";

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
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: ExamList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[--color-lamaPurpleLight]"
    >
      <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">
        {item.lesson.teacher.name + " " + item.lesson.teacher.surname}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  // Filter data based on query params
  let filteredData = STATIC_EXAMS;

  if (queryParams.search) {
    filteredData = filteredData.filter((exam) =>
      exam.lesson.subject.name
        .toLowerCase()
        .includes(queryParams.search!.toLowerCase())
    );
  }

  if (queryParams.classId) {
    filteredData = filteredData.filter(
      (exam) => exam.lesson.class.id === parseInt(queryParams.classId!)
    );
  }

  if (queryParams.teacherId) {
    filteredData = filteredData.filter(
      (exam) => exam.lesson.teacher.id === queryParams.teacherId
    );
  }

  // Pagination logic
  const count = filteredData.length;
  const startIndex = ITEM_PER_PAGE * (p - 1);
  const endIndex = startIndex + ITEM_PER_PAGE;
  const data = filteredData.slice(startIndex, endIndex);

  // TODO: Replace with actual API call
  // const response = await fetch(
  //   `/api/exams?page=${p}&search=${queryParams.search || ''}&classId=${queryParams.classId || ''}&teacherId=${queryParams.teacherId || ''}`
  // );
  // const { data, count } = await response.json();

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[--color-lamaYellow]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[--color-lamaYellow]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="exam" type="create" />
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

export default ExamListPage;