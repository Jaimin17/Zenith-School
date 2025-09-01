"use client";

import { Box, Typography, Card, Avatar } from "@mui/material";
import { Fragment } from "react";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { ALUMNI_DATA } from "@/lib/data";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function AlumniPage() {
    return (
        <Fragment>
            {/* Animated Header */}
            <AnimatedHeader
                title="Our Proud Alumni"
                subtitle="Meet the incredible alumni who inspire the next generation."
                align="center"
                titleVariant="h3"
                subtitleVariant="body1"
            />


            {/* Carousel Section */}
            <Box sx={{ mt: 8 }}>
                <InfiniteCarousel
                    data={ALUMNI_DATA}
                    cardWidth={360}
                    gap={24}
                    speed={45}
                    renderCard={(alumni) => (
                        <Card
                            sx={{
                                width: { xs: 260, sm: 300, md: 340, lg: 360 },
                                height: "100%",
                                borderRadius: "16px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                p: 3,
                                boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
                                transition:
                                    "transform 0.3s ease, box-shadow 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                                },
                                background:
                                    "linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)",
                            }}
                        >
                            {/* Testimonial */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontStyle: "italic",
                                    color: "text.primary",
                                    mb: 3,
                                    lineHeight: 1.6,
                                }}
                            >
                                “{alumni.testimonial}”
                            </Typography>

                            {/* Profile */}
                            <Box sx={{ display: "flex", alignItems: "center", mt: "auto" }}>
                                <Avatar
                                    src={alumni.image}
                                    alt={alumni.name}
                                    sx={{
                                        mr: 2,
                                        width: 56,
                                        height: 56,
                                        border: "2px solid #eee",
                                    }}
                                />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                                        {alumni.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.9rem" }}
                                    >
                                        {alumni.role}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    )}
                />
            </Box>
        </Fragment>
    );
}
