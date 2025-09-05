"use client";

import { Box, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation Variants
const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const child = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", damping: 16, stiffness: 240 },
    },
};

const subContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

const subChild = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export function AnimatedHeader({
    miniHeader,
    title,
    highlight,
    subtitle,
    descriptions = [], // array of strings for multiple paragraphs
    align = "left",
    color = "orange",
    titleVariant = "h4",
    subtitleVariant = "body1",
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <Box ref={ref} sx={{ textAlign: align, p: 2, pt: 6 }}>
            {/* Mini Header */}
            {miniHeader && (
                <Typography
                    component={motion.p}
                    variants={subContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variant="subtitle2"
                    align="left"
                    sx={{
                        color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        mb: 1,
                        display: "inline-block",
                        borderBottom: `2px solid ${color}`,
                        pb: 0.5,
                    }}
                >
                    {miniHeader.slice(0, 2)}
                    {miniHeader.slice(2).toString().split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={subChild}
                            style={{ display: "inline-block" }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </Typography>
            )}

            {/* Title with Highlight */}
            <Typography
                component={motion.h2}
                variants={container}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variant={titleVariant}
                sx={{ fontWeight: 800, mb: 2, lineHeight: 1.3 }}
            >
                {title.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={child}
                        style={{ display: "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
                {highlight && (
                    <motion.span
                        variants={child}
                        style={{ display: "inline-block", color }}
                    >
                        {highlight}
                    </motion.span>
                )}
            </Typography>

            {/* Subtitle (optional) */}
            {subtitle && (
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
                        mb: 2,
                        lineHeight: 1.7,
                    }}
                >
                    {subtitle.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            variants={subChild}
                            style={{ display: "inline-block", marginRight: "0.35em" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </Typography>
            )}

            {/* Multiple description paragraphs */}
            {descriptions.map((desc, idx) => (
                <Typography
                    key={idx}
                    component={motion.p}
                    variants={subContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
                >
                    {desc.split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            variants={subChild}
                            style={{ display: "inline-block", marginRight: "0.35em" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </Typography>
            ))}
        </Box>
    );
}
