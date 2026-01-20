import { 
    fetchAnnouncementsAction, 
    fetchParentStudentsAction,
    fetchLessonsForStudentsWeeklyAction 
} from "@/actions/admin";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import { Announcement, Student, Lesson, AnnouncementListResponse } from "@/types/schemas";
import { Suspense } from "react";

// Skeleton Components
const BigCalendarSkeleton = () => (
    <div className="bg-white p-4 rounded-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="h-64 bg-gray-200 rounded w-full mt-4"></div>
        </div>
    </div>
);

const AnnouncementsSkeleton = () => (
    <div className="bg-white p-4 rounded-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border-b pb-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            ))}
        </div>
    </div>
);

const StudentScheduleSkeleton = () => (
    <div className="w-full">
        <BigCalendarSkeleton />
    </div>
);

// Student Schedule Component with Error Boundary
const StudentSchedule = async ({ student }: { student: Student }) => {
    if (!student.related_class) {
        return (
            <div className="w-full">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-4">
                        Schedule ({student.first_name} {student.last_name})
                    </h1>
                    <p className="text-gray-500 text-sm">
                        No class assigned to this student.
                    </p>
                </div>
            </div>
        );
    }

    const lessonsResult = await fetchLessonsForStudentsWeeklyAction(student.id);

    if (!lessonsResult.success || !lessonsResult.data) {
        console.error(`Failed to fetch lessons for student ${student.id}:`, lessonsResult.error);
        
        return (
            <div className="w-full">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-4">
                        Schedule ({student.first_name} {student.last_name})
                    </h1>
                    <p className="text-red-500 text-sm">
                        Failed to load schedule. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    const lessons: Lesson[] = lessonsResult.data;

    return (
        <div className="w-full">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold mb-4">
                    Schedule ({student.first_name} {student.last_name})
                </h1>
                <div className="w-full overflow-auto">
                    <BigCalendarContainer initialLessons={lessons} />
                </div>
            </div>
        </div>
    );
};

const ParentPage: React.FC = async () => {
    // Fetch students and announcements in parallel
    const [studentResults, announcementsResult] = await Promise.all([
        fetchParentStudentsAction(),
        fetchAnnouncementsAction()
    ]);

    const hasStudentError = !studentResults.success || !studentResults.data;
    const hasAnnouncementError = !announcementsResult.success || !announcementsResult.data;

    if (hasStudentError) {
        console.error('Failed to fetch students:', studentResults.error);
    }

    if (hasAnnouncementError) {
        console.error('Failed to fetch announcements:', announcementsResult.error);
    }

    const students: Student[] = studentResults.data || [];
    const announcements: AnnouncementListResponse = announcementsResult.data || {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    };

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT - Student Schedules */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                {hasStudentError ? (
                    <div className="w-full">
                        <div className="bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold text-red-500">
                                Error Loading Students
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {studentResults.error || 'Unable to load student information. Please try again later.'}
                            </p>
                        </div>
                    </div>
                ) : students.length === 0 ? (
                    <div className="w-full">
                        <div className="bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold">No Students Found</h1>
                            <p className="text-gray-500 mt-2">
                                No students are currently assigned to your account.
                            </p>
                        </div>
                    </div>
                ) : (
                    students.map((student) => (
                        <Suspense key={student.id} fallback={<StudentScheduleSkeleton />}>
                            <StudentSchedule student={student} />
                        </Suspense>
                    ))
                )}
            </div>

            {/* RIGHT - Announcements */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <Suspense fallback={<AnnouncementsSkeleton />}>
                    {hasAnnouncementError ? (
                        <div className="bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold text-red-500">
                                Error Loading Announcements
                            </h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                {announcementsResult.error || 'Unable to load announcements.'}
                            </p>
                        </div>
                    ) : (
                        <Announcements initialAnnouncements={announcements} />
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default ParentPage;