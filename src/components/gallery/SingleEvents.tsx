import Image from 'next/image';
import React from 'react';
import DynamicGallery from '../ui/dynamic-gallery';

interface EventOrganizer {
  image: string;
  name: string;
  detail: string;
}

interface EventData {
  singleImage: string;
  about: string;
  where: string;
  for: string;
  heading: string;
  date: string;
  time: string;
  location: string;
  cost: string;
  organizer: EventOrganizer;
  images: any[];
}

interface SingleEventsProps {
  eventData: EventData;
}

const SingleEvents: React.FC<SingleEventsProps> = ({ eventData }) => {
  return (
    <>
      <div className="event-single-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="event-details">
                <Image 
                  src={eventData.singleImage} 
                  alt="event image" 
                  height={800} 
                  width={900} 
                />

                <div className="my-4">
                  <h3 className="mb-2">About The Event</h3>
                  <p>{eventData.about}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2">Where The Event?</h3>
                  <p>{eventData.where}</p>
                </div>

                <div className="mb-4">
                  <h3 className="mb-2">Who This Event Is For?</h3>
                  <p>{eventData.for}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="widget event-single-info">
                <h4 className="widget-title">Event Information</h4>
                <p>{eventData.heading}</p>
                <div className="event-content">
                  <div className="event-content-single">
                    <h5>
                      <a href="#">Event Date</a>
                    </h5>
                    <p>
                      <i className="far fa-calendar-alt"></i> {eventData.date}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <a href="#">Event Time</a>
                    </h5>
                    <p>
                      <i className="far fa-clock"></i> {eventData.time}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <a href="#">Event Location</a>
                    </h5>
                    <p>
                      <i className="far fa-map-marker-alt"></i> {eventData.location}
                    </p>
                  </div>
                  <div className="event-content-single">
                    <h5>
                      <a href="#">Event Cost</a>
                    </h5>
                    <p>
                      <i className="far fa-usd-circle"></i> {eventData.cost}
                    </p>
                  </div>

                  <a href="#" className="theme-btn mt-4">
                    Book Now <i className="fas fa-arrow-right-long"></i>
                  </a>
                </div>
              </div>
              <div className="widget event-author">
                <h4 className="widget-title">Event Organizer</h4>
                <div className="event-author-info">
                  <Image 
                    src={eventData.organizer.image} 
                    alt="event organizer" 
                    width={100} 
                    height={100} 
                  />
                  <h5>{eventData.organizer.name}</h5>
                  <p>{eventData.organizer.detail}</p>
                </div>
              </div>
            </div>
          </div>
          <DynamicGallery data={eventData.images} />
        </div>
      </div>
    </>
  );
};

export default SingleEvents;