"use client";

import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";
import { CURRICULUM_DATA } from "@/lib/data";

export default function AcademicsCurriculumPage() {
    return (
        <Box sx={{ py: 8, px: 2 }}>
            {CURRICULUM_DATA.map((section, index) => {
                // animation direction: left if image is left, right if image is right
                const textDirection = index % 2 === 0 ? -100 : 100;
                const imageDirection = index % 2 === 0 ? 100 : -100;

                return (
                    <Grid
                        container
                        spacing={6}
                        alignItems="center"
                        key={index}
                        sx={{
                            mb: 12,
                            p: 3,
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Text Section */}
                        <Grid
                            item
                            xs={12}
                            md={6}
                            order={{ xs: 2, md: index % 2 === 0 ? 1 : 2 }}
                            sx={{ p: 3, width: "50%" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: textDirection }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <Typography
                                    variant="h3"
                                    component="h2"
                                    sx={{
                                        fontWeight: "bold",
                                        mb: 3,
                                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {section.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "1.125rem",
                                        lineHeight: 1.7,
                                        mb: 4,
                                    }}
                                >
                                    {section.description}
                                </Typography>
                            </motion.div>
                        </Grid>

                        {/* Image Section */}
                        <Grid
                            item
                            xs={12}
                            md={6}
                            order={{ xs: 1, md: index % 2 === 0 ? 2 : 1 }}
                            sx={{ p: 3 }}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: imageDirection }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true, amount: 0.2 }}
                            >
                                <Box sx={{ position: "relative" }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            overflow: "hidden",
                                            boxShadow: 6,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                boxShadow: 12,
                                                transform: "translateY(-8px)",
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="400"
                                            image={section.image}
                                            alt={section.title}
                                            sx={{
                                                transition: "transform 0.5s ease",
                                                "&:hover": {
                                                    transform: "scale(1.05)",
                                                },
                                            }}
                                        />
                                    </Card>

                                    {/* Decorative circles */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: -16,
                                            [index % 2 === 0 ? "right" : "left"]: -16,
                                            width: 96,
                                            height: 96,
                                            bgcolor: "primary.50",
                                            borderRadius: "50%",
                                            opacity: 0.5,
                                            zIndex: -1,
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: -16,
                                            [index % 2 === 0 ? "left" : "right"]: -16,
                                            width: 64,
                                            height: 64,
                                            bgcolor: "primary.100",
                                            borderRadius: "50%",
                                            opacity: 0.3,
                                            zIndex: -1,
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                );
            })}
        </Box>
    );
}
