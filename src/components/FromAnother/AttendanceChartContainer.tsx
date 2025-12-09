"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AttendanceChart from "./AttendanceChart";

const AttendanceChartContainer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);

    // Simulated API call
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data (replace later)
      const resData = [
        { date: new Date(), present: true },
        { date: new Date(), present: false },
        { date: new Date(), present: true },
      ];

      const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

      const attendanceMap = {
        Mon: { present: 0, absent: 0 },
        Tue: { present: 0, absent: 0 },
        Wed: { present: 0, absent: 0 },
        Thu: { present: 0, absent: 0 },
        Fri: { present: 0, absent: 0 },
      };

      resData.forEach((item) => {
        const itemDate = new Date(item.date);
        const dow = itemDate.getDay();

        if (dow >= 1 && dow <= 5) {
          const day = daysOfWeek[dow - 1];
          if (item.present) attendanceMap[day].present += 1;
          else attendanceMap[day].absent += 1;
        }
      });

      const formatted = daysOfWeek.map((day) => ({
        name: day,
        present: attendanceMap[day].present,
        absent: attendanceMap[day].absent,
      }));

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
