import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Clock3,
  FileImage,
  MapPin,
  Menu,
  Plane,
  Route as RouteIcon,
  ShieldCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/logo.png.asset.json";
import heroImage from "@/assets/nexus-kenya-hero.png.asset.json";
import executiveSedanImage from "@/assets/nexus-silver-axio.jpg";
import businessSedanImage from "@/assets/nexus-black-noah.jpg";
import luxurySedanImage from "@/assets/nexus-black-prado.jpg";
import executiveVanImage from "@/assets/nexus-silver-noah.jpg";
import premiumSuvImage from "@/assets/nexus-black-range-rover.jpg";
import peopleCarrierImage from "@/assets/nexus-silver-coaster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS | Corporate Transport, Made Effortless" },
      {
        name: "description",
        content:
          "Discover corporate journeys, airport transfers, and full-day hire with NEXUS. Explore the vehicle collection and enquire about your journey.",
      },
      {
        property: "og:title",
        content: "NEXUS | Corporate Transport, Made Effortless",
      },
      {
        property: "og:description",
        content:
          "Discover corporate journeys, airport transfers, and full-day hire with NEXUS. Explore the vehicle collection and enquire about your journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NexusHome,
});

const navigation = [
  { href: "#services", label: "Services" },
  { href: "#vehicles", label: "Our fleet" },
  { href: "#process", label: "How it works" },
  { href: "#reviews", label: "Testimonials" },
];

const services = [
  {
    number: "01",
    title: "Corporate transport",
    description: "Considered journeys for meetings, teams, and the working day.",
    image: luxurySedanImage,
    alt: "Black Toyota Prado for corporate transport in Kenya",
    icon: <RouteIcon aria-hidden="true" />,
  },
  {
    number: "02",
    title: "Full-day hires",
    description: "A dedicated vehicle for schedules that have room to move.",
    image: businessSedanImage,
    alt: "Black Toyota Noah for a full-day hire in Kenya",
    icon: <Clock3 aria-hidden="true" />,
  },
  {
    number: "03",
    title: "Airport transfers",
    description: "A more considered connection to your next flight.",
    image: executiveSedanImage,
    alt: "Silver Toyota Axio for airport transfers in Kenya",
    icon: <Plane aria-hidden="true" />,
  },
];

const vehicles = [
  { title: "Executive sedan", image: executiveSedanImage, alt: "Silver Toyota Axio executive sedan" },
  { title: "7-seater van", image: businessSedanImage, alt: "Black Toyota Noah seven-seater van" },
  { title: "Executive SUV", image: luxurySedanImage, alt: "Black Toyota Prado executive SUV" },
  { title: "Executive van", image: executiveVanImage, alt: "Silver Toyota Noah executive van" },
  { title: "Premium SUV", image: premiumSuvImage, alt: "Black premium Range Rover SUV" },
  { title: "Coaster bus", image: peopleCarrierImage, alt: "Silver Toyota Coaster bus" },
];

const steps = [
  {
    number: "01",
    title: "Choose your ride",
    description: "Explore the service and vehicle options for your journey.",
  },
  {
    number: "02",
    title: "Confirm your journey",
    description: "Share your travel details and shape a plan that suits you.",
  },
  {
    number: "03",
    title: "Travel with ease",
    description: "Settle in, and let the journey take care of itself.",
  },
];

const clientPlaceholders = Array.from({ length: 10 }, (_, index) =>
  `CLIENT LOGO ${String(index + 1).padStart(2, "0")}`,
);

function NexusHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerMessage, setPartnerMessage] = useState("");

  function closeMenu() {
    setMenuOpen(false);
  }

  function showEnquiryPreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPartnerMessage("Thanks for getting in touch. Please call NEXUS directly to complete your booking enquiry.");
  }

  async function submitPartnerVehicle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const photo = formData.get("vehicle-photo");

    if (!(photo instanceof File) || photo.size === 0) {
      setPartnerMessage("Please choose a vehicle photo to continue.");
      return;
    }

    if (!photo.type.startsWith("image/") || photo.size > 8 * 1024 * 1024) {
      setPartnerMessage("Choose an image file smaller than 8 MB.");
      return;
    }

    setPartnerSubmitting(true);
    setPartnerMessage("");

    const extension = photo.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const photoPath = `${crypto.randomUUID()}.${extension}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("nexus-partner-vehicles")
        .upload(photoPath, photo, { contentType: photo.type, upsert: false });

      if (uploadError) throw uploadError;

      const vehicleYearValue = String(formData.get("vehicle-year") ?? "").trim();
      const { error: submitError } = await supabase.from("partner_vehicle_submissions").insert({
        full_name: String(formData.get("partner-name") ?? "").trim(),
        email: String(formData.get("partner-email") ?? "").trim(),
        phone: String(formData.get("partner-phone") ?? "").trim(),
        vehicle_make: String(formData.get("vehicle-make") ?? "").trim(),
        vehicle_model: String(formData.get("vehicle-model") ?? "").trim(),
        vehicle_year: vehicleYearValue ? Number(vehicleYearValue) : null,
        notes: String(formData.get("vehicle-notes") ?? "").trim() || null,
        photo_storage_path: photoPath,
      });

      if (submitError) throw submitError;

      form.reset();
      setPartnerMessage("Your vehicle details have been sent to NEXUS. Thank you for partnering with us.");
    } catch {
      setPartnerMessage("We couldn’t send your details just now. Please try again or call +254 740 570 038.");
    } finally {
      setPartnerSubmitting(false);
    }
  }

  return (
    <main>
      <header className="nexus-header">
        <div className="site-container header-inner">
          <a className="brand-lockup" href="#home" aria-label="NEXUS home" onClick={closeMenu}>
            <img src={logoAsset.url} alt="NEXUS" width={168} height={56} />
          </a>

          <Button
            className="menu-toggle"
            variant="ghost"
            size="icon"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>

          <nav
            id="primary-navigation"
            className={`header-navigation${menuOpen ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {navigation.map(({ href, label }) => (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
            <Button asChild className="header-cta" variant="default" size="sm">
              <a href="#booking" onClick={closeMenu}>
                Book a ride <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Car rental &amp; corporate transport solutions in Kenya</p>
            <h1>Move with <span>purpose.</span></h1>
            <p className="hero-description">
              Car rental and corporate transport solutions in Kenya. Discover executive transport,
              airport connections, and the right vehicle for the day ahead.
            </p>
            <div className="hero-actions">
              <Button asChild className="button-primary" size="lg">
                <a href="#booking">Plan a journey <ArrowRight aria-hidden="true" /></a>
              </Button>
              <a className="text-link" href="#services">
                Explore our services <ArrowDownRight aria-hidden="true" />
              </a>
            </div>
            <div className="hero-signoff">
              <span className="hero-signoff-line" />
              <span>Arrive ready for what’s next.</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-photo"
              src={heroImage.url}
              alt="A fleet of Kenyan cars, vans, and buses ready for the road"
              width={1200}
              height={1200}
              fetchPriority="high"
            />
            <div className="hero-image-caption">
              <span className="caption-marker" />
              <span>Kenya’s roads, ready for what’s next</span>
            </div>
            <span className="hero-image-index" aria-hidden="true">Nº 01 — NEXUS</span>
          </div>
        </div>
      </section>

      <section id="services" className="services-section page-section">
        <div className="site-container">
          <div className="section-heading services-heading">
            <div>
              <p className="eyebrow"><span /> The NEXUS experience</p>
              <h2>A service for <span>every journey.</span></h2>
            </div>
            <p className="section-aside">
              Business travel has its own rhythm.<br />We’re here to make every mile feel simpler.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <a className="service-image-wrap" href="#booking" aria-label={`Ask about ${service.title}`}>
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={512}
                    height={1024}
                    loading="lazy"
                  />
                  <span className="service-image-index">{service.number}</span>
                  <span className="service-image-arrow"><ArrowDownRight aria-hidden="true" /></span>
                </a>
                <div className="service-card-copy">
                  <div className="service-title-row">
                    <h3>{service.title}</h3>
                    <span className="service-icon">{service.icon}</span>
                  </div>
                  <p>{service.description}</p>
                  <a className="small-link" href="#booking">Explore the service <ArrowRight aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="vehicles" className="fleet-section page-section">
        <div className="site-container">
          <div className="section-heading fleet-heading">
            <div>
              <p className="eyebrow"><span /> The vehicle collection</p>
              <h2>The right ride.<br /><span>Every time.</span></h2>
            </div>
            <p className="section-aside">
              A considered collection of six vehicle classes, ready for whatever
              your schedule has in store.
            </p>
          </div>

          <div className="fleet-grid">
            {vehicles.map((vehicle, index) => (
              <a className="vehicle-card" href="#booking" key={vehicle.title}>
                <div className="vehicle-image-wrap">
                  <img
                    src={vehicle.image}
                    alt={vehicle.alt}
                    width={512}
                    height={512}
                    loading="lazy"
                  />
                  <span className="vehicle-index">0{index + 1}</span>
                  <span className="vehicle-cta" aria-hidden="true"><ArrowRight /></span>
                </div>
                <span className="vehicle-title">{vehicle.title}</span>
                <span className="vehicle-caption">Discover this class</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="process-section page-section">
        <div className="site-container process-layout">
          <div className="process-heading">
            <p className="eyebrow"><span /> Three simple steps</p>
            <h2>From here<br />to <span>there.</span></h2>
            <p>A little planning. A smoother journey. And one less thing to think about.</p>
            <a className="small-link" href="#booking">Plan your journey <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="steps-list">
            {steps.map((step) => (
              <article className="step-row" key={step.number}>
                <span className="step-number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <Check className="step-check" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="reviews-section page-section">
        <div className="site-container reviews-layout">
          <div className="reviews-heading">
            <p className="eyebrow"><span /> Made for the way you move</p>
            <h2>Good journeys<br />leave <span>a mark.</span></h2>
          </div>
          <div className="testimonial-placeholder">
            <span className="quote-mark" aria-hidden="true">“</span>
            <p className="placeholder-tag">Approved client words belong here</p>
            <blockquote>
              Replace this space with a real NEXUS client testimonial before publishing.
            </blockquote>
            <span className="testimonial-line" />
            <p className="testimonial-attribution">Testimonial placeholder · No endorsement implied</p>
          </div>
        </div>
      </section>

      <section id="app" className="app-section page-section">
        <div className="site-container app-layout">
          <div className="app-copy">
            <p className="eyebrow eyebrow-light"><span /> Your next journey, closer</p>
            <h2>Travel plans.<br /><span>At your fingertips.</span></h2>
            <p>
              A booking app concept for a simpler way to explore vehicles and
              organise a journey on the go.
            </p>
            <div className="store-buttons" aria-label="App store links coming soon">
              <a className="store-button" href="#download">
                <span className="store-symbol" aria-hidden="true">⌘</span>
                <span><small>Coming soon</small><strong>App Store</strong></span>
              </a>
              <a className="store-button" href="#download">
                <span className="store-symbol play-symbol" aria-hidden="true">▶</span>
                <span><small>Coming soon</small><strong>Google Play</strong></span>
              </a>
            </div>
            <p id="download" className="app-links-note">
              App availability and download links can be added when the NEXUS app launches.
            </p>
          </div>

          <div className="phone-scene" aria-label="NEXUS ride-booking app preview">
            <div className="phone-shell">
              <div className="phone-screen">
                <div className="phone-status"><span>9:41</span><span>● ● ●</span></div>
                <div className="phone-topbar">
                  <span className="phone-avatar" aria-hidden="true">N</span>
                </div>
                <p className="phone-greeting">GOOD MORNING</p>
                <h3>Where to<br />today?</h3>
                <div className="phone-location">
                  <span className="location-dot" />
                  <span>Choose your destination</span>
                  <ArrowRight aria-hidden="true" />
                </div>
                <div className="phone-map" aria-hidden="true">
                  <span className="map-road road-one" />
                  <span className="map-road road-two" />
                  <span className="map-road road-three" />
                  <span className="map-pin"><MapPin aria-hidden="true" /></span>
                </div>
                <p className="phone-vehicle-label">SUGGESTED FOR YOUR RIDE</p>
                <div className="phone-vehicle-row">
                  <img src={executiveSedanImage} alt="" width={96} height={72} />
                  <div><strong>Executive sedan</strong><small>Choose your vehicle</small></div>
                  <ArrowRight aria-hidden="true" />
                </div>
                <div className="phone-book-button">Explore vehicles <ArrowRight aria-hidden="true" /></div>
              </div>
              <span className="phone-island" aria-hidden="true" />
            </div>
            <span className="phone-float-note"><span className="caption-marker" /> App design preview</span>
          </div>
        </div>
      </section>

      <section id="booking" className="booking-section page-section">
        <div className="site-container booking-layout">
          <div className="booking-copy">
            <p className="eyebrow"><span /> Start a conversation</p>
            <h2>Let’s make<br />your next journey <span>count.</span></h2>
            <p>
              Share a little about what you have in mind. This enquiry form is a
              preview and does not yet send or save your details.
            </p>
            <div className="booking-assurance">
              <ShieldCheck aria-hidden="true" />
              <span>Real booking requests can be enabled when an approved enquiry contact is ready.</span>
            </div>
          </div>
          <form className="booking-form" onSubmit={showEnquiryPreview}>
            <div className="form-heading"><span>01 / 03</span><span>Your enquiry</span></div>
            <label htmlFor="guest-name">Your name</label>
            <Input id="guest-name" name="name" autoComplete="name" placeholder="Name" required />
            <label htmlFor="guest-email">Email address</label>
            <Input
              id="guest-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            <label htmlFor="journey-details">What does your journey look like?</label>
            <textarea
              id="journey-details"
              className="booking-textarea"
              name="details"
              rows={4}
              placeholder="Share your service, route, or questions"
            />
            <Button className="form-submit" type="submit" size="lg">
              Preview my enquiry <ArrowRight aria-hidden="true" />
            </Button>
            {partnerMessage && (
              <p className="form-feedback" role="status">
                {partnerMessage}
              </p>
            )}
            <p className="form-privacy">For a quicker response, call +254 740 570 038.</p>
          </form>
        </div>
      </section>

      <section id="partners" className="partner-section page-section">
        <div className="site-container partner-layout">
          <div className="partner-copy">
            <p className="eyebrow"><span /> Grow with NEXUS</p>
            <h2>Partner with us<br /><span>and earn.</span></h2>
            <p>Have a vehicle to put to work? Share its details and our team will get in touch about joining the NEXUS fleet.</p>
            <div className="booking-assurance">
              <ShieldCheck aria-hidden="true" />
              <span>Your vehicle photo is stored privately and only shared with the NEXUS team.</span>
            </div>
          </div>

          <form className="booking-form partner-form" onSubmit={submitPartnerVehicle}>
            <div className="form-heading"><span>PARTNER ENQUIRY</span><span>Vehicle details</span></div>
            <label htmlFor="partner-name">Your name</label>
            <Input id="partner-name" name="partner-name" autoComplete="name" placeholder="Full name" required />
            <div className="form-two-column">
              <div className="form-field">
                <label htmlFor="partner-email">Email address</label>
                <Input id="partner-email" name="partner-email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div className="form-field">
                <label htmlFor="partner-phone">Phone number</label>
                <Input id="partner-phone" name="partner-phone" type="tel" autoComplete="tel" placeholder="+254" required />
              </div>
            </div>
            <div className="form-two-column">
              <div className="form-field">
                <label htmlFor="vehicle-make">Vehicle make</label>
                <Input id="vehicle-make" name="vehicle-make" placeholder="e.g. Toyota" required />
              </div>
              <div className="form-field">
                <label htmlFor="vehicle-model">Vehicle model</label>
                <Input id="vehicle-model" name="vehicle-model" placeholder="e.g. Noah" required />
              </div>
            </div>
            <label htmlFor="vehicle-year">Year of manufacture</label>
            <Input id="vehicle-year" name="vehicle-year" type="number" min="1980" max="2026" placeholder="e.g. 2022" />
            <label htmlFor="vehicle-photo">Vehicle photo</label>
            <Input id="vehicle-photo" name="vehicle-photo" type="file" accept="image/*" required />
            <p className="form-privacy form-file-note"><FileImage aria-hidden="true" /> JPG, PNG, or another image format · up to 8 MB</p>
            <label htmlFor="vehicle-notes">Anything else we should know?</label>
            <textarea id="vehicle-notes" className="booking-textarea" name="vehicle-notes" rows={3} placeholder="Vehicle condition, availability, or questions" />
            <Button className="form-submit" type="submit" size="lg" disabled={partnerSubmitting}>
              {partnerSubmitting ? "Sending details…" : "Send partner enquiry"} <ArrowRight aria-hidden="true" />
            </Button>
            {partnerMessage && <p className="form-feedback" role="status">{partnerMessage}</p>}
          </form>
        </div>
      </section>

      <section className="trust-section" aria-labelledby="trust-heading">
        <div className="site-container trust-inner">
          <div className="trust-intro">
            <p className="eyebrow eyebrow-muted">Partnerships</p>
            <h2 id="trust-heading">Companies that trust us.</h2>
          </div>
          <div className="client-logo-wrap">
            <div className="client-logo-track" aria-label="Ten sample client logo placements">
              {[...clientPlaceholders, ...clientPlaceholders].map((label, index) => (
                <span key={`${label}-${index}`} aria-hidden={index >= clientPlaceholders.length}>
                  {label}
                </span>
              ))}
            </div>
            <p className="placeholder-note">
              Sample logo placements. Replace with confirmed NEXUS client logos.
            </p>
          </div>
        </div>
      </section>

      <footer className="nexus-footer">
        <div className="site-container footer-main">
          <div className="footer-brand">
            <a className="brand-lockup" href="#home" aria-label="NEXUS home">
              <img src={logoAsset.url} alt="NEXUS" width={160} height={54} loading="lazy" />
            </a>
            <p>Considered journeys<br />for the way business moves.</p>
          </div>
          <div className="footer-column">
            <p className="footer-label">Explore</p>
            <a href="#services">Our services</a>
            <a href="#vehicles">Our fleet</a>
            <a href="#process">How it works</a>
          </div>
          <div className="footer-column">
            <p className="footer-label">Connect</p>
            <a href="#booking">Enquire about a journey</a>
            <a href="#partners">Partner with us</a>
            <a href="#app">NEXUS app</a>
          </div>
          <div className="footer-column footer-legal">
            <p className="footer-label">Nairobi</p>
            <span>Tsavo Suits<br />Ngong Rd, Nairobi, Kenya</span>
          </div>
          <div className="footer-column footer-legal" id="legal">
            <p className="footer-label">Information</p>
            <a href="#legal">Privacy policy</a>
            <a href="#legal">Terms of service</a>
            <span>Replace these placeholders with approved policies.</span>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© 2026 NEXUS. All rights reserved.</span>
          <span className="footer-bottom-right"><span className="caption-marker" /> Corporate transport, considered</span>
        </div>
      </footer>
    </main>
  );
}