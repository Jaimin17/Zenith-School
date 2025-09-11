"use client";

import { Box, Typography, Card, Avatar, Icon } from "@mui/material";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { ALUMNI_DATA } from "@/lib/data";
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export const CardCarousel = () => {
    return (
        <Box sx={{ py: 8, bgcolor: "#f9f9f9" }}>
            <InfiniteCarousel
                data={ALUMNI_DATA}
                cardWidth={320}
                gap={24}
                speed={45}
                renderCard={(alumni) => (
                    <Card
                        sx={{
                            width: { xs: 260, sm: 300, md: 320 },
                            p: 3,
                            borderRadius: 3,
                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            position: "relative",
                            bgcolor: "white",
                        }}
                    >
                        {/* Star Rating */}
                        <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} sx={{ fontSize: 20, color: "#facc15" }} />
                            ))}
                        </Box>

                        {/* Quote */}
                        <Typography variant="body2" sx={{ fontStyle: "italic", mb: 3 }}>
                            “{alumni.testimonial}”
                        </Typography>

                        {/* Author Info */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar
                                src={alumni.image}
                                alt={alumni.name}
                                sx={{ width: 56, height: 56, border: "2px solid #eee", mr: 2 }}
                            />
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    {alumni.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {alumni.role}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Quote Icon Overlay */}
                        <FormatQuoteIcon
                            sx={{
                                position: "absolute",
                                bottom: 16,
                                right: 16,
                                fontSize: 40,
                                color: "#f0f0f0",
                            }}
                        />
                    </Card>
                )}
            />
        </Box>
    );
};
