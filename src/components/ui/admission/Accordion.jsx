"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ContentPlaceHolder } from "./ContentPlaceHolder";

const Accordion = ({ i, expanded, setExpanded, contentData }) => {
  const isOpen = i === expanded;

  return (
    <div className="mb-4 rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
      {/* Header */}
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#fff0db" : "#ffffff" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="cursor-pointer px-5 py-4 flex justify-between items-center"
      >
        <span className="text-lg font-semibold text-gray-800">
          {contentData.title}
        </span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-500"
        >
          ▶
        </motion.span>
      </motion.header>

      {/* Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <ContentPlaceHolder contentData={contentData} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export const AdmissionAccordion = ({ contents }) => {
  const [expanded, setExpanded] = useState(0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {contents.map((contentData, index) => (
        <Accordion
          key={index}
          i={index}
          expanded={expanded}
          setExpanded={setExpanded}
          contentData={contentData}
        />
      ))}
    </div>
  );
};
