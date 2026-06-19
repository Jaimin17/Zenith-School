import { Suspense } from "react";
import {
    fetchAnnouncementsAction,
    fetchAcademicYearsAllAction,
    fetchMyStudentYearDataAction,
} from "@/actions/admin";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import EventCalendarContainer from "@/components/FromAnother/EventCalendarContainer";
import YearAttendanceSummaryCard from "@/components/attendance/YearAttendanceSummaryCard";
import { AnnouncementListResponse, Lesson, StudentYearDataResponse } from "@/types/schemas";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const SidebarSkeleton = () => (
    <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <div className="bg-white p-4 rounded-md">
            <div className="h-64 bg-gray-100 rounded"></div>
        </div>
        <div className="bg-white p-4 rounded-md">
            <div className="h-32 bg-gray-100 rounded"></div>
        </div>
    </div>
);

const ScheduleSection = ({ yearData }: { yearData: StudentYearDataResponse }) => (
    <div className="h-full bg-white p-4 rounded-md">
        <h1 className="text-xl font-semibold mb-1">Schedule</h1>
        <p className="text-sm text-gray-500 mb-4">
            Academic Year: {yearData.academic_year.year_label}
            {yearData.class_name ? ` · Class: ${yearData.class_name}` : ""}
            {yearData.grade_level != null ? ` · Grade ${yearData.grade_level}` : ""}
        </p>
        {yearData.lessons.length === 0 ? (
            <p className="text-gray-400 text-sm">No lessons recorded for this year.</p>
        ) : (
            <BigCalendarContainer initialLessons={yearData.lessons as unknown as Lesson[]} />
        )}
    </div>
);

async function SidebarSection({ activeYear }: { activeYear?: any }) {
    const announcementsResult = await fetchAnnouncementsAction("", 1, activeYear?.start_date, activeYear?.end_date);
    const announcements: AnnouncementListResponse = announcementsResult.success ? announcementsResult.data || {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    } : {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    };

    return (
        <>
            <EventCalendarContainer />
            <Announcements initialAnnouncements={announcements} activeYear={activeYear} />
        </>
    );
}

interface StudentPageProps {
    searchParams: Promise<{ yearId?: string }>;
}

const StudentPage = async ({ searchParams: _searchParams }: StudentPageProps) => {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;

    const [yearsResult] = await Promise.all([
        fetchAcademicYearsAllAction(),
    ]);

    const years = yearsResult.data ?? [];
    const activeYear = years.find((y) => y.is_active) ?? years[0] ?? null;
    const resolvedYearId = selectedYearId ?? activeYear?.id ?? null;

    let selectedYearData: StudentYearDataResponse | null = null;
    if (resolvedYearId) {
        const result = await fetchMyStudentYearDataAction(resolvedYearId);
        if (result.success) selectedYearData = result.data;
    }

    const announcementYear = selectedYearData?.academic_year ?? activeYear;

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                {selectedYearData ? (
                    <ScheduleSection yearData={selectedYearData} />
                ) : (
                    <div className="h-full bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold">Schedule</h1>
                        <p className="text-gray-400 text-sm mt-2">No data found for the selected academic year.</p>
                    </div>
                )}
            </div>

            {/* RIGHT */}
            <Suspense fallback={<SidebarSkeleton />}>
                <div className="w-full xl:w-1/3 flex flex-col gap-8">
                    {selectedYearData && <YearAttendanceSummaryCard yearData={selectedYearData} title="My Attendance" />}
                    <SidebarSection activeYear={announcementYear} />
                </div>
            </Suspense>
        </div>
    );
};

export default StudentPage;
