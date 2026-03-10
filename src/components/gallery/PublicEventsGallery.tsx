"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchPublicEventsListAction } from "@/actions/admin";
import { getEventImageUrl } from "@/utils/imageHelpers";
import type { EventsWithRelations } from "@/types/schemas";

interface PublicEventsGalleryProps {
  showPagination?: boolean;
  showHeading?: boolean;
  tagline?: string;
  title?: string;
  highlight?: string;
  description?: string;
}

const formatEventDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "TBA";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatEventTime = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "TBA";
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
};

const PublicEventsGallery = ({
  showPagination = true,
  showHeading = true,
  tagline = "Events",
  title = "Our Upcoming",
  highlight = "Events",
  description =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
}: PublicEventsGalleryProps) => {
  const [events, setEvents] = useState<EventsWithRelations[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchPublicEventsListAction(showPagination ? page : 1);

        if (!result.success || !result.data) {
          setEvents([]);
          setTotalPages(1);
          setError(result.error || "Unable to load events.");
          return;
        }

        setEvents(result.data.data || []);
        setTotalPages(Math.max(1, result.data.total_pages || 1));
      } catch (err) {
        setEvents([]);
        setTotalPages(1);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, showPagination]);

  const pageNumbers = useMemo(() => {
    const maxVisible = 3;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  }, [page, totalPages]);

  return (
    <div className="event-area py-120">
      <div className="container">
        {showHeading && (
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">
                  <i className="far fa-book-open-reader"></i> {tagline}
                </span>
                <h2 className="site-title">
                  {title} <span>{highlight}</span>
                </h2>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="row">
            {[1, 2, 3].map((item) => (
              <div key={item} className="col-lg-4">
                <div className="event-item">
                  <div className="event-img">
                    <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                  <div className="event-info">
                    <div className="w-2/3 h-4 bg-gray-200 rounded mb-3" />
                    <div className="w-full h-4 bg-gray-200 rounded mb-2" />
                    <div className="w-5/6 h-4 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="row">
            <div className="col-12 text-center text-red-500">{error}</div>
          </div>
        ) : events.length === 0 ? (
          <div className="row">
            <div className="col-12 text-center text-gray-500">No events available.</div>
          </div>
        ) : (
          <div className="row">
            {events.map((item) => {
              const rawImage = item.img?.[0];
              const hasImage = Boolean(rawImage);
              const imageSrc = hasImage ? getEventImageUrl(rawImage) : null;
              const dateLabel = formatEventDate(item.start_time);
              const timeLabel = formatEventTime(item.start_time, item.end_time);
              const locationLabel = item.related_class?.name || "Zenith High School";

              return (
                <div className="col-lg-4" key={item.id}>
                  <div className="event-item">
                    <div className="event-location">
                      <span>
                        <i className="far fa-map-marker-alt"></i> {locationLabel}
                      </span>
                    </div>
                    <div className="event-img">
                      {hasImage && imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={item.title}
                          width={600}
                          height={360}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                          <i className="far fa-image text-4xl"></i>
                        </div>
                      )}
                    </div>
                    <div className="event-info">
                      <div className="event-meta">
                        <span className="event-date">
                          <i className="far fa-calendar-alt"></i>
                          {dateLabel}
                        </span>
                        <span className="event-time">
                          <i className="far fa-clock"></i>
                          {timeLabel}
                        </span>
                      </div>
                      <h4 className="event-title">
                        <Link href={`/gallery/events/${item.id}`}>{item.title}</Link>
                      </h4>
                      <p>{item.description}</p>
                      <div className="event-btn">
                        <Link href={`/gallery/events/${item.id}`} className="theme-btn">
                          Join Event<i className="fas fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showPagination && totalPages > 1 && (
          <div className="pagination-area">
            <div aria-label="Event gallery pagination">
              <ul className="pagination">
                <li className={`page-item ${page === 1 ? "disabled pointer-events-none opacity-50" : ""}`}>
                  <button className="page-link" onClick={() => setPage((prev) => Math.max(1, prev - 1))} aria-label="Previous">
                    <span aria-hidden="true">
                      <i className="far fa-arrow-left"></i>
                    </span>
                  </button>
                </li>

                {pageNumbers.map((pageNumber) => (
                  <li key={pageNumber} className={`page-item ${page === pageNumber ? "active" : ""}`}>
                    <button className="page-link" onClick={() => setPage(pageNumber)}>
                      {pageNumber}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page === totalPages ? "disabled pointer-events-none opacity-50" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">
                      <i className="far fa-arrow-right"></i>
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicEventsGallery;
