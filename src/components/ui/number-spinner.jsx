"use client";

import NumberFlow from "@number-flow/react";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

function NumberSpinner({ trend = -1, value = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="counter">
      <NumberFlow
        trend={trend}
        value={displayValue}
        transformTiming={{ duration: 3000 }}
        spinTiming={{ duration: 3000 }}
        opacityTiming={{ duration: 400, easing: "ease-out" }}
      />
    </div>
  );
}

export default NumberSpinner;
