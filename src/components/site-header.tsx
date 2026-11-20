import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/logo.png";

const sectionLinks = [
  { hash: "services", label: "Services" },
  { hash: "vehicles", label: "Our fleet" },
  { hash: "process", label: "How it works" },
  { hash: "partners", label: "Partner with us" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nexus-header">
      <div className="site-container header-inner">
        <Link
          className="brand-lockup"
          to="/"
          hash="home"
          aria-label="NEXUS home"
          onClick={closeMenu}
        >
          <img src={logoSrc} alt="NEXUS" width={150} height={61} />
        </Link>

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
          {sectionLinks.map(({ hash, label }) => (
            <Link key={hash} to="/" hash={hash} onClick={closeMenu}>
              {label}
            </Link>
          ))}
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
          <Button asChild className="header-cta" variant="default" size="sm">
            <Link to="/" hash="booking" onClick={closeMenu}>
              Book a ride <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
