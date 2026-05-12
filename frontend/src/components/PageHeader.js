import React from "react";
import { Link } from "react-router-dom";

export default function PageHeader({ title, crumbs = [], image }) {
  const bg = image || "https://alcazarfort.pk/wp-content/uploads/2018/12/Hotel-in-naran-best-hotel-price-of-roomsWhatsApp-Image-2022-06-05-at-7.54.29-PM.jpeg";
  return (
    <section className="page-header" style={{ backgroundImage: `url(${bg})` }} data-testid="page-header">
      <div className="container">
        <h1>{title}</h1>
        <div className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span style={{ margin: "0 8px" }}>/</span>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
