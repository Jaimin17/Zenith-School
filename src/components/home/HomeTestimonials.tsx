"use client";

import { useEffect, useState } from "react";
import { CardCarousel } from "@/components/alumni/CardCarousel";
import { fetchPublicTestimonialsAction } from "@/actions/admin";
import { getStudentImageUrl } from "@/utils/imageHelpers";

type CarouselItem = {
  testimonial: string;
  image: string;
  name: string;
  role: string;
  rating?: number;
};

const DEFAULT_IMAGES = [
  "/assets/img/testimonial/01.jpg",
  "/assets/img/testimonial/02.jpg",
  "/assets/img/testimonial/03.jpg",
  "/assets/img/testimonial/04.jpg",
];

/**
 * Plain skeleton shown while the API request is in-flight.
 * Rendered OUTSIDE any Owl Carousel container so jQuery never touches these nodes.
 */
const TestimonialsSkeleton = () => (
  <div className="row">
    {[1, 2, 3].map((item) => (
      <div key={item} className="col-lg-4 col-md-6">
        <div
          className="testimonial-item"
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className="testimonial-rate" style={{ marginBottom: "16px" }}>
            {[...Array(5)].map((_, i) => (
              <i className="far fa-star text-gray-300" key={i}></i>
            ))}
          </div>

          <div className="testimonial-quote" style={{ flexGrow: 1 }}>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
            </div>
          </div>

          <div className="testimonial-content mt-4">
            <div className="testimonial-author-img">
              <div className="w-[60px] h-[60px] rounded-full bg-gray-200" />
            </div>
            <div className="testimonial-author-info">
              <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded" />
            </div>
          </div>

          <span className="testimonial-quote-icon">
            <i className="far fa-quote-right text-gray-300"></i>
          </span>
        </div>
      </div>
    ))}
  </div>
);

const HomeTestimonials = () => {
  const [items, setItems] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const result = await fetchPublicTestimonialsAction();

        if (result.success && result.data?.length) {
          const mapped = result.data
            .map((item, index) => ({
              testimonial: item.description || "",
              image: getStudentImageUrl(item.student.img) || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
              name:
                item.student.username ||
                `${item.student.first_name || ""} ${item.student.last_name || ""}`.trim() ||
                "Student",
              role: "Student",
              rating: item.rating,
            }))
            .filter((item) => item.testimonial.trim().length > 0);

          setItems(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <TestimonialsSkeleton />;
  }

  if (!items.length) {
    return null;
  }

  /* CardCarousel now renders its own owl-carousel wrapper div */
  return <CardCarousel data={items} />;
};

export default HomeTestimonials;
