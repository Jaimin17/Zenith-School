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

      // const res = {}

      // if (res.ok) return res.json();
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
        const examLessons = await fetchApi(
          `/api/lessons?teacherId=${currentUserId}`,
          [{ id: 10, name: "Math Class" }]
        );
        relatedData = { lessons: examLessons };
        break;
      }

      // ---------------- ANNOUNCEMENT ----------------
      case "announcement": {
        const announcementClasses = await fetchApi("/api/classes", [
          { id: "c1", name: "Class 10A" },
          { id: "c2", name: "Class 9B" },
          { id: "c3", name: "Class 11C" },
          { id: "c4", name: "Class 8A" },
          { id: "c5", name: "Class 12B" },
        ]);
        relatedData = { classes: announcementClasses };
        break;
      }

      // ---------------- EVENT ----------------
      case "event": {
        const eventClasses = await fetchApi("/api/classes", [
          { id: "c1", name: "Class 10A" },
          { id: "c2", name: "Class 9B" },
          { id: "c3", name: "Class 11C" },
          { id: "c4", name: "Class 8A" },
          { id: "c5", name: "Class 12B" },
        ]);
        relatedData = { classes: eventClasses };
        break;
      }

      // ---------------- ASSIGNMENT ----------------
      case "assignment": {
        const assignmentLessons = await fetchApi("/api/lessons", [
          { id: "l1", name: "Math - Class 10A" },
          { id: "l2", name: "Science - Class 9B" },
          { id: "l3", name: "English - Class 11C" },
          { id: "l4", name: "Physics - Class 8A" },
          { id: "l5", name: "Chemistry - Class 12B" },
        ]);
        relatedData = { lessons: assignmentLessons };
        break;
      }

      // ---------------- RESULT ----------------
      case "result": {
        const resultStudents = await fetchApi("/api/students", [
          { id: "s1", first_name: "John", last_name: "Smith" },
          { id: "s2", first_name: "Emily", last_name: "Johnson" },
          { id: "s3", first_name: "Michael", last_name: "Brown" },
        ]);
        const resultExams = await fetchApi("/api/exams", [
          { id: "e1", title: "Math Midterm" },
          { id: "e2", title: "Science Final" },
          { id: "e3", title: "English Quiz" },
        ]);
        const resultAssignments = await fetchApi("/api/assignments", [
          { id: "a1", title: "Math Homework 1" },
          { id: "a2", title: "Science Project" },
          { id: "a3", title: "English Essay" },
        ]);
        relatedData = { 
          students: resultStudents, 
          exams: resultExams, 
          assignments: resultAssignments 
        };
        break;
      }

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
