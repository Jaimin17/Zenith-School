import React, { useEffect, useState } from "react";
import ImagesSlider from "../ui/images-slider";
import { api } from "@/api/api";
import { BANNER_API } from "@/api/apiParams/admin";
import type { BannerListResponse } from "@/types/schemas";
import { getBannerImageUrl } from "@/utils/imageHelpers";

export const ImagesSliderDemo: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await api<BannerListResponse>({
          endpoint: BANNER_API,
          params: { page: 1 },
          withoutToken: true,
        });

        if (!response.error && response.data?.data) {
          const bannerImages = response.data.data
            .filter((banner) => banner.img && banner.is_active)
            .map((banner) => getBannerImageUrl(banner.img));
          setImages(bannerImages);
        }
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="hero-section">
        <div className="hero-slider" style={{ minHeight: "75vh", background: "#f3f4f6" }}>
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return <ImagesSlider images={images} />;
};