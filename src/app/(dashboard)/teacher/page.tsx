import React from "react";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import {
    fetchAnnouncementsAction,
    fetchLessonsWeeklyAction,
    fetchAcademicYearsAllAction,
    fetchTeacherLessonsByYearAction,
} from "@/actions/admin";
import { Alert } from "@mui/material";
import { AnnouncementListResponse, Lesson } from "@/types/schemas";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const TeacherPage = async () => {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;

    const [announcementsResult, yearsResult] = await Promise.all([
        fetchAnnouncementsAction(),
        fetchAcademicYearsAllAction(),
    ]);

    const years = yearsResult.data ?? [];
    const activeYear = years.find((y) => y.is_active) ?? years[0] ?? null;
    const resolvedYearId = selectedYearId ?? activeYear?.id ?? null;
    const isCurrentYear = !resolvedYearId || resolvedYearId === activeYear?.id;

    // For historical years, fetch all lessons tagged to that year
    let historicalLessons: Lesson[] | null = null;
    let historicalError: string | null = null;
    if (!isCurrentYear && resolvedYearId) {
        const result = await fetchTeacherLessonsByYearAction(resolvedYearId);
        if (result.success) {
            historicalLessons = result.data as unknown as Lesson[];
        } else {
            historicalError = result.error ?? "Failed to load lessons for this year.";
        }
    }

    // For current year, fetch weekly lessons
    let currentLessons: Lesson[] = [];
    let hasLessonsError = false;
    if (isCurrentYear) {
        const lessonsResult = await fetchLessonsWeeklyAction();
        hasLessonsError = !lessonsResult.success || !lessonsResult.data;
        currentLessons = lessonsResult.data ?? [];
    }

    const hasAnnouncementError = !announcementsResult.success || !announcementsResult.data;

    const announcements: AnnouncementListResponse = announcementsResult.data || {
        data: [],
        total_count: 0,
        page: 1,
        total_pages: 1,
        has_next: false,
        has_prev: false,
    };

    const selectedYear = years.find((y) => y.id === resolvedYearId);

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-1">Schedule</h1>
                    {!isCurrentYear && selectedYear && (
                        <p className="text-sm text-gray-500 mb-3">
                            Academic Year: {selectedYear.year_label}
                        </p>
                    )}

                    {/* Error Alert */}
                    {(hasLessonsError || historicalError) && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {historicalError || "Failed to load schedule"}
                        </Alert>
                    )}

                    {/* Calendar Container */}
                    <div className="h-[calc(100%-4rem)]">
                        {!isCurrentYear && historicalLessons !== null ? (
                            historicalLessons.length === 0 ? (
                                <p className="text-gray-400 text-sm">No lessons recorded for this year.</p>
                            ) : (
                                <BigCalendarContainer initialLessons={historicalLessons} />
                            )
                        ) : (
                            <BigCalendarContainer initialLessons={currentLessons} />
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {hasAnnouncementError && (
                    <Alert severity="error">
                        {announcementsResult.error || "Failed to load announcements"}
                    </Alert>
                )}

                <Announcements initialAnnouncements={announcements} />
            </div>
        </div>
    );
};

export default TeacherPage;