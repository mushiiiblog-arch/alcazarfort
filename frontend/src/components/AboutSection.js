import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "@/data/site";

export default function AboutSection() {
  return (
    <section className="section" data-testid="about-section">
      <div className="container about-grid">
        <div className="about-images">
          <img
            className="frame img-1"
            src="https://alcazarfort.pk/wp-content/uploads/2018/12/best-hotel-in-naran-kaghan-room-in-naranWhatsApp-Image-2022-05-22-at-11.40.39-PM.jpeg"
            alt="Al-Cazar Fort exterior"
          />
          <img
            className="frame img-2"
            src="https://alcazarfort.pk/wp-content/uploads/2015/02/WhatsApp-Image-2022-05-25-at-9.01.20-PM.jpeg"
            alt="Hotel grounds"
          />
        </div>
        <div className="about-content">
          <div className="eyebrow">Welcome</div>
          <h2>About Al-Cazar Fort</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
          <p><strong>Al-Cazar Fort</strong> is a luxury international resort nestled on a hillside, overlooking majestic panoramic views of the beautiful Naran Valley below.</p>
          <p>A fabulous secure retreat by the riverside amongst lush trees and mountain views — the perfect location to enjoy and relax. The decor is fresh and modern with comfortable furnishings.</p>
          <p>Al-Cazar Fort is one of the best options for stay and cuisine in Naran. Our furnished rooms come with en-suite bathrooms and running hot water. With the peace and quiet you deserve, we make sure everything about your stay is luxurious and enjoyable.</p>
          <Link to="/about" className="btn btn-dark" data-testid="about-cta">Discover More</Link>
        </div>
      </div>
    </section>
  );
}
