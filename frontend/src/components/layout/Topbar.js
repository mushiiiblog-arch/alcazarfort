import React from "react";
import { Mail, MapPin, Phone, Facebook, Instagram } from "lucide-react";
import { SITE } from "@/data/site";

export default function Topbar() {
  return (
    <div className="topbar" data-testid="topbar">
      <div className="container">
        <div className="left">
          <span><Mail size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></span>
          <span className="hide-sm"><MapPin size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} /> {SITE.officeAddress}</span>
        </div>
        <div className="right">
          {SITE.phones.map((p) => (
            <a key={p} href={`tel:${p}`}><Phone size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />{p}</a>
          ))}
          <a href={SITE.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={14} /></a>
          <a href={SITE.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={14} /></a>
        </div>
      </div>
    </div>
  );
}
