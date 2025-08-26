import Banner from "@/components/Banner";
import DynamicGallery from "@/components/ui/dynamic-gallery";
import { BANNER_DATA } from "@/lib/data";

export default function eventsPage() {
    const bannerData = BANNER_DATA["events-gallery"];

    const data = [
        {
            image: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Science Fair 2023",
            description: "Our annual Science Fair showcased innovative projects from students across all grades, highlighting their creativity and scientific inquiry."
        }, 
        {
            image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Art Exhibition",
            description: "The Art Exhibition featured stunning works from our talented students, celebrating creativity and artistic expression in various mediums."
        },
        {
            image: "https://images.unsplash.com/photo-1516600164266-f3b8166ae679?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Sports Day",
            description: "Sports Day was a thrilling event filled with competitive spirit, teamwork, and fun activities that brought our school community together."
        }, 
        {
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Cultural Fest",
            description: "The Cultural Fest celebrated the diverse cultures within our school through performances, food stalls, and interactive workshops."
        },
        {
            image: "https://images.unsplash.com/photo-1649471323554-aa4cb720261c?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Tech Symposium",
            description: "The Tech Symposium provided a platform for students to present their tech projects and innovations, fostering a passion for technology and problem-solving."
        }
    ]

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <DynamicGallery data={data} />
        </>
    );
}