import { requireAuth } from "@/lib/auth/serverAuth";
import { 
  fetchLessonsForTakingAttendanceAction,
  fetchLessonRosterAction
} from "@/actions/admin";
import { LessonSelector, AttendanceForm, SimpleDatePicker } from "@/components/attendance"; 
import { Calendar, ClipboardCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

const TakeAttendancePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const auth = await requireAuth();
  const role = auth.role;

  // Only admins and teachers can take attendance
  if (role !== 'admin' && role !== 'teacher') {
    return (
      <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-md">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Access Denied
          </h2>
          <p className="text-red-600 text-sm">
            You do not have permission to take attendance.
          </p>
        </div>
      </div>
    );
  }

  // Get date from params or use today
  const selectedDate = params.date || new Date().toISOString().split('T')[0];
  const lessonId = params.lessonId;
  const classId = params.classId;

  // If a lesson is selected, show the attendance form
  if (lessonId) {
    const rosterResult = await fetchLessonRosterAction(lessonId, selectedDate);

    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 md:p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {rosterResult.data?.attendance_exists ? "Edit Attendance" : "Take Attendance"}
                </h1>
                <p className="text-sm text-gray-500">
                  Mark student attendance for this lesson
                </p>
              </div>
            </div>
          </div>

          {/* Attendance Form */}
          <AttendanceForm
            rosterData={rosterResult.data}
            selectedDate={selectedDate}
            hasError={!rosterResult.success}
            errorMessage={rosterResult.error}
          />
        </div>
      </div>
    );
  }

  // Otherwise show lesson selector
  const lessonsResult = await fetchLessonsForTakingAttendanceAction(selectedDate, classId);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 md:p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Take Attendance</h1>
                <p className="text-sm text-gray-500">
                  Select a lesson to mark attendance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/list/attendance"
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Select Date:</span>
              </div>
              <SimpleDatePicker 
                currentDate={selectedDate} 
                baseUrl="/list/attendance/take" 
              />
            </div>
          </div>
        </div>

        {/* Lesson Selector */}
        <LessonSelector
          lessonsData={lessonsResult.data}
          selectedDate={selectedDate}
          hasError={!lessonsResult.success}
          errorMessage={lessonsResult.error}
        />
      </div>
    </div>
  );
};

export default TakeAttendancePage;
