"use client";

import { Box, Typography, Card, Avatar } from "@mui/material";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { ALUMNI_DATA, BANNER_DATA } from "@/lib/data";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import Banner from "@/components/Banner";
import { CardCarousel } from "@/components/alumni/CardCarousel";

export default function AlumniPage() {
    const bannerData = BANNER_DATA["alumni"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            {/* Animated Header */}
            <AnimatedHeader
                title="Our Proud Alumni"
                subtitle="Meet the incredible alumni who inspire the next generation."
                align="center"
                titleVariant="h3"
                subtitleVariant="body1"
            />

            {/* Carousel */}
            <CardCarousel />
        </>
    );
}
