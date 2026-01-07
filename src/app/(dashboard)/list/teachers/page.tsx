import Pagination from "../../../../components/FromAnother/Pagination";
import Table from "../../../../components/FromAnother/Table";
import TableSearch from "../../../../components/FromAnother/TableSearch";
import FormContainer from "../../../../components/FromAnother/FormContainer";

import Image from "next/image";
import Link from "next/link";

const ITEM_PER_PAGE = 10;

type Subject = {
  id: number;
  name: string;
};

type Class = {
  id: number;
  name: string;
};

type Teacher = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  img?: string;
  subjects: Subject[];
  classes: Class[];
};


const TeacherListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const role = "admin";

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search;


  const fetchTeachers = async ({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) => {
    // Dummy data
    const allTeachers: Teacher[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        username: "john_d",
        phone: "9876543210",
        address: "Ahmedabad",
        img: "/noAvatar.png",
        subjects: [{ id: 1, name: "Math" }, { id: 2, name: "Physics" }],
        classes: [{ id: 1, name: "10-A" }],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        username: "jane_s",
        phone: "9123456789",
        address: "Surat",
        img: "/noAvatar.png",
        subjects: [{ id: 3, name: "Chemistry" }],
        classes: [{ id: 2, name: "9-B" }],
      },
    ];

    // Simulate search
    const filtered = search
      ? allTeachers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
      : allTeachers;

    const ITEM_PER_PAGE = 10;

    return {
      data: filtered.slice(
        ITEM_PER_PAGE * (page - 1),
        ITEM_PER_PAGE * page
      ),
      count: filtered.length,
    };
  };


  // 🔹 API CALL (dummy)
  const { data, count } = await fetchTeachers({
    page,
    search,
  });

  const columns = [
    { header: "Info", accessor: "info" },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
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

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>

      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((s) => s.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((c) => c.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>

          {role === "admin" && (
            <FormContainer table="teacher" type="delete" id={item.id} />
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
          All Teachers
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
              <FormContainer table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />

      {/* PAGINATION */}
      <Pagination page={page} count={count} />
    </div>
  );
};

export default TeacherListPage;
