import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/data/site";

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), []);
  const prev = () => setIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="hero" data-testid="hero-slider">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-slide ${i === idx ? "active" : ""}`}
          style={{ backgroundImage: `url(${s.image})` }}
        >
          {i === idx && (
            <div className="hero-content">
              <div className="eyebrow">{s.eyebrow}</div>
              <h1>{s.title}</h1>
              <p>{s.subtitle}</p>
              <div className="hero-actions">
                <Link to="/booking" className="btn btn-primary" data-testid="hero-book-btn">Book Your Stay</Link>
                <Link to="/rooms" className="btn btn-outline">Explore Rooms</Link>
              </div>
            </div>
          )}
        </div>
      ))}

      <button className="hero-nav prev" onClick={prev} aria-label="Previous slide" data-testid="hero-prev">
        <ChevronLeft size={22} />
      </button>
      <button className="hero-nav next" onClick={next} aria-label="Next slide" data-testid="hero-next">
        <ChevronRight size={22} />
      </button>

      <div className="hero-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={i === idx ? "active" : ""}
            aria-label={`Go to slide ${i + 1}`}
            data-testid={`hero-dot-${i}`}
          />
        ))}
      </div>
    </section>
  );
}
