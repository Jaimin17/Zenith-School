import Image from "next/image";
import React from "react";
import DynamicGallery from "../ui/dynamic-gallery";
import type { EventsWithRelations } from "@/types/schemas";
import { getEventImageUrl } from "@/utils/imageHelpers";

interface SingleEventsProps {
  eventData: EventsWithRelations;
}

const SingleEvents: React.FC<SingleEventsProps> = ({ eventData }) => {
  const images = eventData.img ?? [];
  const hasHeroImage = Boolean(images[0]);
  const heroImage = hasHeroImage ? getEventImageUrl(images[0]) : null;
  const galleryImages = images.slice(1).map((image) => getEventImageUrl(image));

  const startDate = new Date(eventData.start_time);
  const endDate = new Date(eventData.end_time);

  const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

  const dateLabel = isValidDate(startDate)
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(startDate)
    : "TBA";

  const timeLabel = isValidDate(startDate) && isValidDate(endDate)
    ? `${new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(startDate)} - ${new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(endDate)}`
    : "TBA";

  const locationLabel = eventData.related_class?.name || "Zenith High School";
  const audienceLabel = eventData.related_class?.name ? `Class ${eventData.related_class.name}` : "All Students";

  return (
    <>
      <div className="event-single-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="event-details">
                {hasHeroImage && heroImage ? (
                  <Image
                    src={heroImage}
                    alt={eventData.title}
                    height={800}
                    width={900}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-96 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                    <i className="far fa-image text-5xl"></i>
                  </div>
                )}

                <div className="my-4">
                  <h3 className="mb-2">{eventData.title}</h3>
                  <p>{eventData.description}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2">Event Highlights</h3>
                  <p>
                    Join us for an engaging school event filled with learning, collaboration, and celebration.
                    Check the event details for schedule and location.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget event-single-info">
                <h4 className="widget-title">Event Information</h4>
                <p>{eventData.description}</p>
                <div className="event-content">
                  <div className="event-content-single">
                    <h5>
                      <span>Event Date</span>
                    </h5>
                    <p>
                      <i className="far fa-calendar-alt"></i> {dateLabel}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <span>Event Time</span>
                    </h5>
                    <p>
                      <i className="far fa-clock"></i> {timeLabel}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <span>Event Location</span>
                    </h5>
                    <p>
                      <i className="far fa-map-marker-alt"></i> {locationLabel}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <span>Audience</span>
                    </h5>
                    <p>
                      <i className="far fa-users"></i> {audienceLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {galleryImages.length > 0 && <DynamicGallery data={galleryImages} />}
        </div>
      </div>
    </>
  );
};

export default SingleEvents;