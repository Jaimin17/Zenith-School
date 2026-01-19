'use client'

import { useMemo } from "react";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import type { Lesson } from "@/types/schemas";

const BigCalendarContainer = ({
  initialLessons
}: {
  initialLessons: Lesson[];
}) => {
  // Transform lessons data to calendar format
  const schedule = useMemo(() => {
    const mappedData = initialLessons?.map((lesson) => ({
      title: `${lesson.subject.name} - ${lesson.related_class.name}`,
      day: lesson.day,
      start: lesson.start_time,
      end: lesson.end_time,
    }));
    
    return adjustScheduleToCurrentWeek(mappedData);
  }, [initialLessons]);

  return (
    <div className="h-full">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;