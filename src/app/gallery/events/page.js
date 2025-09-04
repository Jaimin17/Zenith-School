import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA, EventsData } from "@/lib/data";

export default function eventsPage() {
    const bannerData = BANNER_DATA["events-gallery"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <DynamicGallery data={EventsData} />
        </>
    );
}