"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  console.log("BigCalendar data:", data);

  return (
    <div className="h-full w-full min-w-0 overflow-x-auto overflow-y-hidden rounded-md">
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        style={{ height: "92%", width: "100%", minWidth: "680px" }}
        onView={handleOnChangeView}
        min={new Date(0, 0, 0, 7, 0, 0)}  // 7:00 AM
        max={new Date(0, 0, 0, 18, 0, 0)} // 6:00 PM
      />
    </div>
  );
};

export default BigCalendar;