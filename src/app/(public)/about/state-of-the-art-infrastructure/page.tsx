import { JSX } from "react";
import Banner from "../../../../components/Banner";
import { BANNER_DATA } from "../../../../lib/data";
import { Container } from "@mui/material";

interface CardData {
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface DummyData {
  image: string;
}

export default function StateOfTheArtInfrastructurePage(): JSX.Element {
  const dummyData: DummyData = {
    image:
      "https://images.unsplash.com/photo-1728206348193-9b5ae74a7d32?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const dummyCardData: CardData[] = [
    {
      title: "Modern Classrooms",
      description:
        "Our classrooms are equipped with the latest technology to facilitate interactive learning and collaboration among students.",
      image:
        "https://images.unsplash.com/photo-1633716519837-0dd338bdcc59?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Advanced Laboratories",
      description:
        "State-of-the-art laboratories provide students with hands-on experience in science and technology, fostering innovation and discovery.",
      image:
        "https://images.unsplash.com/photo-1582719299074-be127353065f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Spacious Libraries",
      description:
        "Our libraries offer a vast collection of resources and a quiet environment conducive to study and research.",
      image:
        "https://images.unsplash.com/photo-1688110395685-ce24e1949bca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sports Facilities",
      description:
        "Our sports facilities include a gymnasium, swimming pool, and various outdoor fields to promote physical fitness and teamwork.",
      image:
        "https://images.unsplash.com/photo-1625510884762-522d5c1c8811?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const bannerData = BANNER_DATA["state-of-the-art-infrastructure"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ py: 6 }}>
        <div className="campus-tour pt-120 pb-80">
          <div className="container">
            <div className="row align-items-center">
              {/* Left Content */}
              <div className="col-lg-6">
                <div className="content-info wow fadeInUp" data-wow-delay=".25s">
                  <div className="site-heading mb-3">
                    <span className="site-title-tagline">
                      <i className="far fa-book-open-reader"></i> Campus Tour
                    </span>
                    <h2 className="site-title">
                      Details About <span>State-of-the-Art</span> Infrastructure.
                    </h2>
                  </div>

                  <p className="content-text">
                    Our state-of-the-art infrastructure is designed to provide an
                    optimal learning environment for our students. From modern
                    classrooms equipped with the latest technology to spacious
                    libraries and laboratories, every aspect of our campus is
                    tailored to enhance the educational experience.
                  </p>

                  <p className="content-text mt-2">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                    quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo.
                  </p>
                </div>
              </div>

              {/* Right Image */}
              <div className="col-lg-6">
                <div className="content-img wow fadeInRight" data-wow-delay=".25s">
                  <img
                    src={dummyData.image}
                    alt="State of the Art Infrastructure"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {dummyCardData.map((card, index) => (
            <div className="col-lg-4 mt-4" key={index}>
              <div
                className="event-item wow fadeInUp"
                data-wow-delay=".25s"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Image */}
                <div className="event-img">
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>

                {/* Info Section */}
                <div
                  className="event-info"
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "15px",
                  }}
                >
                  <h4 className="event-title" style={{ marginBottom: "10px" }}>
                    <a href={card.link || "#"}>{card.title}</a>
                  </h4>

                  <p
                    style={{
                      flexGrow: 1,
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      lineHeight: "1.5",
                    }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}