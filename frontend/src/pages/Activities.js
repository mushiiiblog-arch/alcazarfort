import React from "react";
import { Link } from "react-router-dom";
import { Mountain, Bike, Sparkles, Users, Camera, Music } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data/site";

const ACTIVITIES = [
  { icon: Mountain, title: "Mountain Hiking", text: "Guided hikes through the breathtaking mountains and valleys of Naran and Kaghan." },
  { icon: Bike, title: "Jeep Rides", text: "Adventure-packed jeep safaris to Saif-ul-Malook, Lulusar and beyond." },
  { icon: Sparkles, title: "Paragliding", text: "Soar high above the valley with experienced paragliding instructors." },
  { icon: Users, title: "Indoor Games", text: "Snooker, pool, table tennis and family games available on-site." },
  { icon: Camera, title: "Photography Tours", text: "Capture sunrise and sunset moments at the valley’s most scenic spots." },
  { icon: Music, title: "Cultural Events", text: "Enjoy traditional music nights and local cultural performances." }
];

export default function Activities() {
  return (
    <div data-testid="activities-page">
      <PageHeader title="Activities & Events" crumbs={[{ label: "Activities" }]} image="https://alcazarfort.pk/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-12-at-9.48.00-PM-2.jpeg" />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Adventures Await</div>
            <h2>Things To Do</h2>
            <img className="divider" src={SITE.divider} alt="" />
            <p>Discover all the activities and events on offer to make your stay at Al-Cazar Fort truly memorable.</p>
          </div>

          <div className="facilities">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="facility-card">
                <div style={{ padding: 40, textAlign: "center", background: "var(--color-cream)" }}>
                  <a.icon size={44} style={{ color: "var(--color-accent-dark)" }} />
                </div>
                <div className="body">
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/contact" className="btn btn-primary">Plan Your Adventure</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
