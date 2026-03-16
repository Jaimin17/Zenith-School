"use client";

import { useEffect, useState } from "react";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { fetchPublicPhotoGalleryAction } from "@/actions/admin";
import { getPhotoGalleryImageUrl } from "@/utils/imageHelpers";

const GallerySkeleton = () => {
  return (
    <div className="row">
      {[1, 2, 3].map((col) => (
        <div key={col} className="col-md-4">
          {[1, 2].map((item) => (
            <div key={item} className="gallery-item mb-4">
              <div className="w-full h-56 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const HomePhotoGallery = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await fetchPublicPhotoGalleryAction(1, false);

        if (result.success && result.data?.data) {
          const activeImages = result.data.data
            .filter((photo) => photo.is_active && photo.img)
            .map((photo) => getPhotoGalleryImageUrl(photo.img));

          setImages(activeImages);
        }
      } catch (error) {
        console.error("Failed to fetch photo gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return <GallerySkeleton />;
  }

  if (!images.length) {
    return (
      <div className="row">
        <div className="col-12 text-center text-gray-500">
          No gallery photos available.
        </div>
      </div>
    );
  }

  return <DynamicGallery data={images} />;
};

export default HomePhotoGallery;
