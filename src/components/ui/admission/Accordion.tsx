"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ContentPlaceHolder } from "./ContentPlaceHolder";
import React from "react";

interface ContentData {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  i: number;
  expanded: number | false;
  setExpanded: (index: number | false) => void;
  contentData: ContentData;
}

const Accordion: React.FC<AccordionProps> = ({ i, expanded, setExpanded, contentData }) => {
  const isOpen = i === expanded;

  return (
    <div className="accordion-item border border-gray-200 rounded-lg overflow-hidden bg-white mb-4">
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#fff0db" : "#ffffff" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        className="accordion-header cursor-pointer"
      >
        <h2 className="accordion-button flex justify-between gap-2">
          <i className="far fa-question"></i>
          {contentData.title}
        </h2>
      </motion.header>

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
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="accordion-collapse"
          >
            <div className="accordion-body px-5 py-4 border-t border-gray-200">
              <ContentPlaceHolder contentData={contentData} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AdmissionAccordionProps {
  contents: ContentData[];
}

export const AdmissionAccordion: React.FC<AdmissionAccordionProps> = ({ contents }) => {
  const [expanded, setExpanded] = useState<number | false>(0);

  return (
    <div className="faq-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="faq-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline justify-content-start">
                  <i className="far fa-book-open-reader"></i> Faq's
                </span>
                <h2 className="site-title my-3">
                  General <span>frequently</span> asked questions
                </h2>
              </div>
              <p className="mb-3">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by injected humour, or
                randomised words which don't look even.
              </p>
              <p className="mb-4">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
              </p>
              <a href="#" className="theme-btn mt-2">
                Have Any Question ?
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="col-lg-6">
            <div className="accordion" id="accordionExample">
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
          </div>
        </div>
      </div>
    </div>
  );
};