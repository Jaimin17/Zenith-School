import {
    fetchAnnouncementsAction,
    fetchChildrenOfParentAction,
    fetchAcademicYearsAllAction,
    fetchStudentYearDataAction,
} from "@/actions/admin";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import YearAttendanceSummaryCard from "@/components/attendance/YearAttendanceSummaryCard";
import { AnnouncementListResponse, Lesson, StudentYearDataResponse } from "@/types/schemas";
import { Suspense } from "react";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// ── Skeleton Components ───────────────────────────────────────────────────────

const AnnouncementsSkeleton = () => (
    <div className="bg-white p-4 rounded-md skeleton-shimmer">
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

// ── Schedule section ──────────────────────────────────────────────────────────

const ScheduleSection = ({
    yearData,
    studentName,
}: {
    yearData: StudentYearDataResponse;
    studentName: string;
}) => {
    return (
        <div className="w-full">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold mb-1">
                    Schedule ({studentName})
                </h1>
                <p className="text-sm text-gray-500 mb-4">
                    Academic Year: {yearData.academic_year.year_label}
                    {yearData.class_name ? ` · Class: ${yearData.class_name}` : ""}
                    {yearData.grade_level != null ? ` · Grade ${yearData.grade_level}` : ""}
                </p>
                {yearData.lessons.length === 0 ? (
                    <p className="text-gray-400 text-sm">No lessons recorded for this year.</p>
                ) : (
                    <div className="w-full overflow-auto">
                        <BigCalendarContainer
                            initialLessons={yearData.lessons as unknown as Lesson[]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const ParentPage = async () => {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;
    const selectedChildCookieId = cookieStore.get("selected_child_id")?.value ?? null;

    // Fetch children list and academic years in parallel
    const [childrenResult, yearsResult] = await Promise.all([
        fetchChildrenOfParentAction(),
        fetchAcademicYearsAllAction(),
    ]);

    const children = childrenResult.data;
    const years = yearsResult.data;
    const activeYear = years.find((y) => y.is_active) ?? years[0] ?? null;

    // Resolve selected child
    const selectedChildId = selectedChildCookieId ?? children[0]?.id ?? null;
    const selectedChild = children.find((c) => c.id === selectedChildId) ?? children[0] ?? null;

    // Resolve selected year
    const resolvedYearId = selectedYearId ?? activeYear?.id ?? null;
    const selectedYear = years.find((y) => y.id === resolvedYearId) ?? activeYear;
    const announcementsFromDate = selectedYear?.start_date;
    const announcementsToDate = selectedYear?.end_date;

    const announcementsResult = await fetchAnnouncementsAction(
        undefined,
        1,
        announcementsFromDate,
        announcementsToDate,
        selectedChildCookieId
    );

    const announcements: AnnouncementListResponse = announcementsResult.data ?? {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    };

    // Fetch selected year data (lessons + attendance) for the selected student and year
    let selectedYearData: StudentYearDataResponse | null = null;
    if (selectedChild && resolvedYearId) {
        const yearDataResult = await fetchStudentYearDataAction(selectedChild.id, resolvedYearId);
        if (yearDataResult.success) {
            selectedYearData = yearDataResult.data;
        }
    }

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT - Selected Student Schedule */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                {!selectedChild ? (
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold">No Students Found</h1>
                        <p className="text-gray-500 mt-2">No students are currently assigned to your account.</p>
                    </div>
                ) : selectedYearData ? (
                    <ScheduleSection
                        yearData={selectedYearData}
                        studentName={`${selectedChild.first_name} ${selectedChild.last_name}`}
                    />
                ) : (
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold mb-2">
                            Schedule ({selectedChild.first_name} {selectedChild.last_name})
                        </h1>
                        <p className="text-gray-400 text-sm">No data found for the selected academic year.</p>
                    </div>
                )}
            </div>

            {/* RIGHT - Announcements */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                {selectedYearData && (
                    <YearAttendanceSummaryCard
                        yearData={selectedYearData}
                        title={`${selectedChild?.first_name ?? "Student"}'s Attendance`}
                    />
                )}
                <Suspense fallback={<AnnouncementsSkeleton />}>
                    {!announcementsResult.success ? (
                        <div className="bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold text-red-500">Error Loading Announcements</h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                {announcementsResult.error || "Unable to load announcements."}
                            </p>
                        </div>
                    ) : (
                        <Announcements
                            userId={selectedChildId}
                            role="parent"
                            initialAnnouncements={announcements}
                            fromDate={announcementsFromDate}
                            toDate={announcementsToDate}
                        />
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default ParentPage;
