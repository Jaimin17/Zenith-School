import { Suspense } from "react";
import { fetchAnnouncementsAction, fetchLessonsWeeklyAction, fetchStudentClassAction } from "@/actions/admin";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import EventCalendarContainer from "@/components/FromAnother/EventCalendarContainer";

interface ClassBase {
    id: string;
    name: string;
}

// Loading components
const CalendarSkeleton = () => (
    <div className="h-full bg-white p-4 rounded-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-96 bg-gray-100 rounded"></div>
    </div>
);

const SidebarSkeleton = () => (
    <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md animate-pulse">
            <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <div className="bg-white p-4 rounded-md animate-pulse">
            <div className="h-32 bg-gray-100 rounded"></div>
        </div>
    </div>
);

// Separate components for independent data fetching
async function ScheduleSection() {
    const [studentClassResult, lessonsResult] = await Promise.all([
        fetchStudentClassAction(),
        fetchLessonsWeeklyAction()
    ]);

    const classItem: ClassBase = studentClassResult.success && studentClassResult.data ? {
        id: studentClassResult.data.id || "",
        name: studentClassResult.data.name || "Unknown Class",
    } : {
        id: "",
        name: "Unknown Class",
    };

    const lessons = lessonsResult.success ? lessonsResult.data || [] : [];

    return (
        <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">
                Schedule ({classItem.name})
            </h1>
            {classItem.id ? (
                <BigCalendarContainer initialLessons={lessons} />
            ) : (
                <div className="flex items-center justify-center h-96 text-gray-500">
                    No class information available
                </div>
            )}
        </div>
    );
}

async function SidebarSection() {
    const announcementsResult = await fetchAnnouncementsAction();
    const announcements = announcementsResult.success ? announcementsResult.data || [] : [];

    return (
        <div className="w-full xl:w-1/3 flex flex-col gap-8">
            <EventCalendarContainer />
            <Announcements initialAnnouncements={announcements} />
        </div>
    );
}

const StudentPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <Suspense fallback={<CalendarSkeleton />}>
                    <ScheduleSection />
                </Suspense>
            </div>

            {/* RIGHT */}
            <Suspense fallback={<SidebarSkeleton />}>
                <SidebarSection />
            </Suspense>
        </div>
    );
};

export default StudentPage;