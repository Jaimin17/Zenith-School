"use client";

import { ALUMNI_DATA, BANNER_DATA } from "../../../lib/data";
import Banner from "../../../components/Banner";
import { CardCarousel } from "../../../components/alumni/CardCarousel";
import AlumniStory from "../../../components/alumni/AlumniStory";
import { JSX } from "react";

export default function AlumniPage() {
  const bannerData = BANNER_DATA["alumni"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <AlumniStory />

      <div className="testimonial-area bg py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> Testimonials
                </span>
                <h2 className="site-title">
                  What Our Students <span>Say's</span>
                </h2>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of
                  a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>
          <div className="testimonial-slider owl-carousel owl-theme">
            <CardCarousel data={ALUMNI_DATA} />
          </div>
        </div>
      </div>
    </>
  );
}