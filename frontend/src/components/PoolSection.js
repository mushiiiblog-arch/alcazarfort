import React from "react";
import { SITE, FEATURE_GROUPS } from "@/data/site";

export default function PoolSection() {
  return (
    <section className="section cream" data-testid="feature-groups-section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">More From Al-Cazar Fort</div>
          <h2>Our Other Features</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" />
        </div>
        <div className="feature-groups">
          {FEATURE_GROUPS.map((g, i) => (
            <div key={i} className="feature-group">
              <h3>{g.title}</h3>
              <ul>{g.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
