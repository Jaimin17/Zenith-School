"use client";

import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA, SPORTS_DATA } from "@/lib/data";
import { GALLERY_DATA } from "../gallery/photos/page";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Fragment } from "react";
import SportsCarousel from "@/components/ui/InfiniteCarousel";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function photoGalleryPage() {
    const bannerData = BANNER_DATA["sports"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <Fragment>
                <Box
                    sx={{
                        pb: 2,
                    }}
                >
                    <AnimatedHeader
                        miniHeader="🏟️ Sports Complex"
                        title="Multipurpose "
                        highlight="Sports Complex"
                        subtitle="Explore our state-of-the-art sports facilities and the vibrant athletic culture at our school."
                        descriptions={[
                            "Our campus is home to a modern multipurpose sports complex designed to encourage physical fitness and team spirit.",
                            "From indoor courts and swimming pools to outdoor fields and arenas, students have access to facilities that nurture talent, discipline, and a passion for sports."
                        ]}
                        align="center"
                        titleVariant="h3"
                        subtitleVariant="body1"
                    />

                </Box>
                <DynamicGallery data={GALLERY_DATA} />
            </Fragment>

            {/* About Sports Section */}
            <Fragment>

                <Box
                    sx={{
                        pb: 8,
                    }}
                >
                    <AnimatedHeader
                        miniHeader="⚽ Sports Programs"
                        title="Our "
                        highlight="Sports Programs"
                        descriptions={[

                            "We offer a wide range of sports designed to foster teamwork, discipline, and holistic growth. From popular field games to individual skill-based sports, every student finds their passion here Our diverse sports curriculum includes football, basketball, cricket, athletics, badminton, swimming, and more — ensuring opportunities for both team players and individual achievers.",
                            "Each program is guided by experienced coaches who instill discipline, perseverance, and sportsmanship, helping students build lifelong skills beyond the field."
                        ]}
                        align="center"
                        titleVariant="h3"
                        subtitleVariant="body1"
                    />

                </Box>

                <InfiniteCarousel
                    data={SPORTS_DATA}
                    cardWidth={400}
                    gap={20}
                    speed={60}
                    renderCard={(sport, index) => (
                        <div className="col-12" key={index}>
                            <div
                                className="team-item wow fadeInUp"
                                data-wow-delay={`${0.25 * (index + 1)}s`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                            >
                                {/* Award Image */}
                                <div className="team-img">
                                    <img
                                        src={sport.image}
                                        alt={sport.title}
                                        draggable={false}
                                        style={{ userSelect: "none" }}
                                    />
                                </div>

                                {/* Content */}
                                <div
                                    className="team-content"
                                    style={{
                                        marginTop: "15px",
                                        flex: "1",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div className="team-bio">
                                        <h5 style={{ marginBottom: "8px" }}>
                                            <a href={sport.link || "#"}>{sport.title}</a>
                                        </h5>

                                        <span
                                            style={{

                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                minHeight: "60px",
                                                maxHeight: "60px",
                                                color: 'ButtonText'
                                            }}
                                        >
                                            {sport.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                />
            </Fragment>
        </>
    );
}
