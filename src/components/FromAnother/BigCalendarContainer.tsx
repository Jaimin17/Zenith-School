'use client'

import { useEffect, useState } from "react";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

type LessonType = {
  name: string;
  startTime: string;
  endTime: string;
};

// Dummy API fetch function
const fetchLessons = async (type: "teacherId" | "classId", id: string | number): Promise<LessonType[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dummy data
  return [
    { name: "Math", startTime: "2025-12-09T09:00:00", endTime: "2025-12-09T10:00:00" },
    { name: "English", startTime: "2025-12-09T10:30:00", endTime: "2025-12-09T11:30:00" },
    { name: "Science", startTime: "2025-12-09T12:00:00", endTime: "2025-12-09T13:00:00" },
  ];
};

const BigCalendarContainer = ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const [schedule, setSchedule] = useState<{ title: string; start: Date; end: Date }[]>([]);

  useEffect(() => {
    const getLessons = async () => {
      const dataRes = await fetchLessons(type, id);
      const mappedData = dataRes.map((lesson) => ({
        title: lesson.name,
        start: lesson.startTime,
        end: lesson.endTime,
      }));
      setSchedule(adjustScheduleToCurrentWeek(mappedData));
    };

    getLessons();
  }, [type, id]);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
