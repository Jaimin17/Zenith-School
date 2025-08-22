import React from "react";
import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import { BANNER_DATA, TRIBUTE_PAGE_TEXT } from "@/lib/data";
import Banner from "@/components/Banner";

export default function TributeToOurFoundersPage() {
    const dummyData = {
        image1:
            "https://media.istockphoto.com/id/2172627567/photo/happy-multi-generation-family-sitting-on-sofa-at-home-during-diwali.webp?s=2048x2048&w=is&k=20&c=dAbfJWvVfqhujisMfyVkMz7Z-xPeVJisu92dJ6uZgaI=",
        firstText: TRIBUTE_PAGE_TEXT.TEXT1,
        image2: "https://cdn.pixabay.com/photo/2022/10/07/17/32/potrait-7505585_1280.jpg",
        image3: "https://cdn.pixabay.com/photo/2022/09/26/10/40/cat-7480374_1280.jpg",
        secondText: TRIBUTE_PAGE_TEXT?.TEXT2,
    };


    const bannerData = BANNER_DATA['tribute-to-our-founders'];

    return (
        <>
            <Banner
                title={bannerData.title}
                backgroundImage={bannerData.imageUrl}
            />

            <Container maxWidth="lg" sx={{ py: 6 }}>
                {/* Section 1: One Image with Text */}
                <Box sx={{ mb: 6 }}>
                    <CardMedia
                        component="img"
                        image={dummyData.image1}
                        alt="Founders tribute image"
                        sx={{
                            width: "100%",
                            height: { xs: 250, sm: 350, md: 450 },
                            objectFit: "cover",
                            borderRadius: 2,
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 600, mt: 4 }}
                    >
                        {TRIBUTE_PAGE_TEXT.TEXT1_HEADING}
                    </Typography>
                    <Typography sx={{}}>
                        {dummyData.firstText}
                    </Typography>
                </Box>

                {/* Section 2: Two Images Side by Side with Text */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        {/* Here two images side by side */}
                        <CardMedia
                            component="img"
                            image={dummyData.image2}
                            alt="Founders side image 1"
                            sx={{
                                width: "100%",
                                height: { xs: 200, sm: 250, md: 300 },
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                        <CardMedia
                            component="img"
                            image={dummyData.image3}
                            alt="Founders side image 2"
                            sx={{
                                width: "100%",
                                height: { xs: 200, sm: 250, md: 300 },
                                objectFit: "cover",
                                borderRadius: 2,
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, }}
                        >
                            {TRIBUTE_PAGE_TEXT.TEXT2_HEADING}
                        </Typography>
                        <Typography >
                            Here is the second text that describes the images and the tribute to our founders. {dummyData?.secondText}
                        </Typography>
                    </Box>
                </Box>

            </Container>
        </>
    );
}
