import { Box, Typography, Container } from "@mui/material";
import Banner from "@/components/Banner";
import { BANNER_DATA, WHY_ZENITH_DATA } from "@/lib/data";

export default function WhyZenithSchoolPage() {
    const bannerData = BANNER_DATA["why-zenith-school"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            {/* Subheading Section */}
            <Container maxWidth="md">
                <Box textAlign="center" mt={6} mb={3}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            fontFamily: "serif",
                            color: "text.primary",
                        }}
                    >

                        {WHY_ZENITH_DATA?.title}
                    </Typography>
                </Box>

                {/* Paragraph Section */}
                <Box textAlign="center" mb={6}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        lineHeight={1.8}
                    >
                        {WHY_ZENITH_DATA?.description}
                    </Typography>
                </Box>

                {/* Horizontal School Image */}
                <Box display="flex" justifyContent="center" mb={6}>
                    <img
                        src={WHY_ZENITH_DATA?.image}
                        alt="Zenith School"
                        style={{
                            height: "400px",
                            // width: "100%",s
                            maxWidth: "900px",
                            borderRadius: "16px",
                            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",

                        }}
                    />
                </Box>
            </Container>
        </>
    );
}
