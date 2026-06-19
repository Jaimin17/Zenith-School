import React from "react";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import {
    fetchAnnouncementsAction,
    fetchTeacherLessonsByYearAction,
} from "@/actions/admin";
import { Alert } from "@mui/material";
import { AnnouncementListResponse, Lesson } from "@/types/schemas";
import { cookies } from "next/headers";
import { resolveAcademicYearContext } from "@/lib/academicYear";

export const dynamic = "force-dynamic";

const TeacherPage = async () => {
    const cookieStore = await cookies();
    const selectedYearId = cookieStore.get("selected_year_id")?.value ?? null;

    const { selectedYear, resolvedYearId, fromDate, toDate } = await resolveAcademicYearContext(selectedYearId);

    const announcementsResult = await fetchAnnouncementsAction(undefined, 1, fromDate, toDate);

    let lessons: Lesson[] | null = null;
    let lessonsError: string | null = null;
    if (resolvedYearId) {
        const result = await fetchTeacherLessonsByYearAction(resolvedYearId);
        if (result.success) {
            lessons = result.data as unknown as Lesson[];
        } else {
            lessonsError = result.error ?? "Failed to load lessons for this year.";
        }
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

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3 flex flex-col gap-4">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-1">Schedule</h1>
                    {selectedYear && (
                        <p className="text-sm text-gray-500 mb-3">
                            Academic Year: {selectedYear.year_label}
                        </p>
                    )}

                    {lessonsError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {lessonsError}
                        </Alert>
                    )}

                    <div className="h-[calc(100%-4rem)]">
                        {!lessons || lessons.length === 0 ? (
                            <p className="text-gray-400 text-sm">No lessons recorded for this year.</p>
                        ) : (
                            <BigCalendarContainer initialLessons={lessons} />
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

                <Announcements
                    initialAnnouncements={announcements}
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </div>
        </div>
    );
};

export default TeacherPage;
