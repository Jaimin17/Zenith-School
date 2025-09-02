"use client";

import { motion } from "framer-motion";

export const ContentPlaceHolder = ({ contentData }) => (
  <motion.div
    initial={{ filter: "blur(12px)", opacity: 0 }}
    animate={{ filter: "blur(0px)", opacity: 1 }}
    exit={{ filter: "blur(12px)", opacity: 0 }}
    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    className="px-5 py-4 text-gray-700 leading-relaxed"
  >
    {contentData.content}
  </motion.div>
);
