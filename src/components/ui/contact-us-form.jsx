"use client";
import Image from "next/image";
import React from "react";

export function ContactUsForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="contact-wrapper">
      <div className="row">
        <div className="col-lg-5">
          <div className="contact-img">
            <Image
              src={"/assets/img/contact/01.jpg"}
              alt=""
              width={600}
              height={800}
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
              onClick={handleSubmit}
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
  );
}
