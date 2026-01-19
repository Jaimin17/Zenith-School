import React from "react";
import Announcements from "../../../components/FromAnother/Announcements";
import BigCalendarContainer from "../../../components/FromAnother/BigCalendarContainer";
import { fetchAnnouncementsAction, fetchLessonsWeeklyAction } from "@/actions/admin";
import { Alert, Box } from "@mui/material";

const TeacherPage = async () => {
    // Fetch data in parallel on the server
    const [announcementsResult, lessonsResult] = await Promise.all([
        fetchAnnouncementsAction(),
        fetchLessonsWeeklyAction()
    ]);

    // Handle errors
    const hasAnnouncementError = !announcementsResult.success || !announcementsResult.data;
    const hasLessonsError = !lessonsResult.success || !lessonsResult.data;

    if (hasAnnouncementError) {
        console.error('Failed to fetch announcements:', announcementsResult.error);
    }

    if (hasLessonsError) {
        console.error('Failed to fetch lessons:', lessonsResult.error);
    }

    const announcements = announcementsResult.data || [];
    const lessons = lessonsResult.data || [];

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold mb-4">Schedule</h1>

                    {/* Error Alert for Lessons */}
                    {hasLessonsError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {lessonsResult.error || 'Failed to load schedule'}
                        </Alert>
                    )}

                    {/* Calendar Container */}
                    <div className="h-[calc(100%-4rem)]">
                        <BigCalendarContainer initialLessons={lessons} />
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {/* Error Alert for Announcements */}
                {hasAnnouncementError && (
                    <Alert severity="error">
                        {announcementsResult.error || 'Failed to load announcements'}
                    </Alert>
                )}

                <Announcements initialAnnouncements={announcements} />
            </div>
        </div>
    );
};

export default TeacherPage;