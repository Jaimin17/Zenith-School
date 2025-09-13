"use client";

import { Box, Typography, Container } from "@mui/material";
import Banner from "@/components/Banner";
import { ALUMNI_DATA, BANNER_DATA, WHY_ZENITH_DATA } from "@/lib/data";
import SchoolStatistics from "@/components/statistics/SchoolStatistics";
import { CardCarousel } from "@/components/alumni/CardCarousel";

export default function WhyZenithSchoolPage() {
    const bannerData = BANNER_DATA["why-zenith-school"];

    return (
        <>
            {/* Banner Section */}
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            {/* Subheading Section Hidden For Now */}
            <Container maxWidth="md" className="max-w-screen overflow-hidden" sx={{ display: 'none' }}>
                <Box textAlign="center" mt={6} mb={3}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 800,
                            mb: 2,
                            color: "text.primary",
                        }}
                    >
                        {WHY_ZENITH_DATA?.title}
                    </Typography>
                </Box>

                {/* Paragraph Section */}
                <Box textAlign="center" mb={6}>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.8}>
                        {WHY_ZENITH_DATA?.description}
                    </Typography>
                </Box>

                {/* Horizontal School Image */}
                <Box display="flex" justifyContent="center" mb={6} padding={2}>
                    <img
                        src={WHY_ZENITH_DATA?.image}
                        alt="Zenith School"
                        style={{
                            maxHeight: "400px",
                            maxWidth: "900px",
                            borderRadius: "16px",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                        }}
                    />
                </Box>
            </Container>

            {/* About Section (from sir's HTML, converted to JSX) */}
            <div className="about-area py-120">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        {/* Left Side */}
                        <div className="col-lg-6">
                            <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                                <div className="about-img">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <img
                                                className="img-1"
                                                src="/assets/img/about/01.jpg"
                                                alt="About Zenith"
                                            />
                                            <div className="about-experience mt-4">
                                                <div className="about-experience-icon">
                                                    <img
                                                        src="/assets/img/icon/exchange-idea.svg"
                                                        alt="Experience Icon"
                                                    />
                                                </div>
                                                <b className="text-start">
                                                    30 Years Of <br /> Quality Service
                                                </b>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <img
                                                className="img-2"
                                                src="/assets/img/about/02.jpg"
                                                alt="About Zenith"
                                            />
                                            <img
                                                className="img-3 mt-4"
                                                src="/assets/img/about/03.jpg"
                                                alt="About Zenith"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="col-lg-6">
                            <div className="about-right wow fadeInRight" data-wow-delay=".25s">
                                <div className="site-heading mb-3">
                                    <span className="site-title-tagline">
                                        <i className="far fa-book-open-reader"></i> Why Zenith School
                                    </span>
                                    <h2 className="site-title">
                                        Our Edukation System <span>Inspires</span> You More.
                                    </h2>
                                </div>
                                <p className="about-text">
                                    There are many variations of passages available but the
                                    majority have suffered alteration in some form by injected
                                    humour randomised words which don't look even slightly
                                    believable. If you are going to use passage.
                                </p>

                                {/* Content Section */}
                                <div className="about-content">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="about-item">
                                                <div className="about-item-icon">
                                                    <img
                                                        src="/assets/img/icon/open-book.svg"
                                                        alt="Education Icon"
                                                    />
                                                </div>
                                                <div className="about-item-content">
                                                    <h5>Edukation Services</h5>
                                                    <p>
                                                        It is a long established fact that reader will to
                                                        using content.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="about-item">
                                                <div className="about-item-icon">
                                                    <img
                                                        src="/assets/img/icon/global-education.svg"
                                                        alt="Global Icon"
                                                    />
                                                </div>
                                                <div className="about-item-content">
                                                    <h5>International Hubs</h5>
                                                    <p>
                                                        It is a long established fact that reader will to
                                                        using content.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quote */}
                                        <div className="col-md-5">
                                            <div className="about-quote">
                                                <p>
                                                    It is a long established fact that a reader will be
                                                    distracted by the content of a page when looking at
                                                    its reader for the long words layout.
                                                </p>
                                                <i className="far fa-quote-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Section */}
                                <div className="about-bottom">
                                    <a href="/about" className="theme-btn">
                                        Discover More <i className="fas fa-arrow-right-long"></i>
                                    </a>
                                    <div className="about-phone">
                                        <div className="icon">
                                            <i className="fal fa-headset"></i>
                                        </div>
                                        <div className="number">
                                            <span>Call Now</span>
                                            <h6>
                                                <a href="tel:+21236547898">+2 123 654 7898</a>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* End Right Side */}
                    </div>
                </div>
            </div>

            <SchoolStatistics />

            <div className="testimonial-area bg py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline"><i className="far fa-book-open-reader"></i> Testimonials</span>
                                <h2 className="site-title">What Our Students <span>Say's</span></h2>
                                <p>It is a long established fact that a reader will be distracted by the readable content of
                                    a page when looking at its layout.</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-slider owl-carousel owl-theme">
                        <CardCarousel data={ALUMNI_DATA} />
                    </div>
                </div>
            </div>
        </>
    );
}
