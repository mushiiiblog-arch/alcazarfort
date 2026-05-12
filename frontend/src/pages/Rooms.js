import React from "react";
import PageHeader from "@/components/PageHeader";
import RoomsSection from "@/components/RoomsSection";
import BookingWidget from "@/components/BookingWidget";

export default function Rooms() {
  return (
    <div data-testid="rooms-page">
      <PageHeader title="Rooms & Suites" crumbs={[{ label: "Rooms" }]} />
      <div className="container" style={{ paddingTop: 40 }}>
        <BookingWidget />
      </div>
      <RoomsSection heading={false} />
    </div>
  );
}
