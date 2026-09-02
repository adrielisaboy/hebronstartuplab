import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { type ReactNode, useRef, useState } from "react";
import { useLocation } from "wouter";
import { PublicFooter, PublicHeader } from "@/components/PublicChrome";
import { SponsorsMarquee } from "@/components/SponsorsMarquee";
import { useHeroReveal } from "@/hooks/useHeroReveal";
import { toast } from "sonner";

const startups = [
  ["blue", "Ledgerly", "PAYMENTS", "Payments infrastructure for African SMEs."],
  ["purple", "Farmstack", "AGRI-TECH", "Supply-chain tooling for smallholder farms."],
  ["pink", "Studio Loom", "GAME-TECH", "Brand and motion studio for early-stage founders."],
  ["orange", "Jilo Innovations", "SERVICES", "InstaSync — workflow automation for service businesses."],
  ["blue", "Healthip", "HEALTH-TECH", "Appointment intake for community clinics."],
  ["purple", "Marketframe", "ED-TECH", "No-code storefronts for student vendors."],
  ["orange", "Reroute", "SERVICES", "Logistics scheduling for campus delivery."],
  ["pink", "Living Dreams", "GAME-TECH", "A studio building narrative mobile games."],
  ["blue", "Pally", "ED-TECH", "Peer-to-peer learning for students."],
] as const;

const communityCards = [
  ["pink", "Creatives", "Storytelling, motion, interface design, and the visual systems that make an idea travel."],
  ["blue", "Creators", "Developers and technical builders who turn difficult ideas into pragmatic tools."],
  ["orange", "Executors", "Operators, product managers, and project leads who keep the right things moving."],
  ["purple", "Founders", "People ready to own a problem, invite collaborators, and build ventures with consequence."],
] as const;

