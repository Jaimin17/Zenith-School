import React from "react";
import Announcements from "../../../components/FromAnother/Announcements";
import AttendanceChartContainer from "../../../components/FromAnother/AttendanceChartContainer";
import CountChartContainer from "../../../components/FromAnother/CountChartContainer";
import EventCalendarContainer from "../../../components/FromAnother/EventCalendarContainer";
import FinanceChart from "../../../components/FromAnother/FinanceChart";
import UserCard from "../../../components/FromAnother/UserCard";
import { Box } from "@mui/material";
import type { StudentCount } from "../../../components/FromAnother/CountChartContainer";
import type { UserStat } from "../../../components/FromAnother/UserCard";
import { fetchUserCountsAction, fetchAnnouncementsAction } from "@/actions/admin";
import { AnnouncementListResponse } from "@/types/schemas";

const AdminPage = async () => {
  // Fetch data on server in parallel
  const [userCountsResult, announcementsResult] = await Promise.all([
    fetchUserCountsAction(),
    fetchAnnouncementsAction(),
  ]);

  // Handle errors - you might want to show error UI instead
  if (!userCountsResult.success || !userCountsResult.data) {
    console.error('Failed to fetch user counts:', userCountsResult.error);
  }

  if (!announcementsResult.success || !announcementsResult.data) {
    console.error('Failed to fetch announcements:', announcementsResult.error);
  }

  // Transform data for components
  const usersCount = userCountsResult.data || {
    admins: 0,
    teachers: 0,
    students: {
      boys: 0,
      girls: 0,
    },
    parents: 0,
  };

  const userStats: UserStat[] = [
    { name: "admin", count: usersCount.admins },
    { name: "teacher", count: usersCount.teachers },
    { name: "student", count: usersCount.students.boys + usersCount.students.girls },
    { name: "parent", count: usersCount.parents },
  ];

  const studentStats: StudentCount[] = [
    { sex: "MALE", count: usersCount.students.boys },
    { sex: "FEMALE", count: usersCount.students.girls },
  ];

  const announcements: AnnouncementListResponse = announcementsResult.data || {
    data: [],
    total_count: 0,
    page: 1,
    total_pages: 1,
    has_next: false,
    has_prev: false,
  };

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <Box display="flex" gap={2} flexWrap="wrap">
          {userStats.map(stat => (
            <UserCard key={stat.name} stat={stat} />
          ))}
        </Box>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer data={studentStats} />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        {/* <div className="w-full h-[500px]">
          <FinanceChart />
        </div> */}
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendarContainer />
        <Announcements initialAnnouncements={announcements} />
      </div>
    </div>
  );
};

export default AdminPage;