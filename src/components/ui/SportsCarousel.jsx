"use client";

import { Box, Card, CardMedia, Typography } from "@mui/material";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SPORTS_DATA = [
    {
        image: "https://placehold.co/600x800",
        title: "Football",
        description: "Team spirit, endurance, and strategy on the field.",
    },
    {
        image: "https://placehold.co/600x800",
        title: "Basketball",
        description: "Fast-paced action and teamwork.",
    },
    {
        image: "https://placehold.co/600x800",
        title: "Cricket",
        description: "The gentleman’s game loved by all.",
    },
    {
        image: "https://placehold.co/600x800",
        title: "Swimming",
        description: "Strength and stamina in the water.",
    },
    {
        image: "https://placehold.co/600x800",
        title: "Tennis",
        description: "Precision, agility, and power.",
    },
];

export default function SportsCarousel() {
    // ---- Tunables
    const CARD_W = 400; // desktop card width
    const GAP = 20; // px
    const SPEED = 60; // px per second

    // ---- Derived widths
    const singleSetWidth = SPORTS_DATA.length * (CARD_W + GAP);
    const LOOP_DATA = useMemo(() => [...SPORTS_DATA, ...SPORTS_DATA, ...SPORTS_DATA], []);

    // ---- Motion + state
    const x = useMotionValue(0);
    const [paused, setPaused] = useState(false);
    const [dragging, setDragging] = useState(false);

    // Normalize x into (-singleSetWidth, 0]
    const normalize = (v) => {
        const w = singleSetWidth;
        if (!w) return v;
        let mod = ((v % w) + w) % w;
        return mod === 0 ? 0 : mod - w;
    };

    useAnimationFrame((t, delta) => {
        if (paused || dragging) return;
        const deltaPx = -(SPEED * (delta / 1000));
        x.set(normalize(x.get() + deltaPx));
    });

    useEffect(() => {
        const unsub = x.on("change", (v) => {
            const n = normalize(v);
            if (n !== v) x.set(n);
        });
        return unsub;
    }, [x, singleSetWidth]);

    return (
        <Box sx={{ overflow: "hidden", py: 6, }}>
            <Box
                sx={{
                    // border: '1px solid red',
                    p: '10px 10px 40px 10px ',
                    position: "relative",
                    overflow: "hidden",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    maskImage:
                        "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    cursor: "grab",
                    "&:active": { cursor: "grabbing" },
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
            >
                <motion.div
                    style={{
                        display: "flex",
                        gap: `${GAP}px`,
                        x,
                        willChange: "transform",
                        padding: "10px",
                    }}
                    drag="x"
                    dragElastic={0}
                    dragMomentum={true}
                    onDragStart={() => setDragging(true)}
                    onDragEnd={() => setDragging(false)}
                >
                    {LOOP_DATA.map((sport, idx) => (
                        <Card
                            key={`${sport.title}-${idx}`}
                            sx={{
                                width: {
                                    xs: 240, // mobile
                                    sm: 280, // small tablet
                                    md: 340, // tablet
                                    lg: 400, // desktop
                                },
                                height: { xs: 300, sm: 340, md: 380, lg: 450 },
                                borderRadius: "20px",
                                overflow: "hidden",
                                position: "relative",
                                flexShrink: 0,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                                transition: "transform 0.3s ease",
                                "&:hover": { transform: "scale(1.04)" },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={sport.image}
                                alt={sport.title}
                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <Box
                                className="overlay"
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    p: 3,
                                    color: "#fff",
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                    {sport.title}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {sport.description}
                                </Typography>
                            </Box>
                        </Card>
                    ))}
                </motion.div>
            </Box>
        </Box>
    );
}
