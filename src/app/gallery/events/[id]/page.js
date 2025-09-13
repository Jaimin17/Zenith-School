import Banner from '@/components/Banner';
import SingleEvents from '@/components/gallery/SingleEvents';
import DynamicGallery from '@/components/ui/dynamic-gallery';
import { BANNER_DATA, SINGLE_EVENTS_DETAILS } from '@/lib/data';
import React from 'react'

async function Event(props) {
    const bannerData = BANNER_DATA["events-gallery"];

    const { id } = await props.params;
    const data = SINGLE_EVENTS_DETAILS.filter((item) => item.id == id)[0];
    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <SingleEvents eventData={data} />

            <DynamicGallery data={data.images} />
        </>
    )
}

export default Event