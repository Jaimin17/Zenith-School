const StudentAttendanceCard = async ({ id }: { id: string }) => {
  // Helper for API fetching
  async function fetchApi(endpoint: string, fallback: any[]) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`,
        { cache: "no-store" }
      );

      if (res.ok) return res.json();
      return fallback;
    } catch {
      return fallback;
    }
  }

  // Fetch attendance (REAL API OR FALLBACK)
  // const attendance = await fetchApi(`/api/attendance?studentId=${id}`, [
  //   // --- dummy fallback data ----
  //   { present: true, date: "2025-01-10" },
  //   { present: false, date: "2025-01-11" },
  //   { present: true, date: "2025-01-12" },
  // ]);

  const attendance = [
    // --- dummy fallback data ----
    { present: true, date: "2025-01-10" },
    { present: false, date: "2025-01-11" },
    { present: true, date: "2025-01-12" },
  ];

  const totalDays = attendance.length;
  const presentDays = attendance.filter((d) => d.present).length;
  const percentage = totalDays ? (presentDays / totalDays) * 100 : 0;

  return (
    <div className="">
      <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
