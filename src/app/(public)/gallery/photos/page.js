// import Banner from "@/components/Banner";
import Banner from "../../../../components/Banner";
import DynamicGallery from "../../../../components/ui/dynamic-gallery";
import { BANNER_DATA } from "../../../../lib/data";

export const GALLERY_DATA = [
    "/assets/img/gallery/01.jpg",
    "https://images.unsplash.com/photo-1755378988619-216a5a111e0f?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1755352728634-c0fbda74bb76?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4Mnx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHJhbmRvbXxlbnwwfDB8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1524369609384-10ce89e42d14?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHxyYW5kb218ZW58MHwwfDB8fHww",
    "https://images.unsplash.com/photo-1571327352610-1c5484ccc840?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGFlc3RoZXRpY3xlbnwwfDB8MHx8fDA%3D",
]
export default function PhotoGalleryPage() {
    const bannerData = BANNER_DATA["photos-gallery"];


    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <div className="gallery-area py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <span className="site-title-tagline">
                                    <i className="far fa-book-open-reader"></i> Gallery
                                </span>
                                <h2 className="site-title">
                                    Our Photo <span>Gallery</span>
                                </h2>
                                <p>
                                    It is a long established fact that a reader will be distracted
                                    by the readable content of a page when looking at its layout.
                                </p>
                            </div>
                        </div>
                    </div>
                    <DynamicGallery data={GALLERY_DATA} />
                </div>
            </div>
        </>
    );
}