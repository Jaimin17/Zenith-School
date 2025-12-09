'use client'

import { useEffect } from "react";

export default function DynamicGallery({ data }) {

    useEffect(() => {
        async function loadPlugins() {
            if (typeof window === "undefined") return;

            const $ = (await import("jquery")).default;
            window.$ = window.jQuery = $;

            await import("magnific-popup");
            await import("magnific-popup/dist/magnific-popup.css");

            $(".popup-img").magnificPopup({
                type: "image",
                gallery: { enabled: true },
            });
        }

        loadPlugins();
    }, []);

    const groupedImages = [];
    for (let i = 0; i < data.length; i += 2) {
        groupedImages.push(data.slice(i, i + 2));
    }

    return (
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
    );
}
