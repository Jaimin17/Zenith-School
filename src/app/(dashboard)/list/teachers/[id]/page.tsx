import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Announcements from "@/components/FromAnother/Announcements";
import BigCalendarContainer from "@/components/FromAnother/BigCalendarContainer";
import FormContainer from "@/components/FromAnother/FormContainer";
import Performance from "@/components/FromAnother/Performance";
import { requireAdmin } from "@/lib/auth/serverAuth";
import { fetchAnnouncementsOfTeacherAction, fetchLessonsTeacherWeeklyAction, fetchTeacherByIdAction } from "@/actions/admin";
import { AnnouncementListResponse, TeacherWithRelations } from "@/types/schemas";
import { Calendar, BookOpen, Users, GraduationCap, Droplets, Cake, Mail, Phone } from "lucide-react";
import { getTeacherImageUrl } from "@/utils/imageHelpers";

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




const SingleTeacherPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const auth = await requireAdmin();

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

  const [teacherDetailResult, lessonsListResult, announcementListResult] = await Promise.all([
    fetchTeacherByIdAction(id),
    fetchLessonsTeacherWeeklyAction(id),
    fetchAnnouncementsOfTeacherAction(id),
  ]);

  const hasError = !teacherDetailResult.success || !teacherDetailResult.data;

  const hasLessonsError = !lessonsListResult.success || !lessonsListResult.data;

  const hasAnnouncementsError = !announcementListResult.success || !announcementListResult.data;

  if (hasError) {
    console.error('Failed to fetch teacher:', teacherDetailResult.error);
  }

  if (hasLessonsError) {
    console.error('Failed to fetch lessons:', lessonsListResult.error);
  }

  if (hasAnnouncementsError) {
    console.error('Failed to fetch announcements:', announcementListResult.error);
  }

  const teacher: TeacherWithRelations | null = teacherDetailResult.data || null;

  const lessons = lessonsListResult.data || [];

  const announcements: AnnouncementListResponse = announcementListResult.data || {
      data: [],
      total_count: 0,
      page: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    };

  if (!teacher) {
    return notFound();
  }

  // Show error messages for partial failures
  const hasPartialErrors = hasLessonsError || hasAnnouncementsError;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* Error Banner for partial failures */}
      {hasPartialErrors && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-50 border-b border-yellow-200 px-4 py-2">
          <p className="text-sm text-yellow-700">
            Some data could not be loaded. 
            {hasLessonsError && " Schedule may be incomplete."}
            {hasAnnouncementsError && " Announcements may be unavailable."}
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
                  src={getTeacherImageUrl(teacher.img)}
                  alt={`${teacher.first_name} ${teacher.last_name}'s profile photo`}
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
                    {teacher.first_name + " " + teacher.last_name}
                  </h1>
                  {role === "admin" && (
                    <FormContainer table="teacher" type="update" data={teacher} />
                  )}
                </div>
                <p className="text-sm text-blue-100">
                  Professional Educator
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <span>{teacher.blood_type || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Cake className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{formatDate(teacher.dob)}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="truncate">{teacher.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* STAT CARDS */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {/* CARD - Subjects */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {teacher.subjects?.length || 0}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">Subjects</span>
                </div>
              </div>
            </div>
            {/* CARD - Lessons */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {teacher.lessons?.length || 0}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">Lessons</span>
                </div>
              </div>
            </div>
            {/* CARD - Classes */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {teacher.classes?.length || 0}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">Classes</span>
                </div>
              </div>
            </div>
            {/* CARD - Total Capacity */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {teacher.classes?.reduce((total, cls) => total + (cls.capacity || 0), 0) || 0}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium">Capacity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendarContainer initialLessons={lessons} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-5 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-lg font-semibold text-gray-800">Shortcuts</h1>
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs font-medium">
            <Link
              className="px-4 py-2.5 rounded-lg bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors"
              href={`/list/classes?supervisorId=${teacher.id}`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              className="px-4 py-2.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
              href={`/list/students?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              className="px-4 py-2.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
              href={`/list/lessons?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              className="px-4 py-2.5 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
              href={`/list/exams?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              className="px-4 py-2.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
              href={`/list/assignments?teacherId=${teacher.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements initialAnnouncements={announcements} userId={teacher.id} role="teacher" />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
