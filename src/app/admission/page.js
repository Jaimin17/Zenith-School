"use client";

import Banner from "@/components/Banner";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import {
  Box,
  CardMedia,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { AdmissionAccordion } from "@/components/ui/admission/Accordion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

export default function admissionPage() {
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

      <Container sx={{ py: 6 }}>
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

        <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
          <Box>
            <Typography
              fontWeight={700}
              display={"flex"}
              justifyContent={"center"}
              variant="h4"
              sx={{ pb: 4 }}
            >
              Admission Form
            </Typography>
          </Box>
          <ContactUsForm />
        </Container>
        <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 10 } }}>
          <Box>
            <Typography
              fontWeight={700}
              display={"flex"}
              justifyContent={"center"}
              variant="h4"
              sx={{ pb: 4 }}
            >
              FAQ's
            </Typography>
          </Box>
          <AdmissionAccordion contents={dummyFAQData} />
        </Container>
        {/* faq area */}
        <div className="faq-area py-120">
          <div className="container">
            <div className="row">
              {/* Left Side Content */}
              <div className="col-lg-6">
                <div className="faq-right">
                  <div className="site-heading mb-3">
                    <span className="site-title-tagline justify-content-start">
                      <i className="far fa-book-open-reader"></i> FAQ's
                    </span>
                    <h2 className="site-title my-3">
                      General <span>frequently</span> asked questions
                    </h2>
                  </div>
                  <p className="mb-3">
                    Find answers to the most common questions about our admission
                    process, eligibility, and other important details.
                  </p>
                  <p className="mb-4">
                    If you don’t see your question here, feel free to contact us
                    directly. Our team is here to guide you through every step of the
                    process.
                  </p>
                  <a href="#" className="theme-btn mt-2">
                    Have Any Question ?
                  </a>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <span><i className="far fa-question"></i></span> How Can do I apply ?
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span><i className="far fa-question"></i></span> How Can I Become A Member ?
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <span><i className="far fa-question"></i></span> What Payment Gateway You Support ?
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <span><i className="far fa-question"></i></span> How Can I Cancel My Request ?
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        We denounce with righteous indignation and dislike men who
                        are so beguiled and demoralized by the charms of pleasure of the moment so
                        blinded by desire ante odio dignissim quam vitae pulvinar turpis.
                      </div>
                    </div>
                  </div>
                </div>
              </div>





            </div>
          </div>
        </div>
        {/* faq area end */}

        {/* <div className="faq-area py-32 h-fit w-fit">
          <div className="container mx-auto">
            <div className="row flex flex-wrap">
              <div className="col-lg-6">
                <div className="faq-right">
                  <div className="site-heading mb-3">
                    <span className="site-title-tagline justify-content-start inline-flex items-center">
                      <i className="far fa-book-open-reader mr-2"></i> Faq's
                    </span>
                    <h2 className="site-title my-3">
                      General <span className="text-indigo-600">frequently</span> asked questions
                    </h2>
                  </div>
                  <p className="mb-3">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even.
                  </p>
                  <p className="mb-4">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </p>
                  <a href="#" className="theme-btn mt-2 inline-block bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700">
                    Have Any Question ?
                  </a>
                </div>
              </div>

              
              <div className="col-lg-6">
                <div className="accordion">
                  {dummyFAQData.map((faq, index) => (
                    <div className="accordion-item border-b" key={index}>
                      <h2 className="accordion-header" id={`headingOne`}>
                        <button
                          className="accordion-button w-full flex justify-between items-center px-6 py-4 font-semibold text-left bg-gray-100 hover:bg-gray-200 rounded-t"
                          type="button"
                          onClick={() => toggleAccordion(index)}
                        >
                          <span className="flex items-center w-full">
                            <i className="far fa-question mr-2"></i> {faq.title}
                          </span>
                          <span>{openIndex === index ? "-" : "+"}</span>
                        </button>
                      </h2>

                      {openIndex === index && (
                        <div className="accordion-body px-6 py-4 bg-white">
                          {faq.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}


      </Container>
    </>
  );
}
