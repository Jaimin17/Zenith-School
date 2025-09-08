"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
const Map = dynamic(() => import("@/components/Map"), {
  ssr: true,
});

export const ContactUsContainer = () => {
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
                        href="https://live.themewild.com/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="87eee9e1e8c7e2ffe6eaf7ebe2a9e4e8ea"
                      >
                        [email&#160;protected]
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
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-5">
                <div className="contact-img">
                  <Image
                    src={"/assets/img/contact/01.jpg"}
                    alt=""
                    width={10}
                    height={10}
                  />
                </div>
              </div>
              <div className="col-lg-7 align-self-center">
                <div className="contact-form">
                  <div className="contact-form-header">
                    <h2>Get In Touch</h2>
                    <p>
                      It is a long established fact that a reader will be
                      distracted by the readable content of a page randomised
                      words which don't look even slightly when looking at its
                      layout.{" "}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Your Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Your Email"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Your Subject"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      cols="30"
                      rows="5"
                      className="form-control"
                      placeholder="Write Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="theme-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    Send Message <i className="far fa-paper-plane"></i>
                  </button>
                  <div className="col-md-12 mt-3">
                    <div className="form-messege text-success"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d615510.5022021453!2d72.68842878400444!3d21.92553907244295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0241d43bf5073%3A0x31ca5d2247a19cc4!2sZenith%20High%20School!5e1!3m2!1sen!2sin!4v1757358371115!5m2!1sen!2sin" width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy"></iframe>
      </div>
    </>
  );
};

export default ContactUsContainer;
