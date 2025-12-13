"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import CountChart from "./CountChart";

type StudentCount = {
  sex: "MALE" | "FEMALE";
  count: number;
};

const CountChartContainer = ({ data }: { data: StudentCount[] }) => {
  const boys = data.find(d => d.sex === "MALE")?.count ?? 0;
  const girls = data.find(d => d.sex === "FEMALE")?.count ?? 0;

  const total = boys + girls;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2,
        width: "100%",
        height: "100%",
        p: 2,
      }}
    >
      {/* TITLE */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Students
        </Typography>
        <Image src="/moreDark.png" alt="menu" width={20} height={20} />
      </Box>

      {/* CHART */}
      <CountChart boys={boys} girls={girls} />

      {/* BOTTOM */}
      <Box display="flex" justifyContent="center" gap={8} mt={2}>
        {/* Boys */}
        <Box display="flex" flexDirection="column" gap={0.5} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "lamaSky.main",
            }}
          />
          <Typography fontWeight={700}>{boys}</Typography>
          <Typography variant="caption" color="text.secondary">
            Boys ({total ? Math.round((boys / total) * 100) : 0}%)
          </Typography>
        </Box>

        {/* Girls */}
        <Box display="flex" flexDirection="column" gap={0.5} alignItems="center">
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              bgcolor: "lamaYellow.main",
            }}
          />
          <Typography fontWeight={700}>{girls}</Typography>
          <Typography variant="caption" color="text.secondary">
            Girls ({total ? Math.round((girls / total) * 100) : 0}%)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CountChartContainer;
