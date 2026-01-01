'use client';

import Announcements from "@/components/FromAnother/Announcements";
import BigCalendarContainer from "@/components/FromAnother/BigCalendarContainer";
import EventCalendar from "@/components/FromAnother/EventCalendar";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

interface ClassItem {
    id: string;
    name: string;
}

const StudentPage = () => {
    const { user } = useAuth();
    const [classItem, setClassItem] = useState<ClassItem[]>([{ id: "", name: "" }]);

    useEffect(() => {
        if (!user) return;

        const fetchClass = async (userId: string | number) => {
            try {
                // Dummy fetch
                const res = null;
                if (res && res.ok) {
                    const data = await res.json();
                    setClassItem(data || [{ id: "dummy-class-id", name: "4A" }]);
                } else {
                    setClassItem([{ id: "dummy-class-id", name: "4A" }]);
                }
            } catch {
                setClassItem([{ id: "dummy-class-id", name: "4A" }]);
            }
        };

        fetchClass(user.id);
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">
                        Schedule ({classItem[0].name})
                    </h1>
                    {classItem[0].id && (
                        <BigCalendarContainer type="classId" id={classItem[0].id} />
                    )}
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <EventCalendar />
                <Announcements />
            </div>
        </div>
    );
};

export default StudentPage;



