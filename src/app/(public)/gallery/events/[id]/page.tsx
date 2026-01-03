import SingleEvents from '../../../../../components/gallery/SingleEvents';
import { BANNER_DATA, SINGLE_EVENTS_DETAILS } from '../../../../../lib/data';
import React, { JSX } from 'react';
import Banner from '../../../../../components/Banner';

interface EventProps {
  params: Promise<{
    id: string;
  }>;
}

async function Event(props: EventProps) {
  const bannerData = BANNER_DATA["events-gallery"];
  const { id } = await props.params;
  
  const data = SINGLE_EVENTS_DETAILS.find(
    (item) => item.id === Number(id)
  );

  if (!data) {
    return (
      <>
        <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
        <div className="container py-120">
          <h2>Event not found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <SingleEvents eventData={data} />
    </>
  );
}

export default Event;