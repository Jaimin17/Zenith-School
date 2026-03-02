"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

declare global {
  interface Window {
    $: any;
    jQuery: any;
  }
}

interface TestimonialItem {
  testimonial: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
}

interface CardCarouselProps {
  data: TestimonialItem[];
}

/**
 * Self-contained Owl Carousel wrapper.
 * Renders its own container div and initialises Owl via a ref so it never
 * conflicts with the global main.js selector (.testimonial-slider).
 */
export const CardCarousel: React.FC<CardCarouselProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const owlRef = useRef<any>(null);
  const destroyedRef = useRef(false);

  const destroyOwl = useCallback(() => {
    try {
      if (owlRef.current && owlRef.current.hasClass("owl-loaded")) {
        owlRef.current.trigger("destroy.owl.carousel");
      }
    } catch {
      /* ignore cleanup errors */
    }
    owlRef.current = null;
  }, []);

  useEffect(() => {
    destroyedRef.current = false;

    async function initCarousel() {
      if (typeof window === "undefined" || !data.length || !containerRef.current) return;

      const $ = (await import("jquery")).default;
      window.$ = window.jQuery = $;

      // @ts-ignore – owl.carousel has no types
      await import("owl.carousel");

      if (destroyedRef.current || !containerRef.current) return;

      destroyOwl();

      const $el = $(containerRef.current);
      owlRef.current = $el;

      // Disable loop when item count is too low — Owl clones items to fill
      // the carousel when loop is on, causing duplicates.
      const count = data.length;

      $el.owlCarousel({
        loop: count > 3,
        margin: 24,
        nav: false,
        dots: true,
        autoplay: count > 1,
        autoplayTimeout: 3000,
        responsive: {
          0: { items: 1 },
          600: { items: Math.min(2, count) },
          1000: { items: Math.min(3, count) },
        },
      });
    }

    initCarousel();

    return () => {
      destroyedRef.current = true;
      destroyOwl();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data.length) return null;

  return (
    <div ref={containerRef} className="owl-carousel owl-theme">
      {data.map((item, index) => (
        <div
          className="testimonial-item"
          key={`${item.name}-${index}`}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className="testimonial-rate" style={{ marginBottom: "16px" }}>
            {[...Array(5)].map((_, i) => (
              <i
                className={`${i < Math.round(Math.max(0, Math.min(5, item.rating ?? 5))) ? "fas" : "far"} fa-star`}
                key={i}
              ></i>
            ))}
          </div>
          <div className="testimonial-quote" style={{ flexGrow: 1 }}>
            <p style={{ minHeight: "80px", overflow: "hidden" }}>
              {item.testimonial}
            </p>
          </div>
          <div className="testimonial-content">
            <div className="testimonial-author-img">
              <Image
                src={item.image}
                alt="testimonial DP"
                height={200}
                width={200}
              />
            </div>
            <div className="testimonial-author-info">
              <h4>{item.name}</h4>
              <p>{item.role}</p>
            </div>
          </div>
          <span className="testimonial-quote-icon">
            <i className="far fa-quote-right"></i>
          </span>
        </div>
      ))}
    </div>
  );
};