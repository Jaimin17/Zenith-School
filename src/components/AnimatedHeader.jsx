"use client";

import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Variants for title animation (char by char)
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const child = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            damping: 14,
            stiffness: 220,
        },
    },
};

// Variants for subtitle animation (word by word)
const subContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    },
};

const subChild = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export function AnimatedHeader({
    title,
    subtitle,
    align = "center",
    titleVariant = "h4",
    subtitleVariant = "body1",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <Box ref={ref} sx={{ textAlign: align, px: 2 }}>
            {/* Title Animation */}
            <Typography
                component={motion.h1}
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variant={titleVariant}
                aria-label={title}
                sx={{
                    mt: 6,
                    mb: 2,
                    fontWeight: 800,
                    letterSpacing: "-0.5px",
                    display: "inline-block",
                }}
            >
                {title.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={child}
                        style={{ display: "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </Typography>

            {/* Subtitle Animation */}
            <Typography
                component={motion.p}
                variants={subContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variant={subtitleVariant}
                sx={{
                    maxWidth: "700px",
                    mx: align === "center" ? "auto" : undefined,
                    color: "text.secondary",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                }}
            >
                {subtitle.split(" ").map((word, index) => (
                    <motion.span
                        key={index}
                        variants={subChild}
                        style={{ display: "inline-block", marginRight: "0.35em" }}
                    >
                        {word}
                    </motion.span>
                ))}
            </Typography>
        </Box>
    );
}
