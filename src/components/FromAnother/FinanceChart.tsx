"use client";

import Image from "next/image";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
  { name: "Jun", income: 2390, expense: 3800 },
  { name: "Jul", income: 3490, expense: 4300 },
  { name: "Aug", income: 3490, expense: 4300 },
  { name: "Sep", income: 3490, expense: 4300 },
  { name: "Oct", income: 3490, expense: 4300 },
  { name: "Nov", income: 3490, expense: 4300 },
  { name: "Dec", income: 3490, expense: 4300 },
];

const FinanceChart = () => {
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
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={600}>
          Finance
        </Typography>

        <Image src="/moreDark.png" alt="menu" width={20} height={20} />
      </Box>

      {/* CHART */}
      <Box sx={{ width: "100%", height: "90%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "#d1d5db" }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={20}
              tick={{ fill: "#d1d5db" }}
            />

            <Tooltip />

            <Legend
              align="center"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "30px",
              }}
            />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#C3EBFA"
              strokeWidth={5}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#CFCEFF"
              strokeWidth={5}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default FinanceChart;
