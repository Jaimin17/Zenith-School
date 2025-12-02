"use client";

import React from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import { ACTIVITIES_DATA } from "@/lib/data";

export default function activitiesBeyondAcademicsPage() {
  return (
    <Box sx={{ py: 8, px: 2 }}>
      {ACTIVITIES_DATA.map((section, index) => {
        // if image is left → text comes from right, image comes from left
        // if image is right → text comes from left, image comes from right
        const textDirection = index % 2 === 0 ? -100 : 100;
        const imageDirection = index % 2 === 0 ? 100 : -100;

        return (
          <section className="activity pt-120 pb-80" key={index}>
            <div className="container">
              <div className="row align-items-center">
                {/* Left Content */}
                <div className={`col-lg-6 ${index % 2 === 0 ? "" : "order-lg-2"}`}>
                  <motion.div
                    className="content-info"
                    initial={{ opacity: 0, x: textDirection }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <div className="site-heading mb-3">
                      <span className="site-title-tagline">
                        <i className="far fa-book-open-reader"></i>{" "}
                        {section.tagline || "Student Activity"}
                      </span>
                      <h2 className="site-title">
                        {section.titlePrefix || "Details About"}{" "}
                        <span>{section.highlight || "Eduka"}</span>{" "}
                        {section.titleSuffix || "Student Activity."}
                      </h2>
                    </div>
                    <p className="content-text">{section.description}</p>
                    {section.extra && (
                      <p className="content-text mt-2">{section.extra}</p>
                    )}
                  </motion.div>
                </div>

                {/* Right Image */}
                <div className={`col-lg-6 ${index % 2 === 0 ? "" : "order-lg-1"}`}>
                  <motion.div
                    className="content-img"
                    initial={{ opacity: 0, x: imageDirection }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <img src={section.image} alt={section.title} />
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </Box>
  );
}
