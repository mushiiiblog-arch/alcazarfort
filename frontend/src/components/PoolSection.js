import React from "react";
import { MessageCircle } from "lucide-react";
import { ACCENT, SITE, FEATURE_GROUPS } from "@/data/site";
import { waUrl } from "@/utils/whatsapp";

const MSG = "Hello Al-Cazar Fort, I would like to reserve a stay. Please share availability and details.";

export default function PoolSection() {
  return (
    <>
      <section className="section pool-section" data-testid="pool-section">
        <div className="container grid">
          <img className="main" src={ACCENT.poolImage} alt="Hot water pool at Al-Cazar Fort" loading="lazy" />
          <div className="text">
            <div className="eyebrow">Pool & Relaxation</div>
            <h2>First-Time Hot Water Pool in Naran</h2>
            <img className="divider" src={SITE.divider} alt="" aria-hidden="true" style={{ width: 100 }} />
            <p><strong>Al-Cazar Fort</strong> proudly introduces the first hot-water pool in Naran for its customers. Set in a beautiful garden, our large pool can be used for vigorous laps or simply for relaxing with a swim under the trees.</p>
            <p>Lounge in the shade or bask in the sun — either way, our peaceful Jheel Road location guarantees a refreshing escape from the heat.</p>
            <a href={waUrl(MSG)} target="_blank" rel="noreferrer" className="btn btn-dark">
              <MessageCircle size={16} /> Reserve Your Stay
            </a>
          </div>
        </div>
      </section>

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
    </>
  );
}
