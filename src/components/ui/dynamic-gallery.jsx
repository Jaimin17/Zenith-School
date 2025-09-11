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
                </div>
            </div>
        </>
    );
}
