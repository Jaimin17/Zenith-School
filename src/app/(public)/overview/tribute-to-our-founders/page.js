import React from "react";
import { Box, CardMedia, Container, Grid, Typography } from "@mui/material";
import { BANNER_DATA, TRIBUTE_PAGE_TEXT } from "@/lib/data";
import Banner from "@/components/Banner";

export default function TributeToOurFoundersPage() {
    const dummyData = {
        image1:
            "https://images.unsplash.com/photo-1601933973706-34bd411ffd67?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        firstText: TRIBUTE_PAGE_TEXT.TEXT1,
        image2: "https://images.unsplash.com/photo-1755626006620-5ca1ca4de3a7?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

            <Container maxWidth="lg" sx={{ py: 6 }} className="max-w-screen overflow-hidden">
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
                            borderRadius: 10,
                        }}
                    />
                    <Typography
                        variant="h4"
                        sx={{ fontWeight: 600, mt: 5, mb: 1 }}
                    >
                        {TRIBUTE_PAGE_TEXT.TEXT1_HEADING}
                    </Typography>
                    <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                        {dummyData.firstText}
                    </Typography>
                </Box>

                {/* Section 2: Two Images Side by Side with Text */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                        {/* Here two images side by side */}
                        <CardMedia
                            component="img"
                            image={dummyData.image2}
                            alt="Founders side image 1"
                            sx={{
                                width: "100%",
                                height: { xs: 200, sm: 250, md: 300 },
                                objectFit: "cover",
                                borderRadius: 10,
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
                                borderRadius: 10,
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 600, mb: 1, mt: 2 }}
                        >
                            {TRIBUTE_PAGE_TEXT.TEXT2_HEADING}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", fontWeight: 500 }}>
                            Here is the second text that describes the images and the tribute to our founders. {dummyData?.secondText}
                        </Typography>
                    </Box>
                </Box>

            </Container>
        </>
    );
}
