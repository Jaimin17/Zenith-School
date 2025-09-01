"use client";

import { Box } from "@mui/material";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function InfiniteCarousel({
    data = [],
    renderCard,
    cardWidth = 400, // default desktop width
    gap = 20,
    speed = 60,
}) {
    // Derived width for one full set
    const singleSetWidth = data.length * (cardWidth + gap);
    const LOOP_DATA = useMemo(() => [...data, ...data, ...data], [data]);

    // Motion state
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

    // Auto-move
    useAnimationFrame((t, delta) => {
        if (paused || dragging) return;
        const deltaPx = -(speed * (delta / 1000));
        x.set(normalize(x.get() + deltaPx));
    });

    // Snap into loop range
    useEffect(() => {
        const unsub = x.on("change", (v) => {
            const n = normalize(v);
            if (n !== v) x.set(n);
        });
        return unsub;
    }, [x, singleSetWidth]);

    return (
        <Box sx={{ overflow: "hidden", py: 6 }}>
            <Box
                sx={{
                    p: "10px 10px 40px 10px",
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
                        gap: `${gap}px`,
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
                    {LOOP_DATA.map((item, idx) => (
                        <Box key={idx} sx={{ flexShrink: 0 }}>
                            {renderCard(item, idx)}
                        </Box>
                    ))}
                </motion.div>
            </Box>
        </Box>
    );
}
