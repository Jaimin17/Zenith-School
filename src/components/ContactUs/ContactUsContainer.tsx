"use client";

import React from "react";
import { ContactUsForm } from "../ui/contact-us-form";

export const ContactUsContainer: React.FC = () => {
  return (
    <>
      <div className="contact-area py-120">
        <div className="container">
          <div className="contact-content">
            <div className="row">
              <div className="col-md-3">
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <i className="fal fa-map-location-dot"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5>Office Address</h5>
                    <p>25/B Milford, New York, USA</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <i className="fal fa-phone-volume"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5>Call Us</h5>
                    <p>+2 123 4565 789</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <i className="fal fa-envelopes"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5>Email Us</h5>
                    <p>
                      <a
                        href="mailto:info@zenithschool.edu"
                        className="__cf_email__"
                      >
                        info@zenithschool.edu
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="contact-info">
                  <div className="contact-info-icon">
                    <i className="fal fa-alarm-clock"></i>
                  </div>
                  <div className="contact-info-content">
                    <h5>Open Time</h5>
                    <p>Mon - Sat (10.00AM - 05.30PM)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContactUsForm />
        </div>
      </div>

      <div className="contact-map">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615510.5022021453!2d72.68842878400444!3d21.92553907244295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0241d43bf5073%3A0x31ca5d2247a19cc4!2sZenith%20High%20School!5e1!3m2!1sen!2sin!4v1757358371115!5m2!1sen!2sin" 
          width="600" 
          height="450" 
          style={{ border: "0" }} 
          allowFullScreen 
          loading="lazy"
          title="Zenith High School Location"
        />
      </div>
    </>
  );
};

export default ContactUsContainer;