"use client";

import ActivityEventGallery from "@/components/activityAndEvents/ActivityEventGallery";
import { ImagesSliderDemo } from "@/components/home/ImagesSlider";
import SchoolStatistics from "@/components/statistics/SchoolStatistics";
import { OurTimeline } from "@/components/ui/our-timeline";
import StackCards from "@/components/ui/StackCards";
import {
  EventsData,
  VisionMissionData,
} from "@/lib/data";
import { Box, Typography } from "@mui/material";
import { AnimatedHeader } from "@/components/AnimatedHeader";
import FeaturesCard from "@/components/home/FeaturesCard";
import HomePhotoGallery from "@/components/home/HomePhotoGallery";
import AboutUs from "@/components/about/AboutUs";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import Events from "@/components/gallery/Events";
import PublicLayout from "./(public)/layout";
import HomeTestimonials from "@/components/home/HomeTestimonials";

export default function HomePage() {
  return (
    <PublicLayout>
      <ImagesSliderDemo />

      <FeaturesCard />

      <AboutUs />

      <SchoolStatistics />

      <Events data={EventsData} />

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

          <HomePhotoGallery />
        </div>
      </div>

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
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div>
            </div>
          </div>

          <HomeTestimonials />
        </div>
      </div>

      <div className="contact-area py-120">
        <div className="container">
          <ContactUsForm />
        </div>
      </div>

      <div className="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615510.5022021453!2d72.68842878400444!3d21.92553907244295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0241d43bf5073%3A0x31ca5d2247a19cc4!2sZenith%20High%20School!5e1!3m2!1sen!2sin!4v1757358371115!5m2!1sen!2sin"
          width={600}
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </PublicLayout>
  );
}
