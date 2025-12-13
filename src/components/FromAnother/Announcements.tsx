import { Box, Typography } from "@mui/material";

type Announcement = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const cardColors = [
  "rgba(56, 189, 248, 0.15)",   // sky light
  "rgba(168, 85, 247, 0.15)",   // purple light
  "rgba(250, 204, 21, 0.15)",   // yellow light
];

const Announcements = async () => {
  const userId = "admin1";
  const role = "admin";

  // -------------------------
  // API CALL
  // -------------------------
  let data: Announcement[] = [];

  // try {
  //   // const res = await fetch(
  //   //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/announcements?role=${role}&userId=${userId}&limit=3`,
  //   //   { cache: "no-store" }
  //   // );

  //   const res = {}

  //   if (res.ok) {
  //     data = await res.json();
  //   }
  // } catch {
  // ---------- FALLBACK DUMMY DATA ----------
  data = [
    {
      id: "1",
      title: "Exam Schedule Released",
      description: "Mid-term exams will start from 10th Oct.",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Parent Meeting",
      description: "PTM scheduled for next Friday.",
      date: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Holiday Notice",
      description: "School will remain closed on Monday.",
      date: new Date().toISOString(),
    },
  ];
  // }

  return (
    <Box bgcolor="#fff" p={2} borderRadius={2}>
      {/* HEADER */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" fontWeight={600}>
          Announcements
        </Typography>
        <Typography variant="caption" color="text.secondary">
          View All
        </Typography>
      </Box>

      {/* LIST */}
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {data.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              bgcolor: cardColors[index % cardColors.length],
              p: 2,
              borderRadius: 2,
            }}
          >
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight={500}>{item.title}</Typography>
              <Box
                sx={{
                  bgcolor: "#fff",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {new Intl.DateTimeFormat("en-GB").format(
                    new Date(item.date)
                  )}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={0.5}
            >
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Announcements;
