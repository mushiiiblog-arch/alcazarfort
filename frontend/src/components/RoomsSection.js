import React from "react";
import { Link } from "react-router-dom";
import { Users, Maximize2, BedDouble } from "lucide-react";
import { ROOMS, SITE } from "@/data/site";

export default function RoomsSection({ heading = true }) {
  return (
    <section className="section" data-testid="rooms-section">
      <div className="container">
        {heading && (
          <div className="section-head">
            <div className="eyebrow">Stay With Us</div>
            <h2>Our Rooms & Suites</h2>
            <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
            <p>Choose from premium lake view rooms, deluxe rooms with marble floors, or executive suites — each thoughtfully designed for relaxation and comfort.</p>
          </div>
        )}
        <div className="rooms">
          {ROOMS.map((r) => (
            <article key={r.slug} className="room-card" data-testid={`room-card-${r.slug}`}>
              <Link to={`/rooms/${r.slug}`} className="img-wrap">
                <img src={r.image} alt={r.name} loading="lazy" />
                <span className="price-tag">From Rs {r.priceFrom.toLocaleString()}</span>
              </Link>
              <div className="body">
                <h3>{r.name}</h3>
                <div className="meta">
                  <span><Users size={14} /> {r.maxAdults} adults</span>
                  <span><BedDouble size={14} /> 1 bed</span>
                  <span><Maximize2 size={14} /> {r.sizeSqm}m²</span>
                </div>
                <p>{r.short}</p>
                <div className="actions">
                  <Link to={`/rooms/${r.slug}`} className="btn btn-ghost">View Details</Link>
                  <Link to={`/booking?room_type=${r.slug}`} className="btn btn-primary">Book</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
