import Banner from "@/components/Banner";
import Events from "@/components/gallery/Events";
import { BANNER_DATA, EventsData } from "@/lib/data";

export default function EventsPage(): JSX.Element {
  const bannerData = BANNER_DATA["events-gallery"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <Events data={EventsData} />
    </>
  );
}