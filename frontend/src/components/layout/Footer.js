import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="brand">
            <img src={SITE.logoDark} alt="Al-Cazar Fort" />
            <div className="brand-name">{SITE.name}</div>
            <p>One of the best hotel & restaurants with high-class bedrooms and smart facilities, with sweeping views of hills and the river. Enjoy a peaceful experience away from noise and traffic.</p>
            <div className="social">
              <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
              <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            </div>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li><Link to="/restaurant">Restaurant</Link></li>
              <li><Link to="/activities">Activities</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4>Our Rooms</h4>
            <ul>
              <li><Link to="/rooms/premium-lake-view-room">Premium Lake View</Link></li>
              <li><Link to="/rooms/deluxe-rooms">Deluxe Rooms</Link></li>
              <li><Link to="/rooms/executive-room">Executive Room</Link></li>
              <li><Link to="/booking">Make a Reservation</Link></li>
            </ul>
          </div>

          <div>
            <h4>Get in Touch</h4>
            <div className="contact-row"><MapPin size={16} className="icon" /><span>{SITE.address}</span></div>
            <div className="contact-row"><Mail size={16} className="icon" /><a href={`mailto:${SITE.reservationEmail}`}>{SITE.reservationEmail}</a></div>
            {SITE.phones.map((p) => (
              <div key={p} className="contact-row"><Phone size={16} className="icon" /><a href={`tel:${p}`}>{p}</a></div>
            ))}
          </div>
        </div>

        <div className="copyright">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
