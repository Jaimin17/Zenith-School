"use client";

import Image from "next/image";
import { useEffect } from "react";

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
}

interface CardCarouselProps {
  data: TestimonialItem[];
}

export const CardCarousel: React.FC<CardCarouselProps> = ({ data }) => {
  useEffect(() => {
    async function initCarousel() {
      if (typeof window === "undefined") return;
      
      const $ = (await import("jquery")).default;
      window.$ = window.jQuery = $;
      
      // @ts-ignore - owl.carousel doesn't have types
      await import("owl.carousel");
      
      // @ts-ignore - owlCarousel is added by owl.carousel plugin
      ($(".testimonial-slider") as any).owlCarousel({
      loop: true,
      margin: 24,
      nav: false,
      dots: true,
      autoplay: true,
      autoplayTimeout: 3000,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 }
      }
    });
    }
    
    initCarousel();
  }, []);

  return (
    <>
      {data.map((item, index) => (
        <div 
          className="testimonial-item" 
          key={index} 
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <div className="testimonial-rate" style={{ marginBottom: '16px' }}>
            {[...Array(5)].map((_, i) => (
              <i className="fas fa-star" key={i}></i>
            ))}
          </div>
          <div className="testimonial-quote" style={{ flexGrow: 1 }}>
            <p style={{ minHeight: '80px', overflow: 'hidden' }}>
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
    </>
  );
};