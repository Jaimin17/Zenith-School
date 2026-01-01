"use client";

import Banner from "@/components/Banner";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import {
  Box,
  Container,
  Typography,
} from "@mui/material";
import { AdmissionAccordion } from "@/components/ui/admission/Accordion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

export default function AdmissionPage() {
  const bannerData = BANNER_DATA["admission"];
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  const dummyData = {
    image:
      "https://images.unsplash.com/photo-1754506824681-4dd2a5fe7f6b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const dummyFAQData = [
    {
      title: "What are the special features of your school?",
      content:
        "We are living in a technology rich world. Science and technology are extremely popular with learners of today; they are also pathways to career opportunities in the future. Zenith school has a learning environment where all the students learn to be technology fluent and they develop real life skills such as co-operation, self-confidence, teamwork, creativity and innovation.",
    },
    {
      title: "Do you provide mid-day meal?",
      content:
        "We provide meal to the students of Nursery to class 2. For other students, we have a well maintained canteen, where students can enjoy hygienic meal during their break time.",
    },
    {
      title: "What is the qualification/background of teacher that we have?",
      content:
        "All our teachers are well qualified as per the Gujarat Government Education Board with minimum graduation as the requirement.",
    },
  ];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ py: 6, backgroundColor: "white" }}>
        <div className="how-apply pt-120 pb-80">
          <div className="container">
            <div className="row align-items-center">
              {/* Left Side - Content */}
              <div className="col-lg-6">
                <div className="content-info wow fadeInUp" data-wow-delay=".25s">
                  <div className="site-heading mb-3">
                    <span className="site-title-tagline">
                      <i className="far fa-book-open-reader"></i> How To Apply
                    </span>
                    <h2 className="site-title">
                      Details About <span>How To Apply</span> Eduka.
                    </h2>
                  </div>

                  <p className="content-text">
                    For Nursery, the child has to complete three years of age, and for
                    Kindergarten, the child has to complete four years of age by 31st
                    May of the Academic session for which the parent is seeking
                    admission.
                  </p>

                  <p className="content-text mt-2">
                    Admissions are conducted in different months for various classes as
                    per school norms. Please follow the official admission schedule.
                  </p>

                  <div className="row my-3">
                    <div className="col-md-6">
                      <ul className="content-list">
                        <li>
                          <i className="fas fa-check-circle"></i> Nursery & K.G. –
                          Admissions in November
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i> Class I – Admissions in
                          January
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i> Class II to IX –
                          Admissions in March (Subject to vacancy)
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="content-list">
                        <li>
                          <i className="fas fa-check-circle"></i> Class XI Science & General – After Board Results
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i> Submit Documents
                        </li>
                        <li>
                          <i className="fas fa-check-circle"></i> Final Confirmation
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="content-btn">
                    <a href="#" className="theme-btn">
                      Apply Now <i className="fas fa-arrow-right-long"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="col-lg-6">
                <div className="content-img wow fadeInRight" data-wow-delay=".25s">
                  <img src={dummyData.image} alt="Admission" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <AdmissionAccordion contents={dummyFAQData} />
    </>
  );
}
