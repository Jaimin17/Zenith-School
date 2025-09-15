"use client";

import { useEffect } from "react";

export default function DynamicGallery({ data }) {

    useEffect(() => {
        if (typeof window !== "undefined") {
            $(".popup-img").magnificPopup({
                type: "image",
                gallery: {
                    enabled: true
                }
            });
        }
    }, []);

    const groupedImages = [];
    for (let i = 0; i < data.length; i += 2) {
        groupedImages.push(data.slice(i, i + 2));
    }

    return (
        <>

            <div className="row popup-gallery">
                {groupedImages.map((group, index) => (
                    <div
                        key={index}
                        className="col-md-4 wow fadeInUp"
                        data-wow-delay={`.${(index + 1) * 25}s`}
                    >
                        {group.map((image, imgIndex) => (
                            <div className="gallery-item" key={imgIndex}>
                                <div className="gallery-img">
                                    <img src={image} alt={`Gallery ${index}-${imgIndex}`} />
                                </div>
                                <div className="gallery-content">
                                    <a className="popup-img gallery-link" href={image}>
                                        <i className="fal fa-plus"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}
