'use client'

import { useAuth } from "../../../contexts/authContext";
import Announcements from "../../../components/FromAnother/Announcements";
import AttendanceChartContainer from "../../../components/FromAnother/AttendanceChartContainer";
import CountChartContainer from "../../../components/FromAnother/CountChartContainer";
import EventCalendarContainer from "../../../components/FromAnother/EventCalendarContainer";
import FinanceChart from "../../../components/FromAnother/FinanceChart";
import UserCard from "../../../components/FromAnother/UserCard";
import { Box } from "@mui/material";

interface StudentStat {
    sex: string;
    count: number;
}

interface AdminPageProps {
    searchParams?: Record<string, string | string[] | undefined>;
}

const AdminPage: React.FC<AdminPageProps> = ({ searchParams }) => {
    const { user } = useAuth()
    console.log('User in admin Page', user)

    const userStats: UserStat[] = [
        { name: "admin", count: 2 },
        { name: "teacher", count: 213 },
        { name: "student", count: 49 },
        { name: "parent", count: 234 },
    ];

    const studentStats: StudentStat[] = [
        { sex: "MALE", count: 120 },
        { sex: "FEMALE", count: 95 },
    ];

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
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCalendarContainer searchParams={searchParams} />
                <Announcements />
            </div>
        </div>
    )
}

export default AdminPage