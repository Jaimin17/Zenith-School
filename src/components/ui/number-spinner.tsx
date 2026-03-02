"use client";

import NumberFlow from "@number-flow/react";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface NumberSpinnerProps {
  trend?: -1 | 0 | 1;
  value?: number;
}

const NumberSpinner: React.FC<NumberSpinnerProps> = ({ trend = -1, value = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const [displayValue, setDisplayValue] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="counter-value block leading-none text-white text-[50px] font-semibold"
    >
      <NumberFlow
        trend={trend}
        value={displayValue}
        transformTiming={{ duration: 3000 }}
        spinTiming={{ duration: 3000 }}
        opacityTiming={{ duration: 400, easing: "ease-out" }}
      />
    </div>
  );
};

export default NumberSpinner;