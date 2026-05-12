import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { waUrl } from "@/utils/whatsapp";

const MSG = "Hello Al-Cazar Fort, I would like to make a reservation. Please share availability and pricing.";

export default function WhyChooseUs() {
  return (
    <section className="section" data-testid="why-us-section">
      <div className="container why-grid">
        <div className="text">
          <div className="eyebrow">Our Promise</div>
          <h2>Why Choose Us</h2>
          <img className="divider" src={SITE.divider} alt="" aria-hidden="true" style={{ width: 100 }} />
          <p><em>A peaceful stay with hills and river — in the midst of Naran but away from traffic and noise. Al-Cazar Fort is the perfect peaceful solution.</em></p>
          <p>We offer all the comforts and amenities you could want during your stay, including 24-hour room service, hot water facilities, laundry/valet service and an outdoor pool. Our management team works around the clock to ensure every guest is well looked after.</p>
          <p>Each room has been carefully appointed with quality furnishings and decor; choose between standard rooms with beautiful chandeliers, deluxe rooms with marble floors, or executive suites with hot water tubs.</p>
          <a href={waUrl(MSG)} target="_blank" rel="noreferrer" className="btn btn-primary">
            <MessageCircle size={16} /> Make a Reservation
          </a>
        </div>
        <img src="https://alcazarfort.pk/wp-content/uploads/2018/12/Hotel-in-naran-best-hotel-price-of-roomsWhatsApp-Image-2022-06-05-at-7.54.30-PM-2.jpeg" alt="Al-Cazar Fort" />
      </div>
    </section>
  );
}
