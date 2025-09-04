"use client";

import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import { Box, Typography, Container } from "@mui/material";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("@/components/Map"), {
ssr: true,
});


export const ContactUsContainer = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="flex-start" // better alignment for different content heights
                flexWrap="wrap"
                gap={12}
                sx={{
                    minHeight: '500px',
                }}
            >
                {/* Left Side - Form */}
                <Box
                    flex={1}
                    display="flex"
                    justifyContent="center"
                    sx={{
                        minWidth: { xs: '100%', md: '500px' }, // responsive min width
                        maxWidth: '650px',

                    }}
                >
                    <ContactUsForm />
                </Box>

                {/* Right Side - Map + Info */}
                <Box
                    sx={{
                        minWidth: { xs: '100%', md: '400px' },
                        maxWidth: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    {/* Map */}
                    <Box sx={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        height: '300px' // fixed height for map
                    }}>
                        <Map center={[28.6139, 77.209]} zoom={13} />
                    </Box>

                    {/* Contact Info */}
                    <Box sx={{ p: 2 }}>
                        <Typography variant="h6" fontWeight="bold" mb={1}>
                            Visit Our School
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" mt={2}>
                            Address:
                        </Typography>
                        <Typography variant="body2" mb={2} color="text.secondary">
                            Dabhoi Road, Pratapnagar – Makarpura Road, <br />
                            Vadodara, Gujarat 390004
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold">
                            Hours:
                        </Typography>
                        <Typography variant="body2" mb={3} color="text.secondary">
                            07:00 am – 06:00 pm
                        </Typography>

                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Phone:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    9825220510
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Email:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    zenithschool.brd@gmail.com
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default ContactUsContainer;