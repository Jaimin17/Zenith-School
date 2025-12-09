'use client';

import Announcements from "@/components/FromAnother/Announcements";
import BigCalendarContainer from "@/components/FromAnother/BigCalendarContainer";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

const ParentPage = () => {
    const { user } = useAuth();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchStudents = async () => {
            try {
                // Replace this with real API call
                // const res = await fetch(`/api/students?parentId=${user.id}`, { cache: "no-store" });

                const res = {
                    ok: true, json: async () => [
                        { id: "1", name: "John", surname: "Doe", classId: "class-1" },
                        { id: "2", name: "Jane", surname: "Doe", classId: "class-2" }
                    ]
                };

                if (res.ok) {
                    const data = await res.json();
                    setStudents(data);
                } else {
                    setStudents([]);
                }
            } catch (error) {
                console.error(error);
                setStudents([]);
            }
        };

        fetchStudents();
    }, [user]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="flex-1 flex flex-col gap-4">
                {students.map((student) => (
                    <div className="w-full xl:w-2/3" key={student.id}>
                        <div className="h-full bg-white p-4 rounded-md">
                            <h1 className="text-xl font-semibold">
                                Schedule ({student.name} {student.surname})
                            </h1>
                            {student.classId && (
                                <BigCalendarContainer type="classId" id={student.classId} />
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default ParentPage;
