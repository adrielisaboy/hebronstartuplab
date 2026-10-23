/**
 * Campus Comic Editorial: hard black-and-white chapter changes, condensed poster
 * typography, sparse color signals, and supplied character art drive every section.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SponsorsMarquee } from "@/components/SponsorsMarquee";
import { BrandLogo } from "@/components/BrandLogo";
import { useHeroReveal } from "@/hooks/useHeroReveal";

const NAV_ITEMS = [
  { label: "About", target: "about" },
  { label: "For Investors", target: "investors" },
];


function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useHeroReveal(rootRef);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to("[data-float='rocket']", { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to("[data-float='flyer']", { y: 9, x: 5, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, rootRef);
    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="mark-button" aria-label="Return to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <BrandLogo alt="HSL Logo" />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item.target} onClick={() => scrollToSection(item.target)}>{item.label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <button key={item.target} onClick={() => { setMenuOpen(false); scrollToSection(item.target); }}>{item.label}</button>
          ))}
          <div className="mobile-nav-actions">
            <ThemeToggle showLabel className="mobile-theme-toggle" />
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="hero section-paper">
          <img data-float="flyer" className="hero-character hero-character--flyer" src="/assets/pasted_file_3v62K1_image.webp" alt="" fetchPriority="high" decoding="async" />
          <img data-float="rocket" className="hero-character hero-character--rocket" src="/assets/rocketgirl.webp" alt="" fetchPriority="high" decoding="async" />
          <div className="hero-content">
            <div data-hero-kicker className="eyebrow eyebrow--pill">West Africa's first university-based startup accelerator</div>
            <h1 data-hero-title className="hero-title"><span>Bringing ideas</span><span>to life.</span></h1>
            <p data-hero-copy>HSL takes ideas from concept, to product, to market — and helps builders grow from mere ideas into successful startups. A rigorous, credible community where who ships, ships.</p>
          </div>
          <div className="scroll-cue" aria-hidden="true"><span>Scroll to explore</span><ArrowDown size={14} /></div>
        </section>

        <section className="stats-band" aria-label="HSL statistics">
          {[['120+', 'Startups incubated since founding'], ['500+', 'Members across all 4 communities'], ['35+', 'Active founder-led ventures today'], ['₦150M+', 'Raised by portfolio startups to date']].map(([metric, label]) => (
            <div className="stat" key={metric} data-reveal><strong>{metric}</strong><span>{label}</span></div>
          ))}
        </section>

        <section id="about" className="about-section section-paper split-intro">
          <div data-reveal>
            <p className="eyebrow">How we started</p>
            <h2>From two campus experiments to a lab of our own.</h2>
            <p className="body-copy">Hebron Startup Lab was founded in November 2016, when Dr. Stephen Olawotimi secured approval to establish the lab at Covenant University. It was built as an intentional response to the gap between raw student projects and the deliberate accelerator journey builders need.</p>
          </div>
          <div className="fact-sheet" data-reveal>
            <p className="eyebrow">Founders</p>
            <dl>
              <div><dt>Founder</dt><dd>Dr. Stephen Olawotimi</dd></div>
              <div><dt>Location</dt><dd>Covenant University, Ota, Nigeria</dd></div>
              <div><dt>Focus</dt><dd>2× Alpha Edge · Field & Growth — Mon–Fri</dd></div>
              <div><dt>Capacity</dt><dd>12 high-growth startups, 4× per year</dd></div>
            </dl>
          </div>
        </section>

        <section className="manifesto-grid" aria-label="HSL purpose">
          <article className="manifesto-panel manifesto-panel--dark" data-reveal>
            <p className="eyebrow eyebrow--light">Mission</p>
            <h3>Cultivate high-growth entrepreneurs, talents, and teams.</h3>
            <p>We exist to help builders solve real problems through entrepreneurship and innovation — from first idea to a sharper, lived-in solution.</p>
          </article>
          <article className="manifesto-panel manifesto-panel--light" data-reveal>
            <p className="eyebrow">Vision · 2025–2027</p>
            <h3>12 high-growth startups, four every year.</h3>
            <p>We're positioning entrepreneurship as a force for community and global positive change — building a precise, credible venture ecosystem that creates real jobs and real wealth.</p>
          </article>
        </section>

        <section className="values-section section-paper">
          <p className="eyebrow values-heading" data-reveal>What we stand for</p>
          <div className="values-grid">
            {[['01', 'Entrepreneurship', 'We solve problems, welcome uncertainty, and take ownership of both risk and outcome.'], ['02', 'Innovation', 'We challenge what already exists and prototype a smarter way forward.'], ['03', 'Environmental Sustainability', 'We build companies that consider their communities, not just portfolios.'], ['04', 'Wealth Creation', 'We create durable value for ourselves, our wider network — and our families.']].map(([number, title, copy]) => (
              <article className="value" key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section className="stages-section">
          <img className="stages-character stages-character--ideas" src="/assets/lightgirl.webp" alt="" loading="lazy" decoding="async" />
          <div className="stage-wrap">
            <p className="eyebrow eyebrow--light" data-reveal>How a startup moves</p>
            <h2 data-reveal>Four stages. One Demo Day.</h2>
            <div className="stage-line" />
            <div className="stages-grid">
              {[['01', 'Ideation', 'Clarify the problem and develop a compelling solution around a real customer.'], ['02', 'Product Development', 'Build a working concept and validate the essential journey before anything bigger.'], ['03', 'Acceleration', 'Test the market and advance traction before telling a compelling growth story.'], ['04', 'Shipping', 'Improve the validated product and prepare — with measurable proof — for a serious next step.']].map(([number, title, copy]) => (
                <article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Global Sponsors Marquee Section */}
        <SponsorsMarquee />

        <section id="investors" className="investor-section section-paper">
          <div className="investor-intro" data-reveal><p className="eyebrow">For investors & partners</p><h2>A vetted pipeline of investable founders.</h2><p>HSL runs a rigorous, university-backed incubation process — every founder in our portfolio has been through structured mentorship, product validation, and milestone review before they ever pitch. That means less noise, more signal.</p></div>
          <div className="investor-list" data-reveal>{[['University-backed', 'West Africa\'s first university-affiliated startup accelerator, with structured academic and industry partnerships through Covenant University.'], ['Full-stack talent pipeline', 'Every startup draws from our Creatives, Creators, Executors and Founders communities — no cold hiring, no outsourcing.'], ['Track record', '120+ startups incubated. 35+ active ventures. Consistent cohort-on-cohort growth.']].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="footer-characters official-footer-art" aria-hidden="true"><img src="/assets/rocketgirl.webp" alt="" loading="lazy" decoding="async" /><img src="/assets/lightgirl.webp" alt="" loading="lazy" decoding="async" /><img src="/assets/hslguyy.webp" alt="" loading="lazy" decoding="async" /><img src="/assets/pasted_file_3v62K1_image.webp" alt="" loading="lazy" decoding="async" /></div>
        <div className="footer-grid">
          <div className="footer-brand"><BrandLogo alt="HSL Logo" forceTheme="dark" /><p>West Africa's first University based startup accelerator. From concept, to product, to market.</p></div>
          <div><h3>Location</h3><p className="footer-text">Covenant University</p><p className="footer-text">KM 10 Idiroko Road, Canaanland</p><p className="footer-text">Ota, Ogun State, Nigeria</p></div>
          <div><h3>Focus</h3><p className="footer-text">Creatives & Creators</p><p className="footer-text">Executors & Founders</p><p className="footer-text">Venture Acceleration</p></div>
          <div><h3>Contact</h3><p className="footer-text">startup@covenantuniversity.edu.ng</p><p className="footer-text">Mon – Fri · 9:00 AM – 5:00 PM</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Hebron Startup Lab. All rights reserved.</span><span>Designed for people who ship.</span></div>
      </footer>
    </div>
  );
}