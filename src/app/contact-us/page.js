"use client";

import Banner from "@/components/Banner";
import ContactUsContainer from "@/components/contactUs/ContactUsContainer";
import Map from "@/components/Map";
import { ContactUsForm } from "@/components/ui/contact-us-form";
import { BANNER_DATA } from "@/lib/data";
import { Box, Typography, Container } from "@mui/material";



export default function ContactUsPage() {
  const bannerData = BANNER_DATA["contact-us"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />

      <ContactUsContainer />
    </>
  );
}