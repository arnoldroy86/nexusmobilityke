import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Plane, Route as RouteIcon, Clock3 } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/contact";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NEXUS | Corporate Transport in Kenya" },
      {
        name: "description",
        content:
          "NEXUS provides car rental and corporate transport solutions in Kenya: executive transport, airport transfers and full-day hire, based in Kilimani, Nairobi.",
      },
      { property: "og:title", content: "About NEXUS | Corporate Transport in Kenya" },
      {
        property: "og:description",
        content: "Car rental and corporate transport solutions in Kenya.",
      },
    ],
  }),
  component: AboutPage,
});

const offerings = [
  {
    icon: RouteIcon,
    title: "Corporate transport",
    description: "Considered journeys for meetings, teams, and the working day.",
  },
  {
    icon: Clock3,
    title: "Full-day hires",
    description: "A dedicated vehicle for schedules that have room to move.",
  },
  {
    icon: Plane,
    title: "Airport transfers",
    description: "A more considered connection to your next flight.",
  },
];

function AboutPage() {
  return (
    <main>
      <SiteHeader />

      <section className="subpage-hero" aria-labelledby="about-heading">
        <div className="site-container">
          <p className="eyebrow eyebrow-light">
            <span /> About us
          </p>
          <h1 id="about-heading">
            About <span>NEXUS.</span>
          </h1>
          <p className="subpage-lead">
            Car rental and corporate transport solutions in Kenya, built around making every journey
            effortless.
          </p>
        </div>
      </section>

      <section className="about-section page-section">
        <div className="site-container about-grid">
          <div>
            <p className="eyebrow">
              <span /> Who we are
            </p>
            <h2>
              Move with <span>purpose.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              NEXUS is a transport company based in Kilimani, Nairobi. We help businesses and
              individuals get where they need to be, with executive transport, airport connections,
              and the right vehicle for the day ahead.
            </p>
            <p>
              Our fleet ranges from executive sedans and SUVs to vans and coaster buses, so whether
              you are moving one person or a whole team, there is a vehicle that fits.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-section-alt page-section">
        <div className="site-container">
          <div className="about-heading">
            <p className="eyebrow">
              <span /> What we do
            </p>
            <h2>
              Journeys, <span>handled.</span>
            </h2>
          </div>
          <div className="about-cards">
            {offerings.map(({ icon: Icon, title, description }) => (
              <article className="about-card" key={title}>
                <Icon aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section page-section">
        <div className="site-container about-grid">
          <div>
            <p className="eyebrow">
              <span /> Grow with NEXUS
            </p>
            <h2>
              Partner with us
              <br />
              <span>and earn.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Have a vehicle to put to work? Share its details and our team will get in touch about
              joining the NEXUS fleet.
            </p>
            <div className="about-actions">
              <Button asChild className="button-primary" size="lg">
                <Link to="/" hash="partners">
                  Become a partner <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
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
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
