import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { waUrl } from "@/utils/whatsapp";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/rooms", label: "Rooms" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/activities", label: "Activities" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const BOOK_MSG = "Hello Al-Cazar Fort, I would like to book a room. Please share availability and details.";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar" data-testid="navbar">
      <div className="container">
        <Link to="/" className="nav-logo" data-testid="nav-logo">
          <img src={SITE.logo} alt="Al-Cazar Fort logo" />
          <div>
            <div className="brand-name">{SITE.name}</div>
            <div className="brand-sub">{SITE.tagline}</div>
          </div>
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} data-testid={`nav-link-${l.label.toLowerCase()}`}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-cta">
          <a
            href={waUrl(BOOK_MSG)}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary show-mobile"
            data-testid="book-now-btn"
          >
            <MessageCircle size={16} /> Book Now
          </a>
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" data-testid="nav-toggle">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="mobile-menu" data-testid="mobile-menu">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <a
              href={waUrl(BOOK_MSG)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              <MessageCircle size={16} /> Book Now
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
