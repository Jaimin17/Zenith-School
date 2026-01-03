import SingleEvents from '../../../../../components/gallery/SingleEvents';
import { BANNER_DATA, SINGLE_EVENTS_DETAILS } from '../../../../../lib/data';
import React, { JSX } from 'react';
import Banner from '../../../../../components/Banner';

interface EventProps {
  params: Promise<{
    id: string;
  }>;
}

interface EventData {
  id: string;
  [key: string]: any;
}

async function Event(props: EventProps): Promise<JSX.Element> {
  const bannerData = BANNER_DATA["events-gallery"];
  const { id } = await props.params;
  
  const data: EventData | undefined = SINGLE_EVENTS_DETAILS.find(
    (item: EventData) => item.id === id
  );

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <SingleEvents eventData={data} />
    </>
  );
}

export default Event;