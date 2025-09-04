"use client";

import React from "react";
import NumberSpinner from "../ui/number-spinner";
import { Box, Container, Typography } from "@mui/material";

function SchoolStatistics() {
  const stats = [
    { value: 25, label: "Acres Campus Area" },
    { value: 50, label: "Years of Excellence" },
    { value: 3000, label: "Students" },
    { value: 200, label: "Faculties" },
    { value: 100, label: "Co-Curricular Activities" },
    { value: 500, label: "Class Modules of all Subjects" },
  ];

  return (
    <Container sx={{ py: 8 }}>
      <Box className="flex flex-wrap justify-center gap-10">
        {stats.map((stat, index) => (
          <Box
            key={index}
            className="flex flex-col items-center text-center w-80"
          >
            <Typography
              variant="h3"
              component="div"
              color="primary"
              fontWeight="500"
              className="flex items-center"
            >
              <NumberSpinner trend={1} value={stat.value} />
              {index > 0 && <span>+</span>}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 500, color: "text.secondary" }}
            >
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default SchoolStatistics;
