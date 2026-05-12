import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES, SITE } from "@/data/site";

export default function GallerySection({ limit }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const images = limit ? GALLERY_IMAGES.slice(0, limit) : GALLERY_IMAGES;

  const openAt = (i) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <section className="section" data-testid="gallery-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Our Moments</div>
          <h2>See Our Gallery</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
          <p>Take a visual tour through the rooms, restaurant, gardens and surroundings of Al-Cazar Fort.</p>
        </div>

        <div className="gallery-grid">
          {images.map((src, i) => (
            <button key={i} className="gallery-item" onClick={() => openAt(i)} aria-label={`Open image ${i + 1}`} data-testid={`gallery-item-${i}`}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>

        {open && (
          <div className="lightbox" onClick={close} data-testid="lightbox">
            <button className="close" onClick={close} aria-label="Close"><X size={22} /></button>
            <button className="nav prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous"><ChevronLeft size={26} /></button>
            <img src={images[idx]} alt="" onClick={(e) => e.stopPropagation()} />
            <button className="nav next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next"><ChevronRight size={26} /></button>
          </div>
        )}
      </div>
    </section>
  );
}
