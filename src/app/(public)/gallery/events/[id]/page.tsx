import SingleEvents from "../../../../../components/gallery/SingleEvents";
import { fetchPublicEventByIdAction } from "@/actions/admin";
import { BANNER_DATA } from "../../../../../lib/data";
import Banner from "../../../../../components/Banner";

async function Event({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const bannerData = BANNER_DATA["events-gallery"];

  const { id } = await params;

  const result = await fetchPublicEventByIdAction(id);

  if (!result.success || !result.data) {
    return (
      <>
        <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
        <div className="container py-120">
          <h2>Event not found</h2>
          <p>{result.error || "We could not load this event right now."}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <SingleEvents eventData={result.data} />
    </>
  );
}

export default Event;