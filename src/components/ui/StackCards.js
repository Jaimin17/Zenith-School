"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Box } from "@mui/material";

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

export default function StackCards({ data }) {


    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Box className="relative flex justify-center items-center py-24 bg-gray-100" sx={{ px: 12 }}>
            <Box className="relative w-full max-w-5xl h-[420px] md:h-[480px]">
                {/* Ribbon Bookmarks */}
                <Box className="absolute right-[-80px] top-6 flex flex-col gap-6 z-20">
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
                                    className={`relative px-6 py-2 font-semibold text-sm text-white shadow-lg transition-all duration-300`}
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
                                rotate: isActive ? 0 : index % 2 === 0 ? -2 : 2, // tilt only inactive
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
                                    <Typography variant="h4" fontWeight={600} md={{ variant: "h3" }} gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <motion.div
                                        variants={textContainer}
                                        initial="hidden"
                                        animate={isActive ? "visible" : "hidden"}
                                        color="text.secondary"
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
}
