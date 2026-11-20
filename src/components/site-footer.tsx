import { Link } from "@tanstack/react-router";

import logoSrc from "@/assets/logo.png";
import { ADDRESS_LINES, PHONE_DISPLAY, PHONE_TEL } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="nexus-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <Link className="brand-lockup" to="/" hash="home" aria-label="NEXUS home">
            <img src={logoSrc} alt="NEXUS" width={140} height={57} loading="lazy" />
          </Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">Explore</p>
          <Link to="/" hash="services">
            Our services
          </Link>
          <Link to="/" hash="vehicles">
            Our fleet
          </Link>
          <Link to="/" hash="process">
            How it works
          </Link>
          <Link to="/about">About us</Link>
        </div>
        <div className="footer-column">
          <p className="footer-label">Connect</p>
          <Link to="/" hash="booking">
            Enquire about a journey
          </Link>
          <Link to="/" hash="partners">
            Partner with us
          </Link>
          <Link to="/" hash="app">
            NEXUS app
          </Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div className="footer-column footer-legal">
          <p className="footer-label">Nairobi</p>
          <span>
            {ADDRESS_LINES[0]}
            <br />
            {ADDRESS_LINES[1]}
          </span>
          <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>© 2026 NEXUS. All rights reserved.</span>
      </div>
    </footer>
  );
}
