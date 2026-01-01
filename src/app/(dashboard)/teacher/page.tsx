import Announcements from "@/components/FromAnother/Announcements";
import BigCalendarContainer from "@/components/FromAnother/BigCalendarContainer";

const TeacherPage = () => {
    // const { userId } = auth();
    const userId = '5dd780f6-cee9-42d9-a0f1-a9328091d302'
    return (
        <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold">Schedule</h1>
                    <BigCalendarContainer type="teacherId" id={userId} />
                </div>
            </div>
            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default TeacherPage;



