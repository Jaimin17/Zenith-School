"use client";

import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Banner from "../../../../components/Banner";
import { BANNER_DATA } from "../../../../lib/data";
import { AnimatedHeader } from "../../../../components/AnimatedHeader";
import { fetchPublicAchievementsAction } from "@/actions/admin";
import type { Achievement } from "@/types/schemas";
import { getAchievementImageUrl } from "@/utils/imageHelpers";
import { ImageIcon } from "lucide-react";

export default function AwardsPage() {
  const bannerData = BANNER_DATA["awards"];
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPublicAchievementsAction(1);

        if (!result.success || !result.data) {
          setAchievements([]);
          setError(result.error || "Unable to load achievements.");
          return;
        }

        const activeAchievements = result.data.data.filter((item) => item.is_active);
        setAchievements(activeAchievements);
      } catch (err) {
        setAchievements([]);
        setError("Unable to load achievements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="team-item" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                  <div className="team-img">
                    <div className="w-full h-48 bg-gray-200 rounded-lg skeleton-shimmer" />
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
            ))
          ) : error ? (
            <div className="col-12 text-center text-red-500">{error}</div>
          ) : achievements.length === 0 ? (
            <div className="col-12 text-center text-gray-500">No achievements available.</div>
          ) : (
            achievements.map((achievement, index) => (
              <div className="col-md-6 col-lg-3" key={achievement.id}>
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
                    {achievement.img ? (
                      <img src={getAchievementImageUrl(achievement.img)} alt={achievement.title} />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                    )}
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
                        <span>{achievement.title}</span>
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
                        {achievement.description}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Container>
    </>
  );
}