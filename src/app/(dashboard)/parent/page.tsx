import {
    fetchAnnouncementsAction,
    fetchLessonsForStudentsWeeklyAction,
    fetchChildrenOfParentAction,
    fetchAcademicYearsAllAction,
    fetchStudentYearDataAction,
} from "@/actions/admin";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import { Announcement, AnnouncementListResponse, Lesson, LessonBase, StudentYearDataResponse } from "@/types/schemas";
import { Suspense } from "react";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// ── Skeleton Components ───────────────────────────────────────────────────────

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

// ── Historical year schedule (rendered when a past year is selected) ──────────

const HistoricalSchedule = ({
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
                        {/* Convert LessonBase[] to Lesson[] shape for BigCalendarContainer */}
                        <BigCalendarContainer
                            initialLessons={yearData.lessons as unknown as Lesson[]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Current-year schedule ─────────────────────────────────────────────────────

const CurrentSchedule = async ({
    studentId,
    studentName,
    hasClass,
}: {
    studentId: string;
    studentName: string;
    hasClass: boolean;
}) => {
    if (!hasClass) {
        return (
            <div className="w-full">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-4">Schedule ({studentName})</h1>
                    <p className="text-gray-500 text-sm">No class assigned to this student.</p>
                </div>
            </div>
        );
    }

    const lessonsResult = await fetchLessonsForStudentsWeeklyAction(studentId);

    if (!lessonsResult.success || !lessonsResult.data) {
        return (
            <div className="w-full">
                <div className="bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-4">Schedule ({studentName})</h1>
                    <p className="text-red-500 text-sm">Failed to load schedule. Please try again later.</p>
                </div>
            </div>
        );
    }

    const lessons: Lesson[] = lessonsResult.data;

    return (
        <div className="w-full">
            <div className="bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold mb-4">Schedule ({studentName})</h1>
                <div className="w-full overflow-auto">
                    <BigCalendarContainer initialLessons={lessons} />
                </div>
            </div>
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────────

const ParentPage = async () => {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;
    const selectedChildCookieId = cookieStore.get("selected_child_id")?.value ?? null;

    // Fetch children list, academic years, and announcements in parallel
    const [childrenResult, yearsResult] = await Promise.all([
        fetchChildrenOfParentAction(),
        fetchAcademicYearsAllAction(),
    ]);

    const children = childrenResult.data;
    const years = yearsResult.data;
    const activeYear = years.find((y) => y.is_active) ?? years[0] ?? null;

    const announcementsResult = await fetchAnnouncementsAction(undefined, 1, activeYear?.start_date, activeYear?.end_date, selectedChildCookieId);

    // Resolve selected child
    const selectedChildId = selectedChildCookieId ?? children[0]?.id ?? null;
    const selectedChild = children.find((c) => c.id === selectedChildId) ?? children[0] ?? null;

    // Resolve selected year
    const resolvedYearId = selectedYearId ?? activeYear?.id ?? null;
    const isCurrentYear = !resolvedYearId || resolvedYearId === activeYear?.id;

    const announcements: AnnouncementListResponse = announcementsResult.data ?? {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    };

    // If viewing a historical year, fetch the year-data for the selected child
    let historicalYearData: StudentYearDataResponse | null = null;
    if (!isCurrentYear && selectedChild && resolvedYearId) {
        const yearDataResult = await fetchStudentYearDataAction(selectedChild.id, resolvedYearId);
        if (yearDataResult.success) {
            historicalYearData = yearDataResult.data;
        }
    }

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT - Selected Student Schedule */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                {/* Schedule content */}
                {!selectedChild ? (
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold">No Students Found</h1>
                        <p className="text-gray-500 mt-2">No students are currently assigned to your account.</p>
                    </div>
                ) : !isCurrentYear && historicalYearData ? (
                    <HistoricalSchedule
                        yearData={historicalYearData}
                        studentName={`${selectedChild.first_name} ${selectedChild.last_name}`}
                    />
                ) : !isCurrentYear && !historicalYearData ? (
                    <div className="bg-white p-4 rounded-md">
                        <h1 className="text-xl font-semibold mb-2">
                            Schedule ({selectedChild.first_name} {selectedChild.last_name})
                        </h1>
                        <p className="text-gray-400 text-sm">No data found for the selected academic year.</p>
                    </div>
                ) : (
                    <Suspense fallback={<BigCalendarSkeleton />}>
                        <CurrentSchedule
                            studentId={selectedChild.id}
                            studentName={`${selectedChild.first_name} ${selectedChild.last_name}`}
                            hasClass={!!selectedChild}
                        />
                    </Suspense>
                )}
            </div>

            {/* RIGHT - Announcements */}
            <div className="w-full xl:w-1/3 flex flex-col gap-4">
                <Suspense fallback={<AnnouncementsSkeleton />}>
                    {!announcementsResult.success ? (
                        <div className="bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold text-red-500">Error Loading Announcements</h1>
                            <p className="text-gray-600 mt-2 text-sm">
                                {announcementsResult.error || "Unable to load announcements."}
                            </p>
                        </div>
                    ) : (
                        <Announcements userId={selectedChildId} activeYear={activeYear} role="parent" initialAnnouncements={announcements} />
                    )}
                </Suspense>
            </div>
        </div>
    );
};

export default ParentPage;
