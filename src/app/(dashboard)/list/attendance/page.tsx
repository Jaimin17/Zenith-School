import { requireAuth } from "@/lib/auth/serverAuth";
import { 
  fetchAttendanceDashboardSummaryAction, 
  fetchAttendanceDashboardClassesAction,
  fetchTeacherClassesAttendanceAction,
  fetchStudentCalendarAttendanceAction,
  fetchParentChildrenAttendanceAction
} from "@/actions/admin";
import { AdminAttendanceDashboard, TeacherAttendanceView, StudentAttendanceView } from "@/components/attendance"; 
import ParentAttendanceView from "@/components/attendance/ParentAttendanceView";

const AttendanceListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const auth = await requireAuth();
  const role = auth.role;
  const userId = auth.userId;

  // Get date from params or use today
  const selectedDate = params.date || new Date().toISOString().split('T')[0];
  
  // Get month/year for calendar views
  const currentDate = new Date();
  const month = params.month ? parseInt(params.month) : currentDate.getMonth() + 1;
  const year = params.year ? parseInt(params.year) : currentDate.getFullYear();

  // Admin View
  if (role === 'admin') {
    const [summaryResult, classesResult] = await Promise.all([
      fetchAttendanceDashboardSummaryAction(selectedDate),
      fetchAttendanceDashboardClassesAction(selectedDate),
    ]);

    return (
      <AdminAttendanceDashboard
        selectedDate={selectedDate}
        summary={summaryResult.data}
        classesData={classesResult.data}
        hasError={!summaryResult.success || !classesResult.success}
        errorMessage={summaryResult.error || classesResult.error}
      />
    );
  }

  // Teacher View
  if (role === 'teacher' && userId) {
    const teacherResult = await fetchTeacherClassesAttendanceAction(userId, selectedDate);

    return (
      <TeacherAttendanceView
        selectedDate={selectedDate}
        teacherData={teacherResult.data}
        hasError={!teacherResult.success}
        errorMessage={teacherResult.error}
      />
    );
  }

  // Student View
  if (role === 'student' && userId) {
    const calendarResult = await fetchStudentCalendarAttendanceAction(userId, month, year);

    return (
      <StudentAttendanceView
        studentId={userId}
        month={month}
        year={year}
        calendarData={calendarResult.data}
        hasError={!calendarResult.success}
        errorMessage={calendarResult.error}
      />
    );
  }

  // Parent View
  if (role === 'parent') {
    const childrenResult = await fetchParentChildrenAttendanceAction(month, year);

    return (
      <ParentAttendanceView
        month={month}
        year={year}
        childrenData={childrenResult.data}
        hasError={!childrenResult.success}
        errorMessage={childrenResult.error}
      />
    );
  }

  // Default: Access Denied
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
};

export default AttendanceListPage;
