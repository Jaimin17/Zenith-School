"use client";

import { cn } from "@/lib/utils";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Box
          key={idx}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-orange-200 dark:bg-orange/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />

            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>

            {/* Job details section */}
            <div className="grid grid-cols-2 gap-6 my-4">
              <div>
                <p className="text-gray-500 text-sm">Experience</p>
                <p className="font-semibold text-gray-900">{item.experience}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Positions</p>
                <p className="font-semibold text-gray-900">{item.positions}</p>
              </div>
            </div>

            {/* Apply button only */}
            <div className="flex mt-6">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("formTitle")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="theme-btn"
              >
                Apply Now
              </a>

            </div>
          </Card>
        </Box>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-white border border-gray-200 relative z-20 shadow hover:shadow-lg transition",
        className
      )}
    >
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-lg font-bold tracking-wide text-gray-900", className)}>
      {children}
    </h4>
  );
};
