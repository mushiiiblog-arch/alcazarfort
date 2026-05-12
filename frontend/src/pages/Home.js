import React from "react";
import HeroSlider from "@/components/HeroSlider";
import BookingWidget from "@/components/BookingWidget";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import PoolSection from "@/components/PoolSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div data-testid="home-page">
      <HeroSlider />
      <BookingWidget />
      <AboutSection />
      <FacilitiesSection />
      <RoomsSection />
      <AmenitiesSection />
      <PoolSection />
      <GallerySection limit={12} />
      <TestimonialsSection />
      <WhyChooseUs />
    </div>
  );
}
