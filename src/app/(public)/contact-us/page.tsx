"use client";

import Banner from "@/components/Banner";
import ContactUsContainer from "@/components/ContactUs/ContactUsContainer";
import { BANNER_DATA } from "@/lib/data";

export default function ContactUsPage(): JSX.Element {
  const bannerData = BANNER_DATA["contact-us"];

  return (
    <>
      <Banner title={bannerData.title} backgroundImage={bannerData.imageUrl} />
      <ContactUsContainer />
    </>
  );
}