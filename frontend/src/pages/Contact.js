import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { SITE } from "@/data/site";

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

  return (
    <div data-testid="contact-page">
      <PageHeader title="Get in Touch" crumbs={[{ label: "Contact" }]} />

      <section className="section">
        <div className="container">
          <div className="contact-cards">
            <div className="contact-card">
              <div className="icon-circle"><MapPin size={26} /></div>
              <h3>Visit Us</h3>
              <p>{SITE.address}</p>
              <p>{SITE.officeAddress}</p>
            </div>
            <div className="contact-card">
              <div className="icon-circle"><Phone size={26} /></div>
              <h3>Call Us</h3>
              {SITE.phones.map((p) => <p key={p}><a href={`tel:${p}`}>{p}</a></p>)}
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
              <div className="full" style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary" disabled={loading} data-testid="contact-submit">
                  {loading ? "Sending..." : (<><Send size={16} /> Send Message</>)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section style={{ height: 380 }}>
        <iframe
          title="Al-Cazar Fort location"
          src="https://maps.google.com/maps?q=Naran%20Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed"
          style={{ border: 0, width: "100%", height: "100%" }}
          loading="lazy"
          allowFullScreen
        />
      </section>
    </div>
  );
}
