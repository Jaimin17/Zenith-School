import React from "react";
import { Box, Typography, Container, Card, CardMedia, CardContent } from "@mui/material";
import { BANNER_DATA, CONTENT_WRITEN_DATA } from "@/lib/data";
import Banner from "@/components/Banner";

const principalData = {
    image: "https://cdn.pixabay.com/photo/2022/10/07/18/35/potrait-7505634_1280.jpg",
    name: "Ms. Jayshree Shah",
    title: "Principal, Zenith School",
    description: CONTENT_WRITEN_DATA?.PRICIPLES_INTERVIEW,
};

const bannerData = BANNER_DATA['from-principal-desk'];



export default function fromPrincipalDeskPage() {
    return (
        <>
            <Banner
                title={bannerData.title}
                backgroundImage={bannerData.imageUrl}
            />
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                    }}
                >
                    {/* Left: Long Description */}
                    <Box sx={{ flex: 2 }}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 2 }}
                        >
                            From the Principal’s Desk
                        </Typography>
                        <Typography variant="body1" sx={{ lineHeight: 1.8, textAlign: "justify" }}>
                            {principalData.description}
                        </Typography>
                    </Box>

                    {/* Right: Image Card */}
                    <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                        <Card sx={{ maxWidth: 350, textAlign: "center", p: 4 }}>
                            <CardMedia
                                component="img"
                                image={principalData.image}
                                alt={principalData.name}
                                sx={{
                                    height: 360,
                                    objectFit: "cover",
                                    borderRadius: 1,
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {principalData.name}
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary">
                                    {principalData.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </>
    );
}