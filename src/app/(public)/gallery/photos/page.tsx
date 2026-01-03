import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA, GALLERY_DATA } from "@/lib/data";

export default function PhotoGalleryPage() {
  const bannerData = BANNER_DATA["photos-gallery"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <div className="gallery-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> Gallery
                </span>
                <h2 className="site-title">
                  Our Photo <span>Gallery</span>
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
          <DynamicGallery data={GALLERY_DATA} />
        </div>
      </div>
    </>
  );
}