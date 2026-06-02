import { ParentWithRelations } from "@/types/schemas";
import FormModal from "./FormModal";
import { fetchSubjectFullListAction, fetchAllClassesAction, fetchParentsAction, fetchAllParentsListAction, fetchFullTeachersListAction, fetchFullGradeListAction, fetchLessonsAction, fetchLessonsFullListAction } from "@/actions/admin";
import { cookies } from "next/headers";

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
  | "announcement"
  | "banner"
  | "photoGallery"
  | "testimonial"
  | "sportsProgram"
  | "achievement"
  | "jobOpening"
  | "jobApplication";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  disabled?: boolean;
};

const FormContainer = async ({ table, type, data, id, disabled }: FormContainerProps) => {
  let relatedData: any = {};

  const role = "admin";
  const currentUserId = "admin1";

  // Fetch helper for placeholder data (to be replaced with actual API calls)
  async function fetchApi(endpoint: string, fallback: any[]) {
    try {
      return fallback;
    } catch {
      return fallback;
    }
  }

  if (type !== "delete") {
    switch (table) {
      // ---------------- SUBJECT ----------------
      case "subject": {
        const teachersResponse = await fetchFullTeachersListAction();
        const subjectTeachers = teachersResponse.success && 
        teachersResponse.data ? teachersResponse.data : []
        relatedData = { teachers: subjectTeachers };
        break;
      }

      // ---------------- CLASS ----------------
      case "class": {
        const [teacherListResponse, gradeListResponse] = await Promise.all([fetchFullTeachersListAction(), fetchFullGradeListAction()])

        if (!teacherListResponse.success || !teacherListResponse.data) {
          console.error('Failed to fetch teacher list:', teacherListResponse.error);
        }

        if (!gradeListResponse.success || !gradeListResponse.data) {
          console.error('Failed to fetch grade list:', gradeListResponse.error);
        }

        const classTeachers = teacherListResponse.success && 
        teacherListResponse.data ? teacherListResponse.data : []

        const classGrades = gradeListResponse.success && 
        gradeListResponse.data ? gradeListResponse.data : []

        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      }

      // ---------------- TEACHER ----------------
      case "teacher": {
        // Fetch subjects from the API
        const subjectsResponse = await fetchSubjectFullListAction();
        const teacherSubjects = subjectsResponse.success && subjectsResponse.data
          ? subjectsResponse.data
          : [];

        relatedData = { subjects: teacherSubjects };
        break;
      }

      // ---------------- STUDENT ----------------
      case "student": {
        // Fetch classes from the API
        const classesResponse = await fetchAllClassesAction();
        const studentClasses = classesResponse.success && classesResponse.data
          ? classesResponse.data
          : [];

        // Extract unique grades from classes
        const gradesMap = new Map<string, { id: string; level: number; name: string }>();
        studentClasses.forEach((cls: any) => {
          if (cls.grade && cls.grade.id && !gradesMap.has(cls.grade.id)) {
            gradesMap.set(cls.grade.id, {
              id: cls.grade.id,
              level: cls.grade.level,
              name: `Grade ${cls.grade.level}`,
            });
          }
        });
        const studentGrades = Array.from(gradesMap.values());

        // Add grade_id to each class for filtering
        const classesWithGradeId = studentClasses.map((cls: any) => ({
          ...cls,
          grade_id: cls.grade?.id,
        }));

        // Fetch parents from the API
        const parentsResponse = await fetchAllParentsListAction();
        const parentsList: ParentWithRelations[] = parentsResponse.success && parentsResponse.data
          ? parentsResponse.data
          : [];

        relatedData = { 
          classes: classesWithGradeId, 
          grades: studentGrades,
          parents: parentsList,
        };
        break;
      }

      // ---------------- LESSON ----------------
      case "lesson": {
        const [lessonSubjectsResponse, lessonClassesResponse, lessonTeachersResponse] = await Promise.all([
          fetchSubjectFullListAction(),
          fetchAllClassesAction(),
          fetchFullTeachersListAction(),
        ]);

        const lessonSubjects = lessonSubjectsResponse.success && lessonSubjectsResponse.data
          ? lessonSubjectsResponse.data : [];
        const lessonClasses = lessonClassesResponse.success && lessonClassesResponse.data
          ? lessonClassesResponse.data : [];
        const lessonTeachers = lessonTeachersResponse.success && lessonTeachersResponse.data
          ? lessonTeachersResponse.data : [];

        relatedData = {
          subjects: lessonSubjects,
          classes: lessonClasses,
          teachers: lessonTeachers,
        };
        break;
      }

      // ---------------- PARENT ----------------
      case "parent": {
        // No related data needed for parent form
        relatedData = {};
        break;
      }

      // ---------------- EXAM ----------------
      case "exam": {
        const lessonsResponse = await fetchLessonsAction();
        const examLessons = lessonsResponse.success && lessonsResponse.data
          ? lessonsResponse.data.data
          : [];
        relatedData = { lessons: examLessons };
        break;
      }

      // ---------------- ASSIGNMENT ----------------
      case "assignment": {
        const cookieStore = await cookies();
        const yearId = cookieStore.get("selected_year_id")?.value;

        const lessonsResponse = await fetchLessonsFullListAction(yearId);
        const assignmentLessons = lessonsResponse.success && lessonsResponse.data
          ? lessonsResponse.data
          : [];
        relatedData = { lessons: assignmentLessons };
        break;
      }

      // ---------------- ANNOUNCEMENT ----------------
      case "announcement": {
        // Fetch classes from the API
        const classesResponse = await fetchAllClassesAction();
        const announcementClasses = classesResponse.success && classesResponse.data
          ? classesResponse.data
          : [];
        relatedData = { classes: announcementClasses };
        break;
      }

      // ---------------- EVENT ----------------
      case "event": {
        // Fetch classes from the API
        const classesResponse = await fetchAllClassesAction();
        const eventClasses = classesResponse.success && classesResponse.data
          ? classesResponse.data
          : [];
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

      // ---------------- BANNER ----------------
      case "banner": {
        // No related data needed for banner form
        relatedData = {};
        break;
      }

      // ---------------- PHOTO GALLERY ----------------
      case "photoGallery": {
        relatedData = {};
        break;
      }

      // ---------------- TESTIMONIAL ----------------
      case "testimonial": {
        relatedData = {};
        break;
      }

      // ---------------- SPORTS PROGRAM ----------------
      case "sportsProgram": {
        relatedData = {};
        break;
      }

      // ---------------- ACHIEVEMENT ----------------
      case "achievement": {
        relatedData = {};
        break;
      }

      // ---------------- JOB OPENING ----------------
      case "jobOpening": {
        relatedData = {};
        break;
      }

      // ---------------- JOB APPLICATION ----------------
      case "jobApplication": {
        relatedData = {};
        break;
      }

      // ---------------- RESULT ----------------
      // Students, exams, and assignments are fetched client-side based on selected class
      case "result": {
        const classesResponse = await fetchAllClassesAction();

        const resultClasses = classesResponse.success && classesResponse.data
          ? classesResponse.data || []
          : [];

        relatedData = { 
          classes: resultClasses
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
        disabled={disabled}
      />
    </div>
  );
};

export default FormContainer;
