"use client";

import { useEffect, useMemo, useState } from "react";
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

const PublicPhotoGallery = ({
  isSport = false,
  showPagination = true,
}: {
  isSport?: boolean;
  showPagination?: boolean;
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPublicPhotoGalleryAction(page, isSport);

        if (!result.success || !result.data) {
          setImages([]);
          setTotalPages(1);
          setError(result.error || "Unable to load gallery photos.");
          return;
        }

        const activeImages = result.data.data
          .filter((photo) => photo.is_active && photo.img)
          .map((photo) => getPhotoGalleryImageUrl(photo.img));

        setImages(activeImages);
        setTotalPages(Math.max(1, result.data.total_pages || 1));
      } catch (err) {
        setImages([]);
        setTotalPages(1);
        setError("Unable to load gallery photos.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [page, isSport]);

  const pageNumbers = useMemo(() => {
    const maxVisible = 3;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  }, [page, totalPages]);

  return (
    <>
      {loading ? (
        <GallerySkeleton />
      ) : error ? (
        <div className="row">
          <div className="col-12 text-center text-red-500">{error}</div>
        </div>
      ) : images.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center text-gray-500">No gallery photos available.</div>
        </div>
      ) : (
        <DynamicGallery data={images} />
      )}

      {showPagination && totalPages > 1 && (
        <div className="pagination-area mt-8">
          <div aria-label="Photo gallery pagination">
            <ul className="pagination">
              <li className={`page-item ${page === 1 ? "disabled pointer-events-none opacity-50" : ""}`}>
                <button className="page-link" onClick={() => setPage((prev) => Math.max(1, prev - 1))} aria-label="Previous">
                  <span aria-hidden="true">
                    <i className="far fa-arrow-left"></i>
                  </span>
                </button>
              </li>

              {pageNumbers.map((pageNumber) => (
                <li key={pageNumber} className={`page-item ${page === pageNumber ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPage(pageNumber)}>
                    {pageNumber}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? "disabled pointer-events-none opacity-50" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  aria-label="Next"
                >
                  <span aria-hidden="true">
                    <i className="far fa-arrow-right"></i>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PublicPhotoGallery;
