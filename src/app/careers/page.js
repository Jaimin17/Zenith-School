import Banner from "@/components/Banner";
import { HoverEffect } from "@/components/ui/career/card-hover-effect";
import { CareersForm } from "@/components/ui/careers-form";
import { BANNER_DATA } from "@/lib/data";
import { Box, Container, Typography } from "@mui/material";

export default function careersPage() {
  const bannerData = BANNER_DATA["careers"];

  const jobItems = [
  {
    title: "Math Teacher",
    experience: "2+ Years",
    positions: "3",
    link: "#",
    applyLink: "/apply/math-teacher",
  },
  {
    title: "Science Teacher",
    experience: "3+ Years",
    positions: "2",
    link: "#",
    applyLink: "/apply/science-teacher",
  },
  {
    title: "English Teacher",
    experience: "1+ Year",
    positions: "4",
    link: "#",
    applyLink: "/apply/english-teacher",
  },
  {
    title: "Sports Coach",
    experience: "2+ Years",
    positions: "1",
    link: "#",
    applyLink: "/apply/sports-coach",
  },
  {
    title: "Music Teacher",
    experience: "1+ Year",
    positions: "2",
    link: "#",
    applyLink: "/apply/music-teacher",
  },
  {
    title: "Computer Science Teacher",
    experience: "2+ Years",
    positions: "2",
    link: "#",
    applyLink: "/apply/cs-teacher",
  },
];


  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container className="bg-gray-50 m-0 overflow-x-hidden" sx={{ py: 6, minWidth: "99vw" }}>
        <Container id={"formTitle"} maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box display="flex" flexDirection="row" justifyContent={"center"}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                letterSpacing: 1,
                mb: 1,
                display: "inline-block",
                pb: 0.5,
              }}
            >
              Don't be shy,&nbsp;
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                mb: 1,
                display: "inline-block",
                pb: 0.5,
                color: "orange",
              }}
            >
              tell us your truth.
            </Typography>
          </Box>

          <CareersForm positions={jobItems} />
        </Container>
        <Container>
          <Box display="flex" flexDirection="row" justifyContent={"center"}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                letterSpacing: 1,
                mb: 1,
                display: "inline-block",
                pb: 0.5,
              }}
            >
              Current&nbsp;
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: 1,
                mb: 1,
                display: "inline-block",
                pb: 0.5,
                color: "orange",
              }}
            >
              Job Openings&nbsp;
            </Typography>
            <Typography 
              variant="h4"
              sx={{
                fontWeight: 500,
                letterSpacing: 1,
                mb: 1,
                display: "inline-block",
                pb: 0.5,
              }}>
              - Join Our Team!
            </Typography>
          </Box>
          <Box className="max-w-5xl mx-auto">
            <HoverEffect items={jobItems} />
          </Box>
        </Container>
      </Container>
    </>
  );
}
