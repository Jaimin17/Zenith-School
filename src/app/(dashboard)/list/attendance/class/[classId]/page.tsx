import { requireAuth } from "@/lib/auth/serverAuth";
import { fetchClassAttendanceDetailAction } from "@/actions/admin";
import { ClassAttendanceDetail } from "@/components/attendance";
import { notFound } from "next/navigation";

const ClassAttendanceDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ classId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { classId } = await params;
  const queryParams = await searchParams;
  
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

  const selectedDate = queryParams.date || new Date().toISOString().split('T')[0];
  
  const result = await fetchClassAttendanceDetailAction(classId, selectedDate);

  if (!result.success || !result.data) {
    console.error('Failed to fetch class attendance:', result.error);
    return notFound();
  }

  return (
    <ClassAttendanceDetail
      classData={result.data}
      selectedDate={selectedDate}
      role={role || 'admin'}
    />
  );
};

export default ClassAttendanceDetailPage;
