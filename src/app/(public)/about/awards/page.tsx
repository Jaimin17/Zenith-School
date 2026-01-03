"use client";

import React, { JSX } from "react";
import {
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import Banner from "../../../../components/Banner";
import { AWARDS_DATA, BANNER_DATA } from "../../../../lib/data";
import { AnimatedHeader } from "../../../../components/AnimatedHeader";

interface Award {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export default function AwardsPage(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const bannerData = BANNER_DATA["awards"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ p: { xs: 2, sm: 4 } }}>
        <Box sx={{ pb: 8 }}>
          <AnimatedHeader
            miniHeader="🏆 Achievements"
            title="Awards and"
            highlight="Recognition"
            subtitle="Celebrating achievements that inspire excellence and pride."
            align="center"
            color="#f59e0b"
            titleVariant="h3"
            subtitleVariant="body1"
          />
        </Box>

        {/* Awards Grid */}
        <div className="row">
          {AWARDS_DATA.map((award: Award, index: number) => (
            <div className="col-md-6 col-lg-3" key={index}>
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
                  <img src={award.image} alt={award.title} />
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
                      <a href={award.link || "#"}>{award.title}</a>
                    </h5>

                    <span
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minHeight: "60px",
                        maxHeight: "60px",
                      }}
                    >
                      {award.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}