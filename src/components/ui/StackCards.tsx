"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import React from "react";

// Utility for staggered text animation
const textContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const textItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

interface StackCardItem {
  bookmark: string;
  image: string;
  title: string;
  description: string;
}

interface StackCardsProps {
  data: StackCardItem[];
}

const StackCards: React.FC<StackCardsProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box className="relative flex justify-center items-center py-24 bg-gray-100 px-4 sm:px-10 md:px-20">
      <Box className="relative w-full max-w-5xl h-[420px] md:h-[480px]">
        {/* Desktop: Ribbon Bookmarks - Hidden on mobile */}
        <Box
          className="absolute right-[-80px] top-6 flex-col gap-6 z-20"
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                className="cursor-pointer relative"
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  className="relative px-3 md:px-6 py-2 font-semibold text-sm text-white shadow-lg transition-all duration-300"
                  sx={{
                    background: isActive
                      ? "linear-gradient(135deg, #facc15, #ca8a04)"
                      : "linear-gradient(135deg, #6b7280, #374151)",
                    clipPath:
                      "polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%, 10% 50%)",
                    borderTopLeftRadius: "6px",
                    borderBottomLeftRadius: "6px",
                  }}
                >
                  {item.bookmark}
                  {/* Ribbon connector */}
                  <Box
                    className="absolute left-[-14px] top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md"
                    sx={{
                      backgroundColor: isActive ? "#facc15" : "#6b7280",
                      transition: "background-color 0.3s ease",
                    }}
                  />
                </Box>
              </motion.div>
            );
          })}
        </Box>

        {/* Mobile: Navigation Buttons - Hidden on desktop */}
        <Box
          className="absolute top-1/2 left-4 right-4 flex justify-between items-center z-20 pointer-events-none"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <motion.div
            className="pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={goToPrevious}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
                width: 48,
                height: 48,
              }}
            >
              <ChevronLeft sx={{ fontSize: 28, color: "#374151" }} />
            </IconButton>
          </motion.div>

          <motion.div
            className="pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton
              onClick={goToNext}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
                },
                width: 48,
                height: 48,
              }}
            >
              <ChevronRight sx={{ fontSize: 28, color: "#374151" }} />
            </IconButton>
          </motion.div>
        </Box>

        {/* Mobile: Dot Indicators */}
        <Box
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          {data.map((_, index) => (
            <Box
              key={index}
              className="cursor-pointer transition-all duration-300"
              onClick={() => setActiveIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor:
                  activeIndex === index ? "#facc15" : "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          ))}
        </Box>

        {/* Cards */}
        {data.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full"
              animate={{
                zIndex: isActive ? 10 : 5,
                scale: isActive ? 1 : 0.95,
                y: isActive ? 0 : index * 20,
                opacity: isActive ? 1 : 0.85,
                rotate: isActive ? 0 : index % 2 === 0 ? -2 : 2,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            >
              <Card className="flex flex-col md:flex-row h-full shadow-xl rounded-2xl overflow-hidden relative">
                {/* Left Side Image */}
                <Box className="w-full md:w-1/2 h-40 md:h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Box>

                {/* Right Side Text */}
                <CardContent className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-6">
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <motion.div
                    variants={textContainer}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    style={{ color: "rgba(0, 0, 0, 0.6)" }}
                  >
                    {item.description.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        variants={textItem}
                        className="inline-block mr-1"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default StackCards;