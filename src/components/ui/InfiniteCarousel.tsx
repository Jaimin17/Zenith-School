"use client";

import { Box } from "@mui/material";
import { motion, useMotionValue, useAnimationFrame, MotionValue } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import React from "react";

interface InfiniteCarouselProps<T> {
  data?: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  cardWidth?: number;
  gap?: number;
  speed?: number;
}

export default function InfiniteCarousel<T = any>({
  data = [],
  renderCard,
  cardWidth = 320,
  gap = 24,
  speed = 45,
}: InfiniteCarouselProps<T>) {
  // Calculate the total width of one set of cards
  const singleSetWidth = data.length * (cardWidth + gap);

  // Triplicate the data for seamless looping
  const LOOP_DATA = useMemo(() => [...data, ...data, ...data], [data]);

  // Motion state
  const x: MotionValue<number> = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Normalize x into (-singleSetWidth, 0]
  const normalize = (v: number): number => {
    const w = singleSetWidth;
    if (!w) return v;
    let mod = ((v % w) + w) % w;
    return mod === 0 ? 0 : mod - w;
  };

  // Animate movement frame by frame
  useAnimationFrame((_, delta) => {
    if (paused || dragging) return;
    const deltaPx = -(speed * (delta / 1000));
    x.set(normalize(x.get() + deltaPx));
  });

  // Ensure smooth looping by snapping back within range
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const n = normalize(v);
      if (n !== v) x.set(n);
    });
    return unsub;
  }, [x, singleSetWidth]);

  return (
    <Box sx={{ overflow: "hidden", bgcolor: "#ffffff" }}>
      <Box
        sx={{
          p: "10px 10px 10px 10px",
          position: "relative",
          overflow: "hidden",
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
            <Box key={idx} sx={{ flexShrink: 0, width: `${cardWidth}px` }}>
              {renderCard(item, idx)}
            </Box>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}