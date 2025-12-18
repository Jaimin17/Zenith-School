import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData: any = {};

  const role = "admin";
  const currentUserId = "admin1";

  // Fetch helper
  async function fetchApi(endpoint: string, fallback: any[]) {
    try {
      // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      //   cache: "no-store",
      // });

      const res = {}


      if (res.ok) return res.json();
      return fallback;
    } catch {
      return fallback;
    }
  }

  if (type !== "delete") {
    switch (table) {
      // ---------------- SUBJECT ----------------
      case "subject": {
        const subjectTeachers = await fetchApi("/api/teachers", [
          { id: "t1", name: "John", surname: "Doe" },
          { id: "t2", name: "Emma", surname: "Stone" },
        ]);
        relatedData = { teachers: subjectTeachers };
        break;
      }

      // ---------------- CLASS ----------------
      case "class": {
        const classGrades = await fetchApi("/api/grades", [
          { id: 1, level: "8" },
          { id: 2, level: "9" },
        ]);

        const classTeachers = await fetchApi("/api/teachers", [
          { id: "t1", name: "John", surname: "Doe" },
        ]);

        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      }

      // ---------------- TEACHER ----------------
      case "teacher": {
        const teacherSubjects = await fetchApi("/api/subjects", [
          { id: 1, name: "Math" },
          { id: 2, name: "Science" },
        ]);

        relatedData = { subjects: teacherSubjects };
        break;
      }

      // ---------------- STUDENT ----------------
      case "student": {
        const studentGrades = await fetchApi("/api/grades", [
          { id: 1, level: "7" },
          { id: 2, level: "8" },
        ]);

        const studentClasses = await fetchApi("/api/classes", [
          {
            id: 1,
            name: "8A",
            _count: { students: 28 },
          },
        ]);

        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      }

      // ---------------- EXAM ----------------
      case "exam": {
        // If needed later, we can re-enable API logic
        // keeping structure consistent with your original code.
        // const examLessons = await fetchApi(
        //   `/api/lessons?teacherId=${role === "teacher" ? currentUserId : ""}`,
        //   [{ id: 10, name: "Math Class" }]
        // );
        // relatedData = { lessons: examLessons };
        break;
      }

      default:
        break;
    }
  }

  return (
    <div className="">
      {/* <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      /> */}
    </div>
  );
};

export default FormContainer;
