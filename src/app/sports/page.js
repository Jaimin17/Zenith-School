import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA } from "@/lib/data";
import { GALLERY_DATA } from "../gallery/photos/page";
import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import SportsCarousel from "@/components/ui/SportsCarousel";

export default function photoGalleryPage() {
    const bannerData = BANNER_DATA["sports"];


    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            {/* Middle content for about sports complex */}
            <Fragment>
                <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, }}>
                        Multipurpose Sports Complex
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        Explore our state-of-the-art sports facilities and the vibrant athletic culture at our school.
                    </Typography>
                </Box>
                <DynamicGallery data={GALLERY_DATA} />
            </Fragment>

            {/* About Sports Section */}
            <Fragment>
                <Box sx={{ textAlign: 'center', px: 2 }}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, }}>
                        Our Sports Programs
                    </Typography>
                    <Typography variant="body1" sx={{}}>
                        We offer a wide range of sports designed to foster teamwork,
                        discipline, and holistic growth. From popular field games
                        to individual skill-based sports, every student finds their passion here.
                    </Typography>
                </Box>

                <SportsCarousel />
            </Fragment>
        </>
    );
}