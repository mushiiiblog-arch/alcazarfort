import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS, SITE } from "@/data/site";

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const t = TESTIMONIALS[idx];
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  return (
    <section className="section cream" data-testid="testimonials-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What Guests Say</div>
          <h2>Testimonials</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
        </div>
        <div className="testimonials">
          <div className="testimonial">
            <img src={t.avatar} alt={t.name} className="avatar" />
            <p className="text">“{t.text}”</p>
            <div className="name">{t.name} <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({t.location})</span></div>
            <div className="date">{t.date}</div>
          </div>
          <div className="testimonial-nav">
            <button onClick={prev} aria-label="Previous" data-testid="t-prev"><ChevronLeft size={18} /></button>
            <button onClick={next} aria-label="Next" data-testid="t-next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
