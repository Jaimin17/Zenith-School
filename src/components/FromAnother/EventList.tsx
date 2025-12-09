"use client";

import { useEffect, useState } from "react";

interface EventItem {
  id: number | string;
  title: string;
  description: string;
  startTime: string;
}

const EventList = ({ dateParam }: { dateParam: string | undefined }) => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const date = dateParam ? new Date(dateParam) : new Date();

    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const fetchEvents = async () => {
      try {
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?start=${startOfDay.toISOString()}&end=${endOfDay.toISOString()}`,
        //   { method: "GET", cache: "no-store" }
        // );

        const res = { ok: false }; // temporary dummy

        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        } else {
          // DUMMY DATA
          setEvents([
            {
              id: 1,
              title: "Math Workshop",
              description: "Algebra basics for Class 8",
              startTime: new Date().setHours(10, 30, 0, 0).toString(),
            },
            {
              id: 2,
              title: "Science Fair",
              description: "Student science project display",
              startTime: new Date().setHours(13, 0, 0, 0).toString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Events Load Error:", error);
      }
    };

    fetchEvents();
  }, [dateParam]);

  return (
    <>
      {events.map((event) => (
        <div
          className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          key={event.id}
        >
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-gray-600">{event.title}</h1>
            <span className="text-gray-300 text-xs">
              {new Date(event.startTime).toLocaleTimeString("en-UK", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </span>
          </div>

          <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
        </div>
      ))}
    </>
  );
};

export default EventList;
