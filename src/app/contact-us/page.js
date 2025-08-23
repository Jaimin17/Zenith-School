import Banner from "@/components/Banner";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import { Box } from "@mui/material";
import { Container } from "@mui/material";

export default function contactUsPage() {

    const bannerData = BANNER_DATA["contact-us"];

    return (
        <>
            <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

            <Container sx={{ py: 6 }}>
                Contact Us
            </Container>
        </>
    );
}