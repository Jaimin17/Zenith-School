import { requireAuth } from "@/lib/auth/serverAuth";
import { 
  fetchClassesForTakingAttendanceAction,
  fetchClassRosterAction
} from "@/actions/admin";
import { ClassSelector, AttendanceForm, SimpleDatePicker } from "@/components/attendance"; 
import { Calendar, ClipboardCheck, ArrowLeft, Ban } from "lucide-react";
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
  const classId = params.classId;
  const classesResult = await fetchClassesForTakingAttendanceAction(selectedDate, undefined);

  const isHoliday = Boolean(classesResult.data?.is_holiday);
  const holidayReason = classesResult.data?.holiday_reason || "Holiday";
  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Block attendance flow on Sundays/public holidays
  if (isHoliday) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="p-4 md:p-6">
          <div className="mb-6 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-5 md:p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <Ban className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Attendance Closed for This Date</h1>
                  <p className="text-sm text-gray-600 mt-1">
                    Attendance can only be marked on working days. This date is currently treated as a non-working day.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      Reason: {holidayReason}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700">
                      Date: {formattedSelectedDate}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/list/attendance"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>

            <div className="mt-5 rounded-xl border border-amber-200 bg-white p-4">
              <p className="text-sm font-medium text-amber-900">What this means</p>
              <ul className="mt-2 space-y-1 text-sm text-amber-800 list-disc pl-5">
                <li>No class attendance can be submitted for Sundays or declared public holidays.</li>
                <li>Choose a working day below to continue taking class attendance.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Select another working date:</span>
              </div>
              <SimpleDatePicker currentDate={selectedDate} baseUrl="/list/attendance/take" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a class is selected, show the attendance form
  if (classId) {
    const rosterResult = await fetchClassRosterAction(classId, selectedDate);

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
                  Mark student attendance for this class
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

  // Otherwise show class selector
  const classesForDateResult = classesResult;

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
                  Select a class to mark attendance
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

        {/* Class Selector */}
        <ClassSelector
          classesData={classesForDateResult.data}
          selectedDate={selectedDate}
          hasError={!classesForDateResult.success}
          errorMessage={classesForDateResult.error}
        />
      </div>
    </div>
  );
};

export default TakeAttendancePage;
