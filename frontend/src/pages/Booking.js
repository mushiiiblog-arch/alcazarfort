import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Calendar, Users, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { ROOMS, SITE } from "@/data/site";
import { waUrl, formatBookingMessage } from "@/utils/whatsapp";

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export default function Booking() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    check_in: params.get("check_in") || today(0),
    check_out: params.get("check_out") || today(1),
    adults: parseInt(params.get("adults") || "1"),
    children: parseInt(params.get("children") || "0"),
    rooms: parseInt(params.get("rooms") || "1"),
    room_type: params.get("room_type") || "",
    message: "",
  });

  useEffect(() => {
    const rt = params.get("room_type");
    if (rt) setForm((f) => ({ ...f, room_type: rt }));
  }, [params]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Please enter your name");
      return;
    }
    const msg = formatBookingMessage(form);
    window.open(waUrl(msg), "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your booking details...");
  };

  return (
    <div data-testid="booking-page">
      <PageHeader title="Book Your Stay" crumbs={[{ label: "Booking" }]} />
      <section className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <div className="section-head">
            <div className="eyebrow">Reservation</div>
            <h2>Reserve Your Room via WhatsApp</h2>
            <img className="divider" src={SITE.divider} alt="" />
            <p>Fill in the details below and we will open WhatsApp with your enquiry pre-filled. Our reservations team typically replies within minutes.</p>
          </div>

          <form onSubmit={submit} data-testid="booking-form">
            <div className="form-grid">
              <div className="form-control">
                <label>Full Name *</label>
                <input name="name" value={form.name} onChange={onChange} required data-testid="book-name" />
              </div>
              <div className="form-control">
                <label>Email</label>
                <input type="email" name="email" value={form.email} onChange={onChange} data-testid="book-email" />
              </div>
              <div className="form-control">
                <label>Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} data-testid="book-phone" />
              </div>
              <div className="form-control">
                <label>Room Type</label>
                <select name="room_type" value={form.room_type} onChange={onChange} data-testid="book-room-type">
                  <option value="">Any room</option>
                  {ROOMS.map((r) => <option key={r.slug} value={r.name}>{r.name}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label><Calendar size={12} /> Check In *</label>
                <input type="date" name="check_in" value={form.check_in} onChange={onChange} required data-testid="book-checkin" />
              </div>
              <div className="form-control">
                <label><Calendar size={12} /> Check Out *</label>
                <input type="date" name="check_out" value={form.check_out} onChange={onChange} required data-testid="book-checkout" />
              </div>
              <div className="form-control">
                <label><Users size={12} /> Rooms</label>
                <select name="rooms" value={form.rooms} onChange={onChange} data-testid="book-rooms">
                  {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label><Users size={12} /> Adults</label>
                <select name="adults" value={form.adults} onChange={onChange} data-testid="book-adults">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-control">
                <label><Users size={12} /> Children</label>
                <select name="children" value={form.children} onChange={onChange} data-testid="book-children">
                  {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="form-control full">
                <label>Special Requests</label>
                <textarea name="message" value={form.message} onChange={onChange} placeholder="Tell us about any special requirements..." data-testid="book-message" />
              </div>
              <div className="full" style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-primary" data-testid="book-submit">
                  <MessageCircle size={16} /> Send Booking on WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
