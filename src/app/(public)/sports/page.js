"use client";

import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA, SPORTS_DATA } from "@/lib/data";
import { GALLERY_DATA } from "../gallery/photos/page";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Fragment } from "react";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { AnimatedHeader } from "@/components/AnimatedHeader";

export default function SportsPage() {
    const bannerData = BANNER_DATA["sports"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <Fragment>

                <div className="gallery-area py-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="site-heading text-center">
                                    <span className="site-title-tagline">
                                        <i className="far fa-book-open-reader"></i> Sports Complex
                                    </span>
                                    <h2 className="site-title">
                                        Multipurpose <span>Sports Complex</span>
                                    </h2>
                                    <p>
                                        Explore our state-of-the-art sports facilities and the vibrant athletic culture at our school.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DynamicGallery data={GALLERY_DATA} />
                    </div>
                </div>

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
