import React from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://api.whatsapp.com/send?phone=${SITE.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="wa-fab"
      data-testid="whatsapp-fab"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