function PublicPage({ children, animationKey }: { children: ReactNode; animationKey?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useHeroReveal(rootRef, animationKey);
  return (
    <div className="public-page" ref={rootRef}>
      {children}
    </div>
  );
}

export function AboutPage() {
  return (
    <PublicPage>
      <PublicHeader active="/about" />
      <main>
        <section className="about-hero dark-public-hero">
          <div>
            <p data-hero-kicker className="eyebrow eyebrow--light">Our story · Founded 2016</p>
            <h1 data-hero-title>
              <span>Built at a university.</span>
              <span>Made for builders.</span>
            </h1>
            <p data-hero-copy>
              HSL is West Africa's first university-based startup incubator and
              accelerator — founded at Covenant University to build through
              entrepreneurship, innovation, and teams who ship.
            </p>
          </div>
          <img className="about-character" src="/assets/hslguyy.png" alt="" />
        </section>
        <section className="editorial-split section-paper">
          <div data-reveal>
            <p className="eyebrow">How we started</p>
            <h2>From two campus experiments to a lab of our own.</h2>
            <p>
              In 2016, a small group of student builders proved that creative
              ambition is far more useful when it has structure, mentors,
              accountability, and a way to become a real company.
            </p>
          </div>
          <div className="fact-sheet" data-reveal>
            <p className="eyebrow">Founders</p>
            <dl>
              <div>
                <dt>Founder</dt>
                <dd>Dr. Stephen Olawotimi</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Covenant University, Ota, Nigeria</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Early-stage ventures with technical foundations</dd>
              </div>
              <div>
                <dt>Capacity</dt>
                <dd>12 high-growth startups, four times a year</dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="manifesto-grid">
          <article className="manifesto-panel manifesto-panel--dark" data-reveal>
            <p className="eyebrow eyebrow--light">Mission</p>
            <h3>Cultivate high-growth entrepreneurs, talents, and teams.</h3>
            <p>
              We exist to help people solve hard problems through
              entrepreneurship and innovation.
            </p>
          </article>
          <article className="manifesto-panel manifesto-panel--light" data-reveal>
            <p className="eyebrow">Vision · 2025—2027</p>
            <h3>12 high-growth startups, four every year.</h3>
            <p>
              A research-driven pipeline of founders who can build products,
              teams, and meaningful local employment.
            </p>
          </article>
        </section>
        <section className="timeline-section">
          <div data-reveal>
            <p className="eyebrow">How a startup moves</p>
            <h2>Four stages. One Demo Day.</h2>
          </div>
          <div className="timeline-grid">
            {[
              ["01", "Ideation"],
              ["02", "Product Development"],
              ["03", "Acceleration"],
              ["04", "Shipping"],
            ].map(([number, title]) => (
              <article key={number} data-reveal>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>
                  Move from a genuine problem to a clearer, stronger company with
                  proof behind it.
                </p>
              </article>
            ))}
          </div>
        </section>
        <SponsorsMarquee
          eyebrow="Our Global Backers & Sponsors"
          title="Industry partners powering our mission."
        />
        <section className="people-section section-paper">
          <p className="eyebrow" data-reveal>Leading the lab</p>
          <h2 data-reveal>The team behind the lab.</h2>
          <div className="people-grid">
            {[
              ["Dr. Stephen Olawotimi", "Founder"],
              ["Dr. Mayowa", "Board Member & Governor"],
              ["Mrs. Thela", "Board Member & Advisor"],
              ["Mr. Daniel", "Lead, Venture Acceleration"],
              ["Mrs. Mercy", "Lead, Startup Support"],
              ["Mr. Stephen", "Lead, Growth & IP"],
              ["Dr. Marvelous", "Lead, Finance, Legal & Partnerships"],
              ["Mrs. Rajolee", "Lead, Media & Marketing"],
              ["Iredia Akinnola", "Lead, Community"],
            ].map(([name, role], index) => (
              <article key={name} data-reveal>
                <span className={`person-dot person-dot--${index % 4}`} />
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}

export function CommunitiesPage() {
  const [, setLocation] = useLocation();
  return (
    <PublicPage>
      <PublicHeader active="/communities" />
      <main>
        <section className="public-hero communities-hero">
          <p data-hero-kicker className="eyebrow eyebrow--pill">The HSL network</p>
          <h1 data-hero-title>
            <span>Four disciplines.</span>
            <span>One mission.</span>
          </h1>
          <p data-hero-copy>Each community brings an essential way of working. Together, they become a team capable of building something real.</p>
        </section>
        <section className="community-index section-paper">
          <div className="community-index-intro" data-reveal>
            <p className="eyebrow">Choose your craft</p>
            <h2>A studio made of people who bring different tools to the same table.</h2>
          </div>
          <div className="community-list">
            {communityCards.map(([accent, title, copy], index) => (
              <article key={title} data-reveal>
                <span className={`accent-block accent-block--${accent}`} />
                <span className="community-no">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <button onClick={() => setLocation("/signup")}>Join this community <ArrowRight size={14} /></button>
              </article>
            ))}
          </div>
        </section>
        <section className="community-quote">
          <img src="/assets/pasted_file_puaTBM_image.png" alt="" />
          <div data-reveal>
            <p className="eyebrow eyebrow--light">Community principle</p>
            <h2>You do not have to build alone to be the one who owns the idea.</h2>
            <p>HSL helps its members find high-trust collaborators across the disciplines a living startup needs.</p>
          </div>
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}

export function StartupsPage() {
  const [, setLocation] = useLocation();
  const [filter, setFilter] = useState("All");
  const sectorTags: Record<string, string> = { "Services": "SERVICES", "Bio-tech": "BIO-TECH", "Ed-tech": "ED-TECH", "Cleantech": "CLEANTECH", "Game-tech": "GAME-TECH" };
  const shown = filter === "All" ? startups : startups.filter((startup) => startup[2] === sectorTags[filter]);
  return (
    <PublicPage>
      <PublicHeader active="/startups" />
      <main>
        <section className="directory-heading">
          <div>
            <p data-hero-kicker className="eyebrow">The portfolio</p>
            <h1 data-hero-title><span>Startups we've built with.</span></h1>
          </div>
          <p data-hero-copy>Every team below moved through HSL's idea-to-shipping process. Ten ventures, five sectors, one lab.</p>
        </section>
        <section className="directory-section section-paper">
          <div className="filter-set directory-filter" data-reveal>
            {["All", "Services", "Bio-tech", "Ed-tech", "Cleantech", "Game-tech"].map((label) => (
              <button className={filter === label ? "is-active" : ""} key={label} onClick={() => setFilter(label)}>{label}</button>
            ))}
          </div>
          {shown.length ? (
            <div className="directory-grid">
              {shown.map(([accent, name, tag, copy]) => (
                <article className="directory-card" key={name} data-reveal>
                  <div>
                    <span className={`accent-block accent-block--${accent}`}>{name[0]}</span>
                    <small>{tag}</small>
                  </div>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                  <button onClick={() => setLocation(`/startups/${name.toLowerCase().replace(/\s+/g, "-")}`)}>View startup <ArrowRight size={14} /></button>
                </article>
              ))}
            </div>
          ) : (
            <div className="interactive-empty" data-reveal>
              <Check size={18} />
              <strong>No {filter.toLowerCase()} startups in this public view yet.</strong>
              <p>Choose another sector to browse the current portfolio.</p>
            </div>
          )}
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}

export function StartupDetailPage() {
  const [params] = useLocation();
  const [, setLocation] = useLocation();
  const slug = params.split("/startups/")[1];
  const startup = startups.find(([, name]) => name.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!startup) {
    return (
      <PublicPage animationKey="missing">
        <PublicHeader active="/startups" />
        <main>
          <section className="directory-heading">
            <div>
              <p data-hero-kicker className="eyebrow">Startup not found</p>
              <h1 data-hero-title><span>We couldn't find that startup.</span></h1>
            </div>
            <p data-hero-copy>The startup you're looking for doesn't exist in our portfolio.</p>
            <button data-hero-actions className="button button--black" onClick={() => setLocation("/startups")}>
              Back to Startups <ArrowRight size={14} />
            </button>
          </section>
        </main>
        <PublicFooter />
      </PublicPage>
    );
  }

  const [accent, name, tag, copy] = startup;
  const sectorName = tag.replace(/-/g, " ");

  return (
    <PublicPage animationKey={slug}>
      <PublicHeader active="/startups" />
      <main>
        <section className="startup-detail-heading">
          <button className="back-link" onClick={() => setLocation("/startups")}>
            <ArrowLeft size={14} /> Back to Startups
          </button>
          <div className="startup-detail-title">
            <span className={`startup-logo startup-logo--${accent}`}>{name[0]}</span>
            <div>
              <h1 data-hero-title><span>{name}</span></h1>
              <p data-hero-kicker className="eyebrow">{sectorName} &nbsp;&nbsp; HSL Portfolio</p>
            </div>
          </div>
          <div className="startup-detail-summary">
            <p data-hero-copy>{copy}</p>
            <button
              data-hero-actions
              className="button button--black"
              onClick={() => toast(name, { description: "The company's public website link will open here once its production URL is added." })}
            >
              Visit website <ExternalLink size={13} />
            </button>
          </div>
        </section>
        <section className="startup-metrics" data-reveal>
          <div><span>Sector</span><strong>{sectorName}</strong></div>
          <div><span>Cohort</span><strong>HSL Portfolio</strong></div>
          <div><span>Team size</span><strong>4 members</strong></div>
          <div><span>Stage</span><strong>Pre-seed</strong></div>
        </section>
        <section className="startup-story section-paper">
          <article data-reveal>
            <p className="eyebrow">The problem</p>
            <h2>Service businesses across Nigeria run on manual scheduling, paper records, and disconnected chat threads.</h2>
          </article>
          <article data-reveal>
            <p className="eyebrow">The solution</p>
            <h2>InstaSync gives service businesses one place to schedule, message customers, and track jobs.</h2>
          </article>
        </section>
        <section className="startup-notes">
          <article data-reveal>
            <h3>Founding team</h3>
            <p>A cross-functional team of 4, drawn from HSL's Creators and Executors communities.</p>
            <div className="avatar-row">
              <span className={`avatar avatar--${accent}`} />
              <span className={`avatar avatar--${accent}`} />
              <span className={`avatar avatar--${accent}`} />
              <span className={`avatar avatar--${accent}`} />
            </div>
          </article>
          <article data-reveal>
            <h3>Journey through HSL</h3>
            <ul>
              {["Accepted into HSL cohort", "Completed ideation & product validation", "Shipped MVP during acceleration phase", "Preparing for pre-seed funding round"].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}

export function InvestorsPage() {
  const [, setLocation] = useLocation();
  const [sent, setSent] = useState(false);
  return (
    <PublicPage>
      <PublicHeader active="/investors" />
      <main>
        <section className="public-hero investor-hero">
          <p data-hero-kicker className="eyebrow eyebrow--pill">For investors & partners</p>
          <h1 data-hero-title><span>A vetted pipeline of investable founders.</span></h1>
          <p data-hero-copy>
            HSL runs a rigorous university-backed incubation process. Every
            founder in our portfolio has endured structured mentorship, product
            validation, and milestone review before they ever pitch.
          </p>
        </section>
        <section className="stats-band investor-stats">
          {[
            ["2016", "Founded at Covenant University"],
            ["2", "Cohorts run every year"],
            ["10", "Startups currently in portfolio"],
            ["12", "High-growth ventures targeted"],
          ].map(([number, label]) => (
            <div className="stat" key={number} data-reveal>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>
        <section className="investor-detail section-paper">
          <div data-reveal>
            <p className="eyebrow">Why HSL</p>
            <h2>Founders don't arrive here cold.</h2>
          </div>
          <div data-reveal>
            {[
              [
                "University-backed",
                "West Africa's first university-affiliated startup accelerator with structured academic and industry partnerships.",
              ],
              [
                "Full-stack talent pipeline",
                "Every startup draws from our four communities — no cold hiring and no outsourcing.",
              ],
              [
                "A repeatable process",
                "Every founder moves through Ideation, Product Development, Acceleration, and Shipping.",
              ],
              [
                "A real track record",
                "10 active ventures in the current portfolio; alumni include PiggyVest, Kora Pay, Thrive Agric, Softcom, and Level Up.",
              ],
            ].map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <SponsorsMarquee
          eyebrow="Our Global Sponsors & Co-Investors"
          title="Institutional backers & global partners."
        />
        <section className="deck-request">
          <div data-reveal>
            <p className="eyebrow eyebrow--light">The investor deck</p>
            <h2>Get the full deck in your inbox.</h2>
            <p>
              Tell us a bit about you and we'll send the current HSL investor
              deck to your email — no surprise downloads.
            </p>
          </div>
          {sent ? (
            <div className="deck-success">
              <Check size={22} />
              <h3>Request received.</h3>
              <p>We'll respond with the current deck shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label>
                Full name
                <input required placeholder="Ada Lovelace" />
              </label>
              <label>
                Work email
                <input required type="email" placeholder="ada@fund.com" />
              </label>
              <label>
                Organization / fund
                <input required placeholder="Anchor Ventures" />
              </label>
              <button className="button button--white" type="submit">
                Send me the deck <ArrowRight size={14} />
              </button>
              <button
                className="text-link"
                type="button"
                onClick={() => setLocation("/contact")}
              >
                I'd rather talk first
              </button>
            </form>
          )}
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PublicPage>
      <PublicHeader active="/contact" />
      <main>
        <section className="contact-heading">
          <p data-hero-kicker className="eyebrow">Contact HSL</p>
          <h1 data-hero-title><span>Let's talk.</span></h1>
          <p data-hero-copy>Whether you are building, investing, partnering, or just need a thoughtful answer — write to us.</p>
        </section>
        <section className="contact-section section-paper">
          <form className="contact-form" data-reveal onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <div className="form-row">
              <label>Full name<input required placeholder="Your name" /></label>
              <label>Email address<input type="email" required placeholder="you@email.com" /></label>
            </div>
            <label>What are you reaching out about?
              <select required defaultValue="">
                <option value="" disabled>Choose a topic</option>
                <option>Joining the next cohort</option>
                <option>Investment or partnership</option>
                <option>Media or speaking</option>
                <option>Something else</option>
              </select>
            </label>
            <label>Tell us more<textarea required rows={6} placeholder="A few useful details go a long way." /></label>
            <button className="button button--black" type="submit">Send message <ArrowRight size={14} /></button>
            {sent && <p className="form-success"><Check size={13} /> Message received — we'll be in touch.</p>}
          </form>
          <aside className="contact-aside" data-reveal>
            <div>
              <p className="eyebrow">Visit</p>
              <h3>HSL Hub, Covenant University</h3>
              <p>Ota, Ogun State, Nigeria</p>
            </div>
            <div>
              <p className="eyebrow">Write</p>
              <a href="mailto:hello@hebronstartuplab.com">hello@hebronstartuplab.com</a>
            </div>
            <div>
              <p className="eyebrow">Follow</p>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://x.com" target="_blank" rel="noreferrer">X / Twitter</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </aside>
        </section>
      </main>
      <PublicFooter />
    </PublicPage>
  );
}