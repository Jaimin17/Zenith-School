"use client";

import Image from "next/image";
import { Box, Typography, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";

type UserStat = {
  name: "admin" | "teacher" | "student" | "parent";
  count: number;
};

const typeColorMap: Record<UserStat["name"], string> = {
  admin: "#4CAF50",
  teacher: "#2196F3",
  student: "#FF9800",
  parent: "#9C27B0",
};

const UserCard = ({ stat }: { stat: UserStat }) => {
  const baseColor = typeColorMap[stat.name];

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        flex: 1,
        minWidth: 130,
        backgroundColor: alpha(baseColor, 0.12),
        border: `1px solid ${alpha(baseColor, 0.3)}`,
      }}
    >
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Chip
          label="2024 / 25"
          size="small"
          sx={{
            fontSize: 10,
            bgcolor: "#fff",
            height: 20,
          }}
        />

        <Image src="/more.png" alt="menu" width={20} height={20} />
      </Box>

      {/* Count */}
      <Typography variant="h5" fontWeight={600} my={2}>
        {stat.count}
      </Typography>

      {/* Label */}
      <Typography
        variant="body2"
        sx={{ textTransform: "capitalize", color: "text.secondary" }}
      >
        {stat.name}s
      </Typography>
    </Box>
  );
};

export default UserCard;
