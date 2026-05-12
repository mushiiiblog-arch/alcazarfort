import React, { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send, MessageCircle } from "lucide-react";
import axios from "axios";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { waUrl } from "@/utils/whatsapp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill name, email and message");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/contact`, form);
      toast.success("Thanks! We will get back to you shortly.");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappQuick = () => {
    const msg = [
      "Hello Al-Cazar Fort,",
      "",
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.subject && `Subject: ${form.subject}`,
      form.message && `\n${form.message}`,
    ].filter(Boolean).join("\n");
    window.open(waUrl(msg || "Hello Al-Cazar Fort, I would like to get in touch."), "_blank", "noopener,noreferrer");
  };

  return (
    <div data-testid="contact-page">
      <PageHeader title="Get in Touch" crumbs={[{ label: "Contact" }]} />

      <section className="section">
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="icon-circle"><MapPin size={26} /></div>
              <h3>Visit Us</h3>
              <p><a href={SITE.mapsLink} target="_blank" rel="noreferrer">{SITE.address}</a></p>
            </div>
            <div className="contact-card">
              <div className="icon-circle"><Phone size={26} /></div>
              <h3>Call Us</h3>
              {SITE.phones.map((p) => <p key={p}><a href={`tel:${p}`}>{p}</a></p>)}
              <p><a href={waUrl("Hello Al-Cazar Fort")} target="_blank" rel="noreferrer" style={{ color: "#25d366" }}><MessageCircle size={14} style={{ verticalAlign: "-2px" }} /> WhatsApp Us</a></p>
            </div>
            <div className="contact-card">
              <div className="icon-circle"><Mail size={26} /></div>
              <h3>Email Us</h3>
              <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p><a href={`mailto:${SITE.reservationEmail}`}>{SITE.reservationEmail}</a></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="section-head">
            <div className="eyebrow">Drop A Line</div>
            <h2>Send Us a Message</h2>
            <img className="divider" src={SITE.divider} alt="" />
          </div>
          <form onSubmit={submit} data-testid="contact-form">
            <div className="form-grid">
              <div className="form-control">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={onChange} required data-testid="contact-name" />
              </div>
              <div className="form-control">
                <label>Email *</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required data-testid="contact-email" />
              </div>
              <div className="form-control">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} data-testid="contact-phone" />
              </div>
              <div className="form-control">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={onChange} data-testid="contact-subject" />
              </div>
              <div className="form-control full">
                <label>Message *</label>
                <textarea name="message" value={form.message} onChange={onChange} required data-testid="contact-message" />
              </div>
              <div className="full" style={{ textAlign: "center", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button type="submit" className="btn btn-primary" disabled={loading} data-testid="contact-submit">
                  {loading ? "Sending..." : (<><Send size={16} /> Send Message</>)}
                </button>
                <button type="button" onClick={whatsappQuick} className="btn btn-dark" data-testid="contact-whatsapp">
                  <MessageCircle size={16} /> Send via WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section style={{ height: 450 }}>
        <iframe
          title="Al-Cazar Fort - Hotel & Restaurant Location"
          src={SITE.mapsEmbed}
          style={{ border: 0, width: "100%", height: "100%" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </div>
  );
}
