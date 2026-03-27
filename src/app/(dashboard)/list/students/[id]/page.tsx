import Announcements from "@/components/FromAnother/Announcements";
import BigCalendarContainer from "@/components/FromAnother/BigCalendarContainer";
import FormContainer from "@/components/FromAnother/FormContainer";
import Performance from "@/components/FromAnother/Performance";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/serverAuth";
import { 
  fetchAnnouncementsOfStudentAction, 
  fetchAttendanceByStudentIdAction, 
  fetchStudentByIdAction,
  fetchStudentYearDataAction,
  fetchLessonsForStudentsWeeklyAction 
} from "@/actions/admin";
import { AnnouncementListResponse, StudentWithRelations, Attendance, Lesson } from "@/types/schemas";
import { getStudentImageUrl } from "@/utils/imageHelpers";
import { Droplets, Cake, Mail, Phone, GraduationCap, BookOpen, Users, Calendar } from "lucide-react";
import { cookies } from "next/headers";

// Helper function to format date
const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper function to calculate attendance percentage
const calculateAttendancePercentage = (attendanceData: Attendance[]): number => {
  if (!attendanceData || attendanceData.length === 0) return 0;
  const presentCount = attendanceData.filter((a) => a.present).length;
  return Math.round((presentCount / attendanceData.length) * 100);
};

const SingleStudentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;

  const auth = await requireAuth();
  const role = auth.role;

  const allowedRoles = ['admin', 'teacher'];
  if (role && !allowedRoles.includes(role)) {
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

  // Fetch all data in parallel
  const [studentResult, attendanceResult, announcementResult, lessonsResult, yearDataResult] = await Promise.all([
    fetchStudentByIdAction(id),
    fetchAttendanceByStudentIdAction(id),
    fetchAnnouncementsOfStudentAction(id),
    fetchLessonsForStudentsWeeklyAction(id),
    selectedYearId ? fetchStudentYearDataAction(id, selectedYearId) : Promise.resolve(null),
  ]);

  const hasStudentError = !studentResult.success || !studentResult.data;
  const hasAttendanceError = !attendanceResult.success;
  const hasAnnouncementsError = !announcementResult.success || !announcementResult.data;
  const hasLessonsError = !lessonsResult.success;
  const hasYearDataError = Boolean(selectedYearId && yearDataResult && !yearDataResult.success);

  if (hasStudentError) {
    console.error('Failed to fetch student:', studentResult.error);
  }
  if (hasAttendanceError) {
    console.error('Failed to fetch attendance:', attendanceResult.error);
  }
  if (hasAnnouncementsError) {
    console.error('Failed to fetch announcements:', announcementResult.error);
  }
  if (hasLessonsError) {
    console.error('Failed to fetch lessons:', lessonsResult.error);
  }
  if (hasYearDataError) {
    console.error('Failed to fetch selected-year student data:', yearDataResult?.error);
  }

  const student: StudentWithRelations | null = studentResult.data || null;
  const attendance: Attendance[] = attendanceResult.data || [];
  const announcements: AnnouncementListResponse = announcementResult.data || {
    data: [],
    total_count: 0,
    page: 1,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  };
  const lessons: Lesson[] = lessonsResult.data || [];

  if (!student) {
    return notFound();
  }

  const attendancePercentage = calculateAttendancePercentage(attendance);

  const selectedYearHasNoClassHistory = Boolean(
    selectedYearId &&
    yearDataResult?.success &&
    yearDataResult.data &&
    !yearDataResult.data.class_id
  );

  const resolvedClassName = selectedYearId
    ? (yearDataResult?.success ? yearDataResult.data?.class_name || null : student.related_class?.name || null)
    : student.related_class?.name || null;

  const resolvedClassId = selectedYearId
    ? (yearDataResult?.success ? yearDataResult.data?.class_id || null : student.related_class?.id || null)
    : student.related_class?.id || null;

  const resolvedGradeLevel = selectedYearId
    ? (yearDataResult?.success ? yearDataResult.data?.grade_level ?? null : student.grade?.level ?? null)
    : student.grade?.level ?? null;

  // Show error messages for partial failures
  const hasPartialErrors = hasAttendanceError || hasAnnouncementsError || hasLessonsError || hasYearDataError;

  const shortcutClassName =
    "px-4 py-2.5 rounded-lg transition-colors text-center";

  const renderClassShortcut = (href: string, label: string, activeClassName: string) => {
    if (!resolvedClassId || selectedYearHasNoClassHistory) {
      return (
        <span
          className={`${shortcutClassName} bg-gray-100 text-gray-400 cursor-not-allowed`}
          title="No class assigned for selected year"
        >
          {label}
        </span>
      );
    }

    return (
      <Link className={`${shortcutClassName} ${activeClassName}`} href={`${href}?classId=${resolvedClassId}`}>
        {label}
      </Link>
    );
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* Error Banner for partial failures */}
      {hasPartialErrors && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <p className="text-sm text-yellow-700">
            Some data could not be loaded. 
            {hasAttendanceError && " Attendance may be incomplete."}
            {hasLessonsError && " Schedule may be incomplete."}
            {hasAnnouncementsError && " Announcements may be unavailable."}
            {hasYearDataError && " Selected-year class details may be unavailable."}
          </p>
        </div>
      )}
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-gradient-to-br from-sky-400 to-blue-400 py-6 px-6 rounded-xl flex-1 flex gap-6 shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                  src={getStudentImageUrl(student.img)}
                  alt={`${student.first_name} ${student.last_name}'s profile photo`}
                  width={144}
                  height={144}
                  className="w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover border-4 border-white/30 shadow-xl"
                  priority
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">
                    {student.first_name + " " + student.last_name}
                  </h1>
                  {role === "admin" && (
                    <FormContainer table="student" type="update" data={student} />
                  )}
                </div>
                <p className="text-sm text-blue-100">
                  {selectedYearHasNoClassHistory
                    ? "No class assigned for selected year"
                    : `Student at ${resolvedClassName || "N/A"}`}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <span>{student.blood_type || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Cake className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{formatDate(student.dob)}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{student.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* STAT CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {/* CARD - Attendance */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{attendancePercentage}%</h2>
                  <span className="text-xs text-gray-500">Attendance</span>
                </div>
              </div>
            </div>
            {/* CARD - Grade */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {resolvedGradeLevel ?? "-"}
                  </h2>
                  <span className="text-xs text-gray-500">Grade</span>
                </div>
              </div>
            </div>
            {/* CARD - Lessons */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {lessons.length}
                  </h2>
                  <span className="text-xs text-gray-500">Lessons</span>
                </div>
              </div>
            </div>
            {/* CARD - Class */}
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {selectedYearHasNoClassHistory ? "-" : (resolvedClassName || "-")}
                  </h2>
                  <span className="text-xs text-gray-500">Class</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-xl p-4 h-[800px] shadow-sm border border-gray-100">
          <h1 className="text-xl font-semibold mb-4">Student&apos;s Schedule</h1>
          <BigCalendarContainer initialLessons={lessons} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">Shortcuts</h1>
          {selectedYearHasNoClassHistory && (
            <p className="mt-2 text-xs text-amber-700">No class assigned for selected year</p>
          )}
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-medium">
            {renderClassShortcut(
              "/list/lessons",
              "Student's Lessons",
              "bg-sky-100 text-sky-700 hover:bg-sky-200"
            )}
            {renderClassShortcut(
              "/list/teachers",
              "Student's Teachers",
              "bg-purple-100 text-purple-700 hover:bg-purple-200"
            )}
            {renderClassShortcut(
              "/list/exams",
              "Student's Exams",
              "bg-pink-100 text-pink-700 hover:bg-pink-200"
            )}
            {renderClassShortcut(
              "/list/assignments",
              "Student's Assignments",
              "bg-amber-100 text-amber-700 hover:bg-amber-200"
            )}
            <Link
              className="px-4 py-2.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors text-center"
              href={`/list/results?studentId=${student.id}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements initialAnnouncements={announcements} userId={student.id} role="student" />
      </div>
    </div>
  );
};

export default SingleStudentPage;