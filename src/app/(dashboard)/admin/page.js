'use client'

import { useAuth } from "@/contexts/authContext"

import Announcements from "@/components/FromAnother/Announcements";
import AttendanceChartContainer from "@/components/FromAnother/AttendanceChartContainer";
import CountChartContainer from "@/components/FromAnother/CountChartContainer";
import EventCalendarContainer from "@/components/FromAnother/EventCalendarContainer";
import FinanceChart from "@/components/FromAnother/FinanceChart";
import UserCard from "@/components/FromAnother/UserCard";

const AdminPage = ({
    searchParams,
}) => {
    const { user } = useAuth()
    console.log('User in admin Page', user)
    return (
        <><div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* USER CARDS */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="admin" />
                    <UserCard type="teacher" />
                    <UserCard type="student" />
                    <UserCard type="parent" />
                </div>
                {/* MIDDLE CHARTS */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* COUNT CHART */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChartContainer />
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
        </>
    )

}

export default AdminPage