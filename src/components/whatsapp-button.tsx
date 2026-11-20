import { MessageCircle } from "lucide-react";

import { buildWhatsAppUrl } from "@/lib/contact";

/** Floating WhatsApp button shown on every page. */
export function WhatsAppButton() {
  return (
    <a
      className="whatsapp-float"
      href={buildWhatsAppUrl("Hello NEXUS, I’d like to make an enquiry.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with NEXUS on WhatsApp"
    >
      <MessageCircle aria-hidden="true" />
      <span>WhatsApp us</span>
    </a>
  );
}
