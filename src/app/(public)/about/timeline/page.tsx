import { JSX } from "react";
import Banner from "../../../../components/Banner";
import { OurTimeline } from "../../../../components/ui/our-timeline";
import { BANNER_DATA } from "../../../../lib/data";

export default function TimelinePage() {
  const bannerData = BANNER_DATA["timeline"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <OurTimeline />
    </>
  );
}