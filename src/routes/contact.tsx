import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ADDRESS_LINES,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  buildWhatsAppUrl,
  composeMessage,
  openWhatsApp,
} from "@/lib/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact NEXUS | Corporate Transport in Nairobi" },
      {
        name: "description",
        content:
          "Contact NEXUS in Kilimani, Nairobi. Call, WhatsApp, or send an enquiry about corporate transport, airport transfers and full-day hire.",
      },
      { property: "og:title", content: "Contact NEXUS | Corporate Transport in Nairobi" },
      {
        property: "og:description",
        content: "Call, WhatsApp, or send an enquiry to the NEXUS team in Nairobi.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [feedback, setFeedback] = useState("");

  function sendToWhatsApp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "");

    openWhatsApp(
      composeMessage("Hello NEXUS, I’d like to get in touch.", [
        ["Name", field("name")],
        ["Phone", field("phone")],
        ["Email", field("email")],
        ["Message", field("message")],
      ]),
    );
    setFeedback("WhatsApp is opening with your message. Press send there to reach the NEXUS team.");
  }

  return (
    <main>
      <SiteHeader />

      <section className="subpage-hero" aria-labelledby="contact-heading">
        <div className="site-container">
          <p className="eyebrow eyebrow-light">
            <span /> Contact us
          </p>
          <h1 id="contact-heading">
            Let’s <span>talk.</span>
          </h1>
          <p className="subpage-lead">
            Planning a journey, a fleet booking, or a partnership? Reach the NEXUS team by phone, on
            WhatsApp, or with the form below.
          </p>
        </div>
      </section>

      <section className="booking-section page-section">
        <div className="site-container booking-layout">
          <div className="booking-copy">
            <h2>
              Get in
              <br />
              <span>touch.</span>
            </h2>
            <ul className="contact-list">
              <li>
                <MapPin aria-hidden="true" />
                <div>
                  <p className="contact-label">Address</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                    {ADDRESS_LINES[0]}
                    <br />
                    {ADDRESS_LINES[1]}
                  </a>
                </div>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <div>
                  <p className="contact-label">Phone</p>
                  <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                </div>
              </li>
            </ul>
            <Button asChild className="button-primary" size="lg">
              <a
                href={buildWhatsAppUrl("Hello NEXUS, I’d like to make an enquiry.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle aria-hidden="true" /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          <form className="booking-form" onSubmit={sendToWhatsApp}>
            <div className="form-heading">
              <span>CONTACT</span>
              <span>Send us a message</span>
            </div>
            <label htmlFor="contact-name">Your name</label>
            <Input id="contact-name" name="name" autoComplete="name" placeholder="Name" required />
            <div className="form-two-column">
              <div className="form-field">
                <label htmlFor="contact-phone">Phone number</label>
                <Input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+254"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email (optional)</label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <label htmlFor="contact-message">How can we help?</label>
            <textarea
              id="contact-message"
              className="booking-textarea"
              name="message"
              rows={4}
              placeholder="Tell us about your journey or question"
              required
            />
            <Button className="form-submit" type="submit" size="lg">
              Send via WhatsApp <ArrowRight aria-hidden="true" />
            </Button>
            {feedback && (
              <p className="form-feedback" role="status">
                {feedback}
              </p>
            )}
            <p className="form-privacy">
              Sending opens WhatsApp with your message ready to send to NEXUS.
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
