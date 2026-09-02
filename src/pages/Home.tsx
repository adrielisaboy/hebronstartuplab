/**
 * Campus Comic Editorial: hard black-and-white chapter changes, condensed poster
 * typography, sparse color signals, and supplied character art drive every section.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SponsorsMarquee } from "@/components/SponsorsMarquee";
import { BrandLogo } from "@/components/BrandLogo";
import { useMemberProfile } from "@/contexts/MemberProfileContext";
import { useHeroReveal } from "@/hooks/useHeroReveal";

const NAV_ITEMS = [
  { label: "About", route: "/about" },
  { label: "Communities", route: "/communities" },
  { label: "Startups", route: "/startups" },
  { label: "For Investors", route: "/investors" },
  { label: "Contact", route: "/contact" },
];

const COMMUNITY_CARDS = [
  {
    accent: "pink",
    title: "Creatives",
    copy: "Content writers, Designers, artists, strategists, UX/UI, and people-makers.",
    links: "Writers · Designers · Marketers",
  },
  {
    accent: "blue",
    title: "Creators",
    copy: "Developers and technical builders who turn difficult ideas into tangible tools.",
    links: "Frontend · Backend · Mobile · Data",
  },
  {
    accent: "orange",
    title: "Executors",
    copy: "Project and product managers who keep ambitious things on time, on scope.",
    links: "Product · Project · Operations",
  },
  {
    accent: "purple",
    title: "Founders",
    copy: "First-time founders building ventures inside HSL, from first idea to founding company.",
    links: "Idea-stage · Early-revenue · Scaling",
  },
];

const STARTUPS = [
  ["blue", "Ledgerly", "PAYMENTS", "Payments infrastructure for African SMEs."],
  ["purple", "Farmstack", "AGRI-TECH", "Supply-chain tooling for smallholder farms."],
  ["pink", "Studio Loom", "GAME-TECH", "Brand and motion studio for early-stage founders."],
  ["orange", "Jilo Innovations", "SERVICES", "InstaSync — workflow automation for service businesses."],
  ["blue", "Healthip", "HEALTH-TECH", "Appointment intake for community clinics."],
  ["purple", "Marketframe", "ED-TECH", "No-code storefronts for student vendors."],
] as const;

const PARTNERS = [
  "The Indulgence",
  "Snapcode Productions",
  "Wavform",
  "ALT X by Mera",
  "Cubit Host",
  "HACK",
  "United Capital",
  "Wema Bank",
  "CloudPewa",
  "VentureGarden Group",
  "Open State",
  "AfriLabs",
  "DreamCode",
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { profile } = useMemberProfile();
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState<"All" | "Active" | "Alumni">("All");
  const isLoggedIn = profile.email && profile.email !== "";
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

  const openApplication = () => setLocation("/signup");

  const submitDeckRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    if (!email.includes("@")) {
      toast.error("Add a valid work email to continue.");
      return;
    }
    // Frontend-only: no database storage
    setSubmitted(true);
  };

  return (
    <div ref={rootRef} className="site-shell">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <button className="mark-button" aria-label="Return to top" onClick={() => setLocation("/")}>
          <BrandLogo alt="HSL Logo" />
        </button>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <button key={item.route} onClick={() => setLocation(item.route)}>{item.label}</button>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          {isLoggedIn ? (<button className="button button--black button--small" onClick={() => setLocation("/app")}>Go to Dashboard</button>) : (<><button className="login-link" onClick={() => setLocation("/login")}>Log in</button><button className="button button--black button--small" onClick={() => setLocation("/signup")}>Sign up</button></>)}
          <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <button key={item.route} onClick={() => { setMenuOpen(false); setLocation(item.route); }}>{item.label}</button>
          ))}
          <div className="mobile-nav-actions">
            <ThemeToggle showLabel className="mobile-theme-toggle" />
            {isLoggedIn ? (<button className="button button--black button--small" style={{ width: "100%", marginTop: "8px" }} onClick={() => { setMenuOpen(false); setLocation("/app"); }}>Go to Dashboard</button>) : (<button className="button button--black button--small" style={{ width: "100%", marginTop: "8px" }} onClick={() => { setMenuOpen(false); setLocation("/signup"); }}>Sign up</button>)}
          </div>
        </div>
      </header>

      <main>
        <section id="top" className="hero section-paper">
          <img data-float="flyer" className="hero-character hero-character--flyer" src="/assets/pasted_file_3v62K1_image.png" alt="" />
          <img data-float="rocket" className="hero-character hero-character--rocket" src="/assets/rocketgirl.png" alt="" />
          <div className="hero-content">
            <div data-hero-kicker className="eyebrow eyebrow--pill">West Africa's first university-based startup accelerator</div>
            <h1 data-hero-title className="hero-title"><span>Bringing ideas</span><span>to life.</span></h1>
            <p data-hero-copy>HSL takes ideas from concept, to product, to market — and helps builders grow from mere ideas into successful startups. Join a rigorous, credible community where who ships, ships.</p>
            <div data-hero-actions className="hero-actions">
              <button className="button button--black" onClick={() => setLocation("/signup")}>Apply to HSL <ArrowRight size={14} /></button>
              <button className="button button--outline" onClick={() => setLocation("/startups")}>Explore Startups <ArrowUpRight size={14} /></button>
            </div>
          </div>
          <button className="scroll-cue" onClick={() => scrollToSection("about")} aria-label="Scroll to explore"><span>Scroll to explore</span><ArrowDown size={14} /></button>
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
          <img className="stages-character stages-character--ideas" src="/assets/lightgirl.png" alt="" />
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

        <section id="communities" className="communities-section section-paper">
          <div className="section-heading" data-reveal><p className="eyebrow">Our communities</p><h2>Four disciplines. One mission.</h2><p>Everyone brings what belongs to them. We're bound by what we build. Pick the community that feels most like your craft.</p></div>
          <div className="community-grid">
            {COMMUNITY_CARDS.map((card) => (
              <article key={card.title} className="community-card" data-reveal><span className={`accent-block accent-block--${card.accent}`} /><h3>{card.title}</h3><p>{card.copy}</p><button className="card-link" onClick={() => setLocation("/communities")}>{card.links}</button></article>
            ))}
          </div>
        </section>

        <section id="startups" className="portfolio-section">
          <div className="section-heading portfolio-heading" data-reveal><div><p className="eyebrow">The portfolio</p><h2>Startups built at HSL.</h2></div><div className="filter-set" aria-label="Startup filter">{(["All", "Active", "Alumni"] as const).map((label) => <button key={label} className={portfolioFilter === label ? "is-active" : ""} onClick={() => setPortfolioFilter(label)}>{label}</button>)}</div></div>
          <div className="portfolio-grid">
            {STARTUPS.filter((_startup, index) => portfolioFilter === "All" || (portfolioFilter === "Active" ? index < 4 : index >= 4)).map(([accent, name, tag, copy]) => (
              <article className="startup-card" key={name} data-reveal><div className="startup-top"><span className={`accent-block accent-block--${accent}`}><span>{name[0]}</span></span><small>{tag}</small></div><h3>{name}</h3><p>{copy}</p><button onClick={() => setLocation(`/startups/${name.toLowerCase()}`)}>View startup <ChevronRight size={14} /></button></article>
            ))}
          </div>
        </section>

        {/* Dedicated Global Sponsors Marquee Section */}
        <SponsorsMarquee />

        <section id="investors" className="investor-section section-paper">
          <div className="investor-intro" data-reveal><p className="eyebrow">For investors & partners</p><h2>A vetted pipeline of investable founders.</h2><p>HSL runs a rigorous, university-backed incubation process — every founder in our portfolio has been through structured mentorship, product validation, and milestone review before they ever pitch. That means less noise, more signal.</p><button className="button button--black" onClick={() => setLocation("/investors")}>Request Investor Deck <ArrowRight size={14} /></button></div>
          <div className="investor-list" data-reveal>{[['University-backed', 'West Africa\'s first university-affiliated startup accelerator, with structured academic and industry partnerships through Covenant University.'], ['Full-stack talent pipeline', 'Every startup draws from our Creatives, Creators, Executors and Founders communities — no cold hiring, no outsourcing.'], ['Track record', '120+ startups incubated. 35+ active ventures. Consistent cohort-on-cohort growth.']].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="footer-cta" data-reveal>{isLoggedIn ? (<><p className="eyebrow eyebrow--light">Welcome back</p><h2>Continue building.</h2><p>Your dashboard, tasks, and community are ready for you.</p><button className="button button--white" onClick={() => setLocation("/app")}>Go to Dashboard <ArrowRight size={14} /></button></>) : (<><p className="eyebrow eyebrow--light">Applications are open</p><h2>Ready to build something real?</h2><p>Applications for the next cohort are open. Pick your community, get vetted, get building.</p><button className="button button--white" onClick={openApplication}>Apply to Join HSL <ArrowRight size={14} /></button></>)}</div>
        <div className="footer-characters official-footer-art" aria-hidden="true"><img src="/assets/rocketgirl.png" alt="" /><img src="/assets/lightgirl.png" alt="" /><img src="/assets/hslguyy.png" alt="" /><img src="/assets/pasted_file_3v62K1_image.png" alt="" /></div>
        <div className="footer-grid">
          <div className="footer-brand"><BrandLogo alt="HSL Logo" forceTheme="dark" /><p>West Africa's first University based startup accelerator. From concept, to product, to market.</p></div>
          <div><h3>Platform</h3><button onClick={() => setLocation("/about")}>About</button><button onClick={() => setLocation("/communities")}>Communities</button><button onClick={() => setLocation("/startups")}>Startups</button><button onClick={() => setLocation("/investors")}>For Investors</button></div>
          <div><h3>Get involved</h3>{isLoggedIn ? (<button onClick={() => setLocation("/app")}>Go to Dashboard</button>) : (<><button onClick={() => setLocation("/signup")}>Apply to Join</button><button onClick={() => setLocation("/login")}>Log in</button></>)}<button onClick={() => setLocation("/contact")}>Partner with us</button></div>
          <div><h3>Contact</h3><a href="mailto:hello@hebronstartuplab.com">hello@hebronstartuplab.com</a><a href="#instagram">Instagram</a><a href="#twitter">X / Twitter</a><a href="#linkedin">LinkedIn</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Hebron Startup Lab. All rights reserved.</span><span>Designed for people who ship.</span></div>
      </footer>

      {deckOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setDeckOpen(false)}><div className="deck-modal" role="dialog" aria-modal="true" aria-labelledby="deck-title" onMouseDown={(event) => event.stopPropagation()}>{submitted ? <div className="deck-success"><Check size={22} /><h2 id="deck-title">Deck request received.</h2><p>We'll follow up with the current HSL investor deck after a quick review.</p><button className="button button--black" onClick={() => { setDeckOpen(false); setSubmitted(false); }}>Close</button></div> : <><button className="modal-close" aria-label="Close request form" onClick={() => setDeckOpen(false)}><X size={18} /></button><p className="eyebrow">The investor deck</p><h2 id="deck-title">Get the full deck in your inbox.</h2><p>Tell us a little about you and we'll send the current HSL investor deck (PDF) straight to your email — no surprise downloads.</p><form onSubmit={submitDeckRequest}><label>Full name<input required name="fullName" placeholder="Ada Lovelace" /></label><label>Work email<input required type="email" name="email" placeholder="ada@fund.com" /></label><label>Organization / fund<input required name="organization" placeholder="Anchor Ventures" /></label><button className="button button--black" type="submit">Send me the deck <ArrowRight size={14} /></button></form></>}</div></div>}
    </div>
  );
}