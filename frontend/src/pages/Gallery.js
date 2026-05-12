import React from "react";
import PageHeader from "@/components/PageHeader";
import GallerySection from "@/components/GallerySection";

export default function Gallery() {
  return (
    <div data-testid="gallery-page">
      <PageHeader title="Photo Gallery" crumbs={[{ label: "Gallery" }]} />
      <GallerySection />
    </div>
  );
}
