"use client";

import { useEffect } from "react";

export default function ImagesSlider({ images }) {
  useEffect(() => {
    const interval = setTimeout(() => {
      if (typeof window !== "undefined" && window.$) {
        window.$(".hero-slider").owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          items: 1,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
        });
      }
    }, 300);

    return () => clearTimeout(interval);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-slider owl-carousel owl-theme">
        {images.map((img, i) => (
          <div key={i} className="hero-single" style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          </div>
        ))}
      </div>
    </div>
  );
}
