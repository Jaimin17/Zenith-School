'use client'

import { useEffect, useState } from "react";

type AnnouncementType = {
  title: string;
  description: string;
  date: string;
};

// Dummy fetch function
const fetchData = async (url: string, payload?: any): Promise<AnnouncementType[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return dummy data
  return [
    { title: "New Lesson Added", description: "A new lesson has been added to your class.", date: "2025-12-09" },
    { title: "Exam Schedule", description: "The exam schedule has been published.", date: "2025-12-08" },
    { title: "Holiday Announcement", description: "School will be closed tomorrow.", date: "2025-12-07" },
  ];
};

const Announcements = () => {
  const [data, setData] = useState<AnnouncementType[]>([]);
  const userId = "admin1";
  const role = "admin";

  useEffect(() => {
    const getAnnouncements = async () => {
      // const result = await fetchData("/api/announcements", { userId, role });
      const result = [];
      setData(result.slice(0, 3)); // take only first 3
    };
    getAnnouncements();
  }, []);

  const colors = ["bg-lamaSkyLight", "bg-lamaPurpleLight", "bg-lamaYellowLight"];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer">View All</span>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {data.map((announcement, idx) => (
          <div key={idx} className={`${colors[idx % colors.length]} rounded-md p-4`}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(new Date(announcement.date))}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
