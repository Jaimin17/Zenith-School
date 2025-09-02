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
} from "@mui/material";
import { AdmissionAccordion } from "@/components/ui/admission/Accordion";

export default function admissionPage() {
  const bannerData = BANNER_DATA["admission"];

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
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
          <Box
            display={"flex"}
            flexDirection={{ xs: "column", md: "row" }}
            alignItems={"flex-start"}
            gap={6}
          >
            <Box
              sx={{
                flex: 1,
                maxWidth: { xs: "100%", md: "500px" },
                width: "100%",
              }}
            >
              <CardMedia
                component={"img"}
                image={dummyData.image}
                alt="Admission"
                sx={{
                  width: "100%",
                  height: { xs: 250, sm: 350, md: 450 },
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: 4,
                }}
              />
            </Box>

            <Box flex={1}>
              {/* Eligibility Heading */}
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 800,
                  letterSpacing: 1,
                  mb: 1,
                  textTransform: "uppercase",
                }}
              >
                Eligibility
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                For Nursery, the child has to complete three years of age, and
                for Kindergarten, the child has to complete four years of age by
                31st May of the Academic session for which the parent is seeking
                admission.
              </Typography>

              {/* Admission Process Heading */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    color: "orange",
                    fontWeight: 800,
                    letterSpacing: 1,
                    mb: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Admission Process{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "text.primary",
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: "none",
                    }}
                  >
                    for the upcoming academic session:
                  </Box>
                </Typography>
              </Box>

              {/* Admission Process List */}
              <List sx={{ pl: 2 }}>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  <ListItemText
                    primary={
                      <>
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Nursery & K.G.
                        </Box>
                        {" – Admissions in the month of November."}
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  <ListItemText
                    primary={
                      <>
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Class I
                        </Box>
                        {" – Admissions in the month of January."}
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  <ListItemText
                    primary={
                      <>
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Class II to IX
                        </Box>
                        {
                          " – Admissions in the month of March. (Subject to vacancy)"
                        }
                      </>
                    }
                  />
                </ListItem>
                <ListItem sx={{ display: "list-item", pl: 0 }}>
                  <ListItemText
                    primary={
                      <>
                        <Box component="span" sx={{ fontWeight: 600 }}>
                          Class XI Science & General Stream
                        </Box>
                        {
                          " – After the declaration of Board Examinations results."
                        }
                      </>
                    }
                  />
                </ListItem>
              </List>
            </Box>
          </Box>
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
      </Container>
    </>
  );
}
