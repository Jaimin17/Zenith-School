import Banner from "@/components/Banner";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import { Box, CardMedia, Container, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function admissionPage() {
  const bannerData = BANNER_DATA["admission"];

  const dummyData = {
    image:
      "https://images.unsplash.com/photo-1754506824681-4dd2a5fe7f6b?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

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
                  boxShadow: 3,
                }}
              />
            </Box>

            <Box flex={1}>
              {/* Eligibility Heading */}
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  letterSpacing: 1,
                  mb: 1,
                }}
              >
                Eligibility
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                For Nursery, the child has to complete three years of age, and
                for Kindergarten, the child has to complete four years of age by
                31st May of the Academic session for which the parent is seeking
                admission.
              </Typography>

              {/* Admission Process Heading */}
              <Typography
                variant="h5"
                sx={{
                  color: "text.primary",
                  fontWeight: 700,
                  letterSpacing: 1,
                  mb: 2,
                }}
              >
                Admission process for the upcoming academic session:
              </Typography>

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
        <Container>
          <ContactUsForm />
        </Container>
      </Container>
    </>
  );
}
