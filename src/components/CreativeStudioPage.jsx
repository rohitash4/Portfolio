import { useEffect } from 'react';
import gsap from 'gsap';
import { portfolio } from '../data/portfolio';

const Arrow = () => <span className="arrow">↗</span>;

function CreativeStudioPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const context = gsap.context(() => {
      gsap.from('.case-study-hero > *, .case-study-meta, .case-study-section', {
        y: 28,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
    });
    return () => context.revert();
  }, []);

  return (
    <main className="case-study-page">
      <nav className="case-study-nav">
        <a className="brand" href="/">RV<span>.</span></a>
        <a className="text-link" href="/">Back to portfolio <Arrow /></a>
      </nav>
      <section className="case-study-hero">
        <p className="eyebrow">03 / Case study / Savit Interactive</p>
        <h1>AI Product<br /><em>Creative Studio.</em></h1>
        <p className="case-study-lede">A local-first platform that turns one product image into structured product intelligence and ready-to-use marketing creatives.</p>
        <div className="case-study-meta">
          <span><b>Role</b>Product + front-end developer</span>
          <span><b>Stack</b>React · FastAPI · Gemini · Google Cloud Vision</span>
          <span><b>Focus</b>AI workflow · Prompt engineering · Creative automation</span>
        </div>
      </section>
      <section className="case-study-visual" aria-label="AI creative studio workflow">
        <div className="studio-window">
          <div className="studio-window-top"><span /><span /><span /><b>creative-studio / workspace</b></div>
          <div className="studio-window-body">
            <div className="studio-sidebar"><i>01</i><i>02</i><i>03</i></div>
            <div className="studio-content">
              <span className="eyebrow">Product intelligence</span>
              <strong>Upload. Understand. Create.</strong>
              <div className="studio-flow"><div>Product<br /><em>image</em></div><span>→</span><div>AI<br /><em>analysis</em></div><span>→</span><div>Ad<br /><em>creative</em></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="case-study-grid">
        <div className="case-study-section"><p className="eyebrow">The idea</p><h2>From product data to campaign-ready output.</h2></div>
        <div className="case-study-section"><p className="muted">The studio reduces the distance between a product photograph and a useful marketing concept. It analyzes what is visibly true about the product, builds a structured creative brief, and generates multiple formats for real campaign workflows.</p><p className="muted">The uploaded product remains the visual anchor, while provider-agnostic services keep the system flexible across vision, language, image generation, and quality evaluation models.</p></div>
      </section>
      <section className="case-study-capabilities case-study-section">
        <p className="eyebrow">The workflow</p>
        <div className="capability-grid">
          {[
            ['01', 'Product intake', 'Upload JPEG, PNG, or WebP product images with validation and local session handling.'],
            ['02', 'Visual intelligence', 'Combine Google Cloud Vision evidence with Gemini reasoning to extract product attributes.'],
            ['03', 'Creative generation', 'Turn the product brief into square, landscape, portrait, and social-ready creative outputs.'],
            ['04', 'Human review', 'Keep the process assistive so generated claims and visuals can be reviewed before publishing.'],
          ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="case-study-footer">
        <p className="eyebrow">Built by Rohit Varma</p>
        <h2>Good tools make<br /><em>better momentum.</em></h2>
        <div><a className="button button-primary" href="https://github.com/rohitash4/AI-Product-Creative-Studio" target="_blank" rel="noreferrer">View repository <Arrow /></a><a className="text-link" href="/">Back to selected work <Arrow /></a></div>
      </section>
      <footer><span>© 2026 Rohit Varma</span><span>AI Product Creative Studio</span></footer>
    </main>
  );
}

export default CreativeStudioPage;
