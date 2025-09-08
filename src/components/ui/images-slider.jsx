import React from "react";

function ImagesSlider({ images }) {
  return (
    <>
      <div className="hero-section">
        <div className="hero-slider owl-carousel owl-theme">
          {images.map((image, index) => (
            <div
              key={index}
              className="hero-single"
              background={image}
              // style={{
              //   backgroundImage: `url(${image})`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center",
              //   backgroundRepeat: "no-repeat"
              // }}
            >
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-12 col-lg-7">
                    <div className="hero-content">
                      <h6
                        className="hero-sub-title"
                        data-animation="fadeInDown"
                        data-delay=".25s"
                      >
                        <i className="far fa-book-open-reader"></i>Welcome To
                        Eduka!
                      </h6>
                      <h1
                        className="hero-title"
                        data-animation="fadeInRight"
                        data-delay=".50s"
                      >
                        Start Your Beautiful And <span>Bright</span> Future
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".75s">
                        There are many variations of passages orem psum
                        available but the majority have suffered alteration in
                        some repeat predefined chunks form injected humour.
                      </p>
                      <div
                        className="hero-btn"
                        data-animation="fadeInUp"
                        data-delay="1s"
                      >
                        <a href="about.html" className="theme-btn">
                          About More<i className="fas fa-arrow-right-long"></i>
                        </a>
                        <a href="contact.html" className="theme-btn theme-btn2">
                          Learn More<i className="fas fa-arrow-right-long"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ImagesSlider;