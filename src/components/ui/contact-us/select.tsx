"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

const DEFAULT_ACCENT = "#f97316"; // Tailwind orange-500

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  accent?: string;
  children: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, accent = DEFAULT_ACCENT, ...props }, ref) => {
    const radius = 100; // radius of hover effect
    const [visible, setVisible] = React.useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              ${accent},
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/select rounded-lg p-[2px] transition duration-300"
      >
        <select
          ref={ref}
          className={cn(
            `shadow-input flex h-10 w-full rounded-md border-none bg-white px-3 py-2 text-sm text-black transition duration-400 group-hover/select:shadow-none focus-visible:ring-[2px] focus-visible:ring-orange-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          {...props}
        >
          {children}
        </select>
      </motion.div>
    );
  }
);

Select.displayName = "Select";

export { Select };