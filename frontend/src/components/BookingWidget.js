import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Search } from "lucide-react";

function today(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split("T")[0];
}

export default function BookingWidget() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    check_in: today(0),
    check_out: today(1),
    rooms: 1,
    adults: 1,
    children: 0,
  });
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    navigate(`/booking?${params}`);
  };

  return (
    <form className="booking-widget container" onSubmit={submit} data-testid="booking-widget">
      <div className="field">
        <label><Calendar size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />Check In</label>
        <input type="date" name="check_in" value={form.check_in} onChange={onChange} data-testid="bw-checkin" />
      </div>
      <div className="field">
        <label><Calendar size={12} style={{ verticalAlign: "-2px", marginRight: 4 }} />Check Out</label>
        <input type="date" name="check_out" value={form.check_out} onChange={onChange} data-testid="bw-checkout" />
      </div>
      <div className="field">
        <label>Rooms</label>
        <select name="rooms" value={form.rooms} onChange={onChange} data-testid="bw-rooms">
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Adults</label>
        <select name="adults" value={form.adults} onChange={onChange} data-testid="bw-adults">
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="field">
        <label>Children</label>
        <select name="children" value={form.children} onChange={onChange} data-testid="bw-children">
          {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
      <div className="field btn-wrap">
        <button type="submit" className="btn btn-primary" data-testid="bw-submit">
          <Search size={16} /> Check Availability
        </button>
      </div>
    </form>
  );
}
