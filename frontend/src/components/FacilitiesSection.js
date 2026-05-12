import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FACILITIES, SITE } from "@/data/site";

export default function FacilitiesSection() {
  return (
    <section className="section cream" data-testid="facilities-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What We Offer</div>
          <h2>Our Hotel Facilities</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
          <p>From luxurious accommodation and authentic cuisine to outdoor adventures and cultural experiences — every facility at Al-Cazar Fort is designed for your enjoyment.</p>
        </div>
        <div className="facilities">
          {FACILITIES.map((f, i) => (
            <div key={i} className="facility-card">
              <div className="img-wrap">
                <img src={f.image} alt={f.title} loading="lazy" />
              </div>
              <div className="body">
                <div className="eyebrow">{f.eyebrow}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
                <Link to="/about" className="link">Learn More <ArrowRight size={14} style={{ verticalAlign: "-2px" }} /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
