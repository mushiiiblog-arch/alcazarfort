import React from "react";
import { MessageCircle } from "lucide-react";
import { Utensils, Coffee, Sun, Wine } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { waUrl } from "@/utils/whatsapp";

const MSG = "Hello Al-Cazar Fort, I would like to reserve a table at your restaurant. Please share availability.";

export default function Restaurant() {
  return (
    <div data-testid="restaurant-page">
      <PageHeader title="Restaurant" crumbs={[{ label: "Restaurant" }]} image="https://alcazarfort.pk/wp-content/uploads/2022/03/Community-Culture.jpg" />

      <section className="section">
        <div className="container about-grid">
          <div className="about-images">
            <img className="frame img-1" src="https://alcazarfort.pk/wp-content/uploads/2022/03/Community-Culture.jpg" alt="Restaurant interior" />
            <img className="frame img-2" src="https://alcazarfort.pk/wp-content/uploads/2018/12/WhatsApp-Image-2022-02-12-at-9.48.03-PM-5.jpeg" alt="Cuisine" />
          </div>
          <div className="about-content">
            <div className="eyebrow">Taste of Naran</div>
            <h2>A Culinary Journey</h2>
            <img className="divider" src={SITE.divider} alt="" />
            <p>Al-Cazar Fort offers a variety of delicious cuisines for our guests — catering for breakfast, lunch and evening meals. The grand terrace on the rooftop provides the perfect alfresco dining experience.</p>
            <p>Our restaurant offers <strong>Pakistani, Chinese and other Asian desi foods</strong>, prepared by experienced chefs using fresh, local ingredients sourced from the valley.</p>
            <a href={waUrl(MSG)} target="_blank" rel="noreferrer" className="btn btn-dark">
              <MessageCircle size={16} /> Reserve a Table
            </a>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Our Dining</div>
            <h2>What We Serve</h2>
            <img className="divider" src={SITE.divider} alt="" />
          </div>
          <div className="facilities">
            <div className="facility-card">
              <div style={{ padding: 30, textAlign: "center" }}><Utensils size={36} style={{ color: "var(--color-accent)" }} /></div>
              <div className="body"><h3>Pakistani Cuisine</h3><p>Authentic flavours from across the country — from rich karahi to spicy biryani.</p></div>
            </div>
            <div className="facility-card">
              <div style={{ padding: 30, textAlign: "center" }}><Coffee size={36} style={{ color: "var(--color-accent)" }} /></div>
              <div className="body"><h3>Coffee & Tea</h3><p>Hot beverages, milkshakes and specialty teas perfect for chilly mountain mornings.</p></div>
            </div>
            <div className="facility-card">
              <div style={{ padding: 30, textAlign: "center" }}><Sun size={36} style={{ color: "var(--color-accent)" }} /></div>
              <div className="body"><h3>Rooftop Dining</h3><p>Open-air alfresco dining with panoramic views of the Naran Valley.</p></div>
            </div>
            <div className="facility-card">
              <div style={{ padding: 30, textAlign: "center" }}><Wine size={36} style={{ color: "var(--color-accent)" }} /></div>
              <div className="body"><h3>Asian Specialties</h3><p>Chinese and pan-Asian dishes prepared fresh by our experienced chefs.</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
