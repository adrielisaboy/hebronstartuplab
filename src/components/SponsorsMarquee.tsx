import React from "react";
import { Sparkles } from "lucide-react";

export interface SponsorLogo {
  name: string;
  logo: string;
  className?: string;
}

export const SPONSOR_LOGOS: SponsorLogo[] = [
  { name: "Wema Bank", logo: "/assets/wemabank.png" },
  { name: "United Capital", logo: "/assets/unitedcapital.png" },
  { name: "ALAT by Wema", logo: "/assets/alat.png" },
  { name: "AfriLabs", logo: "/assets/afrilabs.png" },
  { name: "Venture Garden Group", logo: "/assets/venturegarden.png" },
  { name: "Snapcode Productions", logo: "/assets/snapcode.webp" },
  { name: "The Indulgence", logo: "/assets/theindulgence.png" },
  { name: "Waffledom", logo: "/assets/waffledom.png" },
  { name: "NACK Apparel", logo: "/assets/nack.png" },
];

interface SponsorsMarqueeProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function SponsorsMarquee({
  eyebrow = "Our Global Sponsors",
  title = "Backed by world-class partners & sponsors.",
  description,
  className = "",
}: SponsorsMarqueeProps) {
  // Duplicate the list 3 times for completely seamless infinite loop
  const repeatedLogos = [...SPONSOR_LOGOS, ...SPONSOR_LOGOS, ...SPONSOR_LOGOS];

  return (
    <section className={`sponsors-section ${className}`} aria-label="Our Global Sponsors">
      <div className="sponsors-header" data-reveal>
        <div className="sponsors-badge">
          <Sparkles size={13} className="sponsors-sparkle" />
          <span className="eyebrow eyebrow--pill">{eyebrow}</span>
        </div>
        {title && <h2 className="sponsors-title">{title}</h2>}
        {description && <p className="sponsors-desc">{description}</p>}
      </div>

      <div className="sponsors-marquee-container">
        {/* Single continuous line of logos */}
        <div className="marquee-track-wrapper">
          <div className="marquee-track marquee-track--continuous">
            {repeatedLogos.map((sponsor, idx) => (
              <div
                key={`${sponsor.name}-${idx}`}
                className="sponsor-logo-item"
                title={sponsor.name}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-img"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient edge masks */}
        <div className="marquee-fade-left" aria-hidden="true" />
        <div className="marquee-fade-right" aria-hidden="true" />
      </div>
    </section>
  );
}

export default SponsorsMarquee;
