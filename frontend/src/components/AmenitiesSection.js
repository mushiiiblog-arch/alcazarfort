import React, { useState } from "react";
import { Check } from "lucide-react";
import { AMENITIES, SITE } from "@/data/site";

export default function AmenitiesSection() {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? AMENITIES : AMENITIES.slice(0, 16);
  return (
    <section className="section cream-2" data-testid="amenities-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">In-House Comforts</div>
          <h2>Features & Amenities</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
          <p>Every detail of your stay is carefully considered — from 24-hour security and room service to spa treatments and concierge support.</p>
        </div>
        <div className="amenities">
          {list.map((a, i) => (
            <div key={i} className="amenity">
              <Check size={16} className="icon" /> <span>{a}</span>
            </div>
          ))}
        </div>
        {AMENITIES.length > 16 && (
          <div className="text-center mt-8">
            <button className="btn btn-ghost" onClick={() => setShowAll((v) => !v)} data-testid="amenities-toggle">
              {showAll ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
