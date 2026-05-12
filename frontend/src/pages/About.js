import React from "react";
import PageHeader from "@/components/PageHeader";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function About() {
  return (
    <div data-testid="about-page">
      <PageHeader title="About Us" crumbs={[{ label: "About" }]} />
      <AboutSection />
      <FacilitiesSection />
      <AmenitiesSection />
      <WhyChooseUs />
    </div>
  );
}
