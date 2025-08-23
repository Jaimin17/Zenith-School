import Banner from "@/components/Banner";
import { BANNER_DATA } from "@/lib/data";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import Card from "@/components/about/card";

export default function stateOfTheArtInfrastructurePage() {
  const dummyData = {
    image:
      "https://images.unsplash.com/photo-1728206348193-9b5ae74a7d32?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const dummyCardData = [
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
  ]

  const bannerData = BANNER_DATA["state-of-the-art-infrastructure"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ py: 6 }}>
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            alignItems="flex-start"
            gap={6}
          >
            {/* Left Content */}
            <Box flex={1}>
              {/* Small Orange Heading */}
              <Typography
                variant="subtitle2"
                sx={{
                  color: "orange",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  mb: 1,
                  display: "inline-block",
                  borderBottom: "2px solid orange",
                  pb: 0.5,
                }}
              >
                🏫 Infrastructure
              </Typography>

              {/* Main Heading */}
              <Typography
                variant="h4"
                sx={{ fontWeight: 800, mb: 2, lineHeight: 1.3 }}
              >
                Details About{" "}
                <Box component="span" sx={{ color: "orange" }}>
                  State-of-the-Art
                </Box>{" "}
                Infrastructure.
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
              >
                Our state-of-the-art infrastructure is designed to provide an optimal
                learning environment for our students. From modern classrooms equipped
                with the latest technology to spacious libraries and laboratories,
                every aspect of our campus is tailored to enhance the educational
                experience.
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                ab illo inventore veritatis et quasi architecto beatae vitae dicta
                sunt explicabo.
              </Typography>
            </Box>

            {/* Right Image */}
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", md: "500px" },
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={dummyData.image}
                alt="State of the Art Infrastructure"
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 350, md: 450 },
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              />
            </Box>
          </Box>
        </Container>
        <Box
          display={"flex"}
          flexDirection={"row"}
          gap={4}
          sx={{
            flexWrap: { xs: "wrap" },
          }}
          alignItems={"center"}
          justifyContent={"space-between"}
          mt={6}
        >
          {dummyCardData.map((card, index) => {
            return (
              <Box key={index}
                sx={{
                  flexBasis: { xs: "100%", md: "45%" }, // 1 per row on mobile, 2 per row on desktop
                  maxWidth: { xs: "100%", md: "45%" },
                }}
              >
                <Card
                  title={card.title}
                  description={card.description}
                  image={card.image}
                />
              </Box>
            )
          })}
        </Box>
      </Container>
    </>
  );
}
