import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { BrandLogo } from "./BrandLogo";

const publicLinks = [
  ["About", "/about"],
  ["Communities", "/communities"],
  ["Startups", "/startups"],
  ["For Investors", "/investors"],
  ["Contact", "/contact"],
] as const;

export function PublicHeader({ active }: { active?: string }) {
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="public-header">
      <button
        className="mark-button"
        aria-label="HSL home"
        onClick={() => setLocation("/")}
      >
        <BrandLogo alt="HSL Logo" />
      </button>

      <nav className="public-nav" aria-label="Primary navigation">
        {publicLinks.map(([label, route]) => (
          <button
            key={route}
            className={active === route ? "is-active" : ""}
            onClick={() => setLocation(route)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="public-actions">
        <ThemeToggle />
        <button className="login-link" onClick={() => setLocation("/login")}>
          Log in
        </button>
        <button
          className="button button--black button--small"
          onClick={() => setLocation("/signup")}
        >
          Sign up
        </button>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`mobile-nav ${open ? "is-open" : ""}`}>
        {publicLinks.map(([label, route]) => (
          <button
            key={route}
            onClick={() => {
              setOpen(false);
              setLocation(route);
            }}
          >
            {label}
          </button>
        ))}
        <div className="mobile-nav-actions">
          <ThemeToggle showLabel className="mobile-theme-toggle" />
          <button
            className="button button--black button--small"
            style={{ width: "100%", marginTop: "8px" }}
            onClick={() => {
              setOpen(false);
              setLocation("/signup");
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter({
  title = "Ready to build something real?",
  action = "Apply to Join HSL",
}: {
  title?: string;
  action?: string;
}) {
  const [, setLocation] = useLocation();
  return (
    <footer className="site-footer public-footer">
      <div className="footer-cta">
        <p className="eyebrow eyebrow--light">Applications are open</p>
        <h2>{title}</h2>
        <p>
          Applications for the next cohort are open. Pick your community, get
          vetted, get building.
        </p>
        <button
          className="button button--white"
          onClick={() => setLocation("/signup")}
        >
          {action} <ArrowRight size={14} />
        </button>
      </div>
      <div className="footer-characters official-footer-art" aria-hidden="true">
        <img src="/assets/rocketgirl.png" alt="" />
        <img src="/assets/lightgirl.png" alt="" />
        <img src="/assets/hslguyy.png" alt="" />
        <img src="/assets/pasted_file_3v62K1_image.png" alt="" />
      </div>
      <div className="footer-grid">
        <div className="footer-brand">
          <BrandLogo alt="HSL Logo" forceTheme="dark" />
          <p>
            West Africa’s first University based startup accelerator. From
            concept, to product, to market.
          </p>
        </div>
        <div>
          <h3>Platform</h3>
          <button onClick={() => setLocation("/about")}>About</button>
          <button onClick={() => setLocation("/communities")}>Communities</button>
          <button onClick={() => setLocation("/startups")}>Startups</button>
          <button onClick={() => setLocation("/investors")}>For Investors</button>
        </div>
        <div>
          <h3>Get involved</h3>
          <button onClick={() => setLocation("/signup")}>Apply to Join</button>
          <button onClick={() => setLocation("/login")}>Log in</button>
          <button onClick={() => setLocation("/contact")}>Partner with us</button>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@hebronstartuplab.com">hello@hebronstartuplab.com</a>
          <a href="#instagram">Instagram</a>
          <a href="#twitter">X / Twitter</a>
          <a href="#linkedin">LinkedIn</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Hebron Startup Lab. All rights reserved.</span>
        <span>Designed for people who ship.</span>
      </div>
    </footer>
  );
}
