import React from "react";
import { Link } from "react-router-dom";
import { Users, Maximize2, BedDouble, MessageCircle, Bath } from "lucide-react";
import { ROOMS, SITE } from "@/data/site";
import { waUrl, formatRoomBookingMessage } from "@/utils/whatsapp";

export default function RoomsSection({ heading = true, rooms }) {
  const data = rooms || ROOMS;
  return (
    <section className="section" data-testid="rooms-section">
      <div className="container">
        {heading && (
          <div className="section-head">
            <div className="eyebrow">Stay With Us</div>
            <h2>Our Rooms & Suites</h2>
            <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
            <p>Choose from our range of rooms and signature suites — each thoughtfully designed for relaxation and comfort.</p>
          </div>
        )}
        <div className="rooms">
          {data.map((r) => (
            <article key={r.slug} className="room-card" data-testid={`room-card-${r.slug}`}>
              <Link to={`/rooms/${r.slug}`} className="img-wrap">
                <img src={r.image} alt={r.name} loading="lazy" />
                <span className="price-tag">From Rs {r.priceFrom.toLocaleString()}</span>
              </Link>
              <div className="body">
                <h3>{r.name}</h3>
                <div className="meta">
                  <span><BedDouble size={14} /> {r.beds} beds</span>
                  <span><Bath size={14} /> {r.bathrooms} bath</span>
                  <span><Maximize2 size={14} /> {r.sizeSqft} ft²</span>
                </div>
                <p>{r.short}</p>
                <div className="actions">
                  <Link to={`/rooms/${r.slug}`} className="btn btn-ghost">View Details</Link>
                  <a
                    href={waUrl(formatRoomBookingMessage(r))}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    data-testid={`book-${r.slug}`}
                  >
                    <MessageCircle size={14} /> Book
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
