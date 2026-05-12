import React, { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import RoomsSection from "@/components/RoomsSection";
import BookingWidget from "@/components/BookingWidget";
import { ROOMS, ROOM_CATEGORIES, SITE } from "@/data/site";

export default function Rooms() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? ROOMS : ROOMS.filter((r) => r.category === active)),
    [active]
  );

  return (
    <div data-testid="rooms-page">
      <PageHeader title="Our Rooms" crumbs={[{ label: "Rooms" }]} />
      <div className="container" style={{ paddingTop: 40 }}>
        <BookingWidget />
      </div>

      <section className="section tight">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Stay With Us</div>
            <h2>Rooms & Suites</h2>
            <img className="divider" src={SITE.divider} alt="" />
            <p>From cosy standard rooms to spacious family suites with lake views — every option is finished to the highest standard.</p>
          </div>

          <div
            className="rooms-filter-bar"
            data-testid="rooms-filter"
          >
            {ROOM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`btn ${active === cat ? "btn-dark" : "btn-ghost"}`}
                data-testid={`filter-${cat.toLowerCase().replace(/ /g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <RoomsSection heading={false} rooms={filtered} />
    </div>
  );
}
