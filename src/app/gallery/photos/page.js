import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA } from "@/lib/data";

export default function photoGalleryPage() {
    const bannerData = BANNER_DATA["photos-gallery"];

    const data = [
        {
            image: "https://images.unsplash.com/photo-1755378988619-216a5a111e0f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
            title: "Campus Life",
            description: "A glimpse into the vibrant campus life, showcasing students engaging in various activities and events."
        },
        {
            image: "https://images.unsplash.com/photo-1755352728634-c0fbda74bb76?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D",
            title: "Academic Excellence",
            description: "Students immersed in learning, highlighting the academic environment and dedication to excellence."
        },
        {
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJhbmRvbXxlbnwwfDB8MHx8fDA%3D",
            title: "Cultural Events",
            description: "Celebrating diversity through cultural events that bring the school community together."
        },
        {
            image: "https://images.unsplash.com/photo-1524369609384-10ce89e42d14?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxyYW5kb218ZW58MHwwfDB8fHww",
            title: "Sports and Recreation",
            description: "Showcasing the school's sports facilities and students participating in various athletic activities."
        },
        {
            image: "https://images.unsplash.com/photo-1571327352610-1c5484ccc840?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFlc3RoZXRpY3xlbnwwfDB8MHx8fDA%3D",
            title: "Community Service",
            description: "Students engaging in community service activities, reflecting the school's commitment to social responsibility."
        }
    ]

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <DynamicGallery data={data} />
        </>
    );
}