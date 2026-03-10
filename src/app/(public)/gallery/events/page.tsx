import Banner from "@/components/Banner";
import PublicEventsGallery from "@/components/gallery/PublicEventsGallery";
import { BANNER_DATA } from "@/lib/data";

export default function EventsPage() {
  const bannerData = BANNER_DATA["events-gallery"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <PublicEventsGallery
        tagline="Gallery"
        title="Our Event"
        highlight="Gallery"
        description="Explore moments from our school celebrations, activities, and special events."
      />
    </>
  );
}