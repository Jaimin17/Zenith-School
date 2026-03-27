"use client";

import Banner from "@/components/Banner";
import { BANNER_DATA } from "@/lib/data";
import { Box } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import PublicPhotoGallery from "@/components/gallery/PublicPhotoGallery";
import { fetchPublicSportsProgramsAction } from "@/actions/admin";
import type { SportsProgram } from "@/types/schemas";
import { getSportsProgramImageUrl } from "@/utils/imageHelpers";

interface SportCard {
  title: string;
  description: string;
  image: string;
  link?: string;
}

export default function SportsPage() {
  const bannerData = BANNER_DATA["sports"];
  const [programs, setPrograms] = useState<SportsProgram[]>([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoadingPrograms(true);
      try {
        const result = await fetchPublicSportsProgramsAction(1);
        if (result.success && result.data?.data) {
          const activePrograms = result.data.data.filter((item) => item.is_active);
          setPrograms(activePrograms);
        } else {
          setPrograms([]);
        }
      } catch (error) {
        setPrograms([]);
      } finally {
        setLoadingPrograms(false);
      }
    };

    fetchPrograms();
  }, []);

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
            <PublicPhotoGallery isSport showPagination={false} />
          </div>
        </div>
      </Fragment>

      {/* About Sports Section */}
      <Fragment>
        <Box sx={{ pb: 8 }}>
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

        {loadingPrograms ? (
          <div className="container">
            <div className="row">
              {[1, 2, 3].map((item) => (
                <div className="col-md-4" key={item}>
                  <div className="team-item">
                    <div className="team-img">
                      <div className="w-full h-56 bg-gray-200 rounded-lg skeleton-shimmer" />
                    </div>
                    <div className="team-content" style={{ marginTop: "15px" }}>
                      <div className="team-bio">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                        <div className="h-3 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-3 bg-gray-200 rounded w-5/6" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center text-gray-500">No sports programs available.</div>
        ) : (
          <InfiniteCarousel
            data={programs}
            cardWidth={400}
            gap={20}
            speed={60}
            renderCard={(sport: SportsProgram, index: number) => {
              const imageSrc = sport.img ? getSportsProgramImageUrl(sport.img) : "/noAvatar.png";
              const card: SportCard = {
                title: sport.title,
                description: sport.description,
                image: imageSrc,
              };

              return (
                <div className="col-12" key={sport.id}>
                  <div
                    className="team-item wow fadeInUp"
                    data-wow-delay={`${0.25 * (index + 1)}s`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <div className="team-img">
                      <img
                        src={card.image}
                        alt={card.title}
                        draggable={false}
                        style={{ userSelect: "none" }}
                      />
                    </div>

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
                          <span>{card.title}</span>
                        </h5>

                        <span
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minHeight: "60px",
                            maxHeight: "60px",
                            color: "ButtonText",
                          }}
                        >
                          {card.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        )}
      </Fragment>
    </>
  );
}