import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Users, Maximize2, BedDouble, Check, Bath, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { ROOMS, SITE } from "@/data/site";
import { waUrl, formatRoomBookingMessage } from "@/utils/whatsapp";

export default function RoomDetail() {
  const { slug } = useParams();
  const room = ROOMS.find((r) => r.slug === slug);
  const [active, setActive] = useState(0);

  if (!room) {
    return (
      <div className="notfound">
        <h1>404</h1>
        <p>Room not found.</p>
        <Link to="/rooms" className="btn btn-primary">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <div data-testid="room-detail-page">
      <PageHeader
        title={room.name}
        crumbs={[{ label: "Rooms", to: "/rooms" }, { label: room.name }]}
        image={room.gallery[0]}
      />
      <section className="section">
        <div className="container room-detail-grid">
          <div>
            <div className="gallery-main">
              <img src={room.gallery[active]} alt={room.name} />
              <div className="thumbs">
                {room.gallery.map((g, i) => (
                  <img
                    key={i}
                    src={g}
                    alt=""
                    className={i === active ? "active" : ""}
                    onClick={() => setActive(i)}
                    data-testid={`thumb-${i}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h2>About this room</h2>
              <img className="divider" src={SITE.divider} alt="" style={{ width: 100, marginBottom: 16 }} />
              <p style={{ color: "var(--color-text-muted)" }}>{room.description}</p>
              <h3 className="mt-8">Features</h3>
              <div className="feature-pills">
                {room.features.map((f, i) => (
                  <span key={i}><Check size={14} className="icon" /> {f}</span>
                ))}
              </div>
            </div>
          </div>

          <aside className="room-sidebar">
            <div className="from">Starting from</div>
            <div className="price">Rs {room.priceFrom.toLocaleString()} <span style={{ fontSize: 14, color: "var(--color-text-muted)" }}>/ night</span></div>
            <hr />
            <div className="row" style={{ color: "var(--color-text-muted)", fontSize: 14 }}>
              <span><BedDouble size={14} /> {room.beds} beds</span>
              <span><Bath size={14} /> {room.bathrooms} bath</span>
              <span><Maximize2 size={14} /> {room.sizeSqft} ft²</span>
              <span><Users size={14} /> {room.maxAdults} adults</span>
            </div>
            <hr />
            <p style={{ color: "var(--color-text-muted)", fontSize: 14 }}>Book directly via WhatsApp for the fastest response and any special requests.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={waUrl(formatRoomBookingMessage(room))}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                data-testid="detail-book-btn"
              >
                <MessageCircle size={16} /> Book this Room
              </a>
              <Link to="/contact" className="btn btn-ghost">Contact Us</Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
