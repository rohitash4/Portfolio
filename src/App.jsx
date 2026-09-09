import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Aurora from './components/Aurora';
import CustomCursor from './components/CustomCursor';
import WaveField from './components/WaveField';
import CreativeStudioPage from './components/CreativeStudioPage';
import { portfolio } from './data/portfolio';

gsap.registerPlugin(ScrollTrigger);
const Arrow = () => <span className="arrow">↗</span>;

function VitalsPanel() {
  const panelRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return undefined;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) {
      // Use requestAnimationFrame to avoid synchronous setState in effect
      const frame = requestAnimationFrame(() => setScore(95));
      return () => cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const duration = 900;
    let frame;
    const animateScore = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setScore(Math.round(easedProgress * 95));
      if (progress < 1) frame = requestAnimationFrame(animateScore);
    };
    frame = requestAnimationFrame(animateScore);
    return () => cancelAnimationFrame(frame);
  }, [hasEntered]);

  return (
    <div
      ref={panelRef}
      className={`vitals-panel ${hasEntered ? 'is-visible' : ''}`}
    >
      <span className="vitals-kicker">Field data / mobile</span>
      <div className="vitals-score">
        <strong>{score}</strong>
        <span>
          PageSpeed
          <br />
          score
        </span>
      </div>
      <div className="vitals-bars">
        <div>
          <span>LCP</span>
          <b>
            <i style={{ width: '88%' }} />
          </b>
          <em>1.8 s</em>
        </div>
        <div>
          <span>INP</span>
          <b>
            <i style={{ width: '94%' }} />
          </b>
          <em>120 ms</em>
        </div>
        <div>
          <span>CLS</span>
          <b>
            <i style={{ width: '97%' }} />
          </b>
          <em>0.02</em>
        </div>
      </div>
      <div className="audit-metrics" aria-label="Lighthouse audit scores">
        {[
          [95, 'Performance', 'excellent', '95'],
          [94, 'Accessibility', 'excellent', '94'],
          [92, 'Best Practices', 'excellent', '92'],
          [95, 'SEO', 'excellent', '95'],
          [100, 'Agentic Browsing', 'excellent', '4/4'],
        ].map(([value, label, tone, displayValue]) => (
          <div className={`audit-metric audit-metric-${tone}`} key={label}>
            <div className="audit-ring">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <circle className="audit-ring-track" cx="20" cy="20" r="15" />
                <circle
                  className="audit-ring-progress"
                  cx="20"
                  cy="20"
                  r="15"
                  style={{ '--score-offset': 94.25 * (1 - value / 100) }}
                />
              </svg>
              <strong>{displayValue}</strong>
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioHome() {
  const appRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title > *, .hero-copy, .hero-actions', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2,
      });
      gsap.utils
        .toArray('.reveal')
        .forEach((element) =>
          gsap.from(element, {
            scrollTrigger: { trigger: element, start: 'top 84%' },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          })
        );
      gsap.utils
        .toArray('.line-fill')
        .forEach((line) =>
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left',
              duration: 1.2,
              scrollTrigger: { trigger: line, start: 'top 86%' },
            }
          )
        );
    }, appRef);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ctx.revert();
    };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main ref={appRef}>
      <CustomCursor />
      <div className="noise" />
      <nav className="nav">
        <a className="brand" href="#top">
          RV<span>.</span>
        </a>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['about', 'work', 'experience', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
        </div>
        <a
          className="nav-cta"
          href={`tel:${portfolio.phone.replace(/\D/g, '')}`}
        >
          Let&apos;s talk <Arrow />
        </a>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </nav>
      <section className="hero" id="top">
        <div className="hero-aurora">
          <Aurora />
        </div>
        <WaveField />
        <div className="hero-grid" />
        <div className="hero-content">
          <p className="eyebrow hero-kicker">
            <span className="status-dot" /> Creative Developer · WordPress + AI
          </p>
          <h1 className="hero-title">
            <span>Creative code</span>
            <span>
              for the <span className="accent">modern web.</span>
            </span>
          </h1>
          <p className="hero-copy">{portfolio.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              Explore work <Arrow />
            </a>
            <a
              className="text-link"
              href={portfolio.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-footer">
          <span>Scroll to explore</span>
          <span className="scroll-line" />
          <span>01 — 06</span>
        </div>
      </section>
      <section className="stats section-pad reveal">
        {portfolio.highlights.map(([value, label]) => (
          <div className="stat" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>
      <section className="about section-pad" id="about">
        <div className="section-label reveal">
          <span>01</span>
          <span className="line-fill" />
          <span>Profile</span>
        </div>
        <div className="about-layout">
          <h2 className="display reveal">
            I make the web
            <br />
            <em>feel alive.</em>
          </h2>
          <div className="about-text reveal">
            <p>
              As a creative developer and team lead, I bring visual thinking,
              motion, and technical structure together to build digital
              experiences that work beautifully at scale.
            </p>
            <p>
              From custom WordPress systems to AI-powered creative workflows, I
              care about the details that make products feel clear, useful, and
              memorable.
            </p>
            <a className="text-link" href={`mailto:${portfolio.email}`}>
              Start a conversation <Arrow />
            </a>
          </div>
        </div>
      </section>
      <section className="skills section-pad">
        <div className="section-label reveal">
          <span>02</span>
          <span className="line-fill" />
          <span>Expertise</span>
        </div>
        <div className="skills-grid">
          {Object.entries(portfolio.skills).map(([group, items], index) => (
            <div className="skill-group reveal" key={group}>
              <div className="skill-topline">
                <span className="skill-index">0{index + 1}</span>
              </div>
              <h3>{group}</h3>
              <div className="skill-list">
                {items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="work section-pad" id="work">
        <div className="section-label reveal">
          <span>03</span>
          <span className="line-fill" />
          <span>Selected work</span>
        </div>
        <div className="work-heading">
          <h2 className="display reveal">
            Built with feeling<span className="accent">.</span>
          </h2>
          <p className="muted reveal">
            Systems, interfaces, and AI workflows shaped with equal parts
            clarity and imagination.
          </p>
        </div>
        <div className="project-showcase">
          <div className="project-list">
            {portfolio.projects.map((project, index) => (
              <button
                className={`project-card reveal ${selectedProject === index ? 'selected' : ''}`}
                key={project.number}
                onClick={() => setSelectedProject(index)}
              >
                <span className="project-no">{project.number}</span>
                <span className="project-main">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                  <span className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
                <Arrow />
              </button>
            ))}
          </div>
          <div
            className={`project-preview project-preview-${selectedProject + 1}`}
            aria-live="polite"
          >
            {selectedProject === 1 ? (
              <VitalsPanel />
            ) : (
              <div className="preview-image-wrap">
                <img src={portfolio.projects[selectedProject].image} alt="" />
                <span className="preview-image-shade" />
              </div>
            )}
            <span className="preview-label">
              Case study / 0{selectedProject + 1}
            </span>
            <div className="preview-copy">
              <span>Selected focus</span>
              <strong>{portfolio.projects[selectedProject].title}</strong>
              <small>{portfolio.projects[selectedProject].metric}</small>
              {selectedProject === 2 && (
                <a
                  className="preview-link"
                  href="/work/ai-product-creative-studio"
                >
                  Open full case study <Arrow />
                </a>
              )}
            </div>
            <span className="preview-corner">↗</span>
          </div>
        </div>
      </section>
      <section className="experience section-pad" id="experience">
        <div className="section-label reveal">
          <span>04</span>
          <span className="line-fill" />
          <span>Experience</span>
        </div>
        <div className="experience-list">
          {portfolio.experience.map((job) => (
            <article className="job reveal" key={job.company}>
              <div className="job-meta">
                <span>{job.period}</span>
                <span>{job.company}</span>
              </div>
              <div>
                <h3>{job.title}</h3>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="education section-pad">
        <div className="section-label reveal">
          <span>05</span>
          <span className="line-fill" />
          <span>Beyond the browser</span>
        </div>
        <div className="education-grid">
          <div className="reveal">
            <p className="eyebrow">Education</p>
            <h2 className="display">
              B.Sc. in
              <br />
              <em>Information Technology.</em>
            </h2>
            <p className="muted">2021 · CGPA 8.4 / 10</p>
          </div>
          <div className="award reveal">
            <p className="eyebrow">Recognition</p>
            <h3>Project Manager of the Quarter</h3>
            <p className="muted">Savit Interactive · Q2 2026</p>
            <p className="award-copy">
              Recognized for exceptional leadership, cross-functional
              collaboration, and solving critical production bottlenecks.
            </p>
          </div>
        </div>
      </section>
      <section className="contact section-pad" id="contact">
        <div className="contact-card reveal">
          <p className="eyebrow">06 · Contact</p>
          <h2 className="display">
            Let&apos;s build
            <br />
            <em>what&apos;s next.</em>
          </h2>
          <a className="contact-email" href={`mailto:${portfolio.email}`}>
            {portfolio.email} <Arrow />
          </a>
          <div className="contact-bottom">
            <span>{portfolio.location}</span>
            <a href={portfolio.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow />
            </a>
          </div>
        </div>
      </section>
      <footer>
        <span>© 2026 Rohit Varma</span>
        <span>Creative Developer</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}

function App() {
  return window.location.pathname === '/work/ai-product-creative-studio' ? (
    <CreativeStudioPage />
  ) : (
    <PortfolioHome />
  );
}

export default App;
