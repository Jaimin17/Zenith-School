import Banner from "@/components/Banner";
import Map from "@/components/Map";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import { Box, Typography, Container } from "@mui/material";

export default function ContactUsPage() {
  const bannerData = BANNER_DATA["contact-us"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <Container sx={{ py: 6 }}>
        <Box
          display="flex"
          justifyContent="center" // ✅ centers whole section horizontally
          alignItems="center" // keeps top aligned
          flexWrap="wrap"
          gap={6}
        >
          {/* Left Side - Form */}
          <Box
            flex={1}
            display="flex"
            justifyContent="center" // ✅ centers form inside its box
            minWidth="600px"
          >
            <ContactUsForm />
          </Box>

          {/* Right Side - Map + Info */}
          <Box
            minWidth="400px"
            display={"flex"}
            flexDirection="column"
            gap={3}
            justifyContent={"right"}
            paddingLeft={10}
          >
            {/* Map */}
            <Box sx={{ mb: 3 }}>
              <Map center={[28.6139, 77.209]} zoom={13} />
            </Box>

            {/* Contact Info */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Address:
              </Typography>
              <Typography variant="body2" mb={2}>
                Dabhoi Road, Pratapnagar – Makarpura Road, <br />
                Vadodara, Gujarat 390004
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold">
                Hours:
              </Typography>
              <Typography variant="body2" mb={2}>
                07:00 am – 06:00 pm
              </Typography>
              <Box display={"flex"} flexDirection={"row"} gap={6}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Phone:
                  </Typography>
                  <Typography
                    variant="body2"
                  >
                    9825220510
                  </Typography>
                </Box>
                <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  Email:
                </Typography>
                <Typography
                  variant="body2"
                >
                  zenithschool.brd@gmail.com
                </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
