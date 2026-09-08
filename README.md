# Rohit Varma - Creative Developer Portfolio

Personal portfolio for Rohit Varma, positioned around creative development, WordPress systems, AI-powered workflows, motion, and expressive web experiences.

Live site: [rohitvarma.vercel.app](https://rohitvarma.vercel.app)  
Repository: [github.com/rohitash4/Portfolio](https://github.com/rohitash4/Portfolio)

## Stack

- React 19
- Vite 8
- GSAP for page and component animation
- Lenis for smooth scrolling
- OGL for the Aurora WebGL effect
- Canvas-based wave field
- CSS gradients, grid overlays, custom cursor, and responsive layouts

Three.js and React Three Fiber remain available in the dependency set for future 3D work. The original orb experiment is retained at `src/three/Orb.jsx`, but it is not currently mounted on the homepage.

## Project structure

```text
src/
  App.jsx                         Homepage composition and interactions
  main.jsx                        React entry point
  data/portfolio.js               Resume-driven portfolio content
  components/
    Aurora.jsx                    WebGL Aurora background
    WaveField.jsx                 Canvas wave animation
    CustomCursor.jsx              Desktop cursor interaction
    CreativeStudioPage.jsx        AI Product Creative Studio case study
  styles/global.css               Global visual system and responsive CSS
  three/Orb.jsx                   Unmounted 3D orb experiment
```

## Routes

The project uses simple path detection instead of a router:

- `/` - Main portfolio homepage
- `/work/ai-product-creative-studio` - Dedicated AI Product Creative Studio case study

When adding a new page, update the path selection in `src/App.jsx` and add any page-specific styles to `src/styles/global.css`.

## Local development

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

The Vite development server will print the local URL, normally `http://localhost:5173`.

## Production validation

```bash
npm run build
npm run preview
```

Only use scripts already defined in `package.json`. There is currently no separate test or lint script.

## Content and contact details

Update personal information, experience, skills, projects, email, phone, and LinkedIn in:

```text
src/data/portfolio.js
```

The navigation "Let's talk" button uses the phone number from `portfolio.phone` and creates a `tel:` link. The contact section uses the email and LinkedIn values from the same data object.

## Design and behavior notes

- The visual language uses a dark background with lime accents.
- The homepage includes GSAP reveal animations, smooth scrolling, WebGL Aurora, a canvas wave field, custom cursor behavior, interactive project previews, and animated Core Web Vitals metrics.
- Reduced-motion preferences are handled in the stylesheet and animation logic.
- The homepage showcase and case study are responsive at desktop, tablet, and mobile breakpoints.
- Keep the contact-card LinkedIn hover text dark because the card background is lime.
- Avoid introducing broad global hover changes without checking the lime contact card and mobile layouts.

## Guidance for future AI agents

1. Read `src/data/portfolio.js` before changing resume or project content.
2. Read the relevant JSX component and the matching selectors in `src/styles/global.css` before changing layout.
3. Preserve the existing path-based routing unless a real router is intentionally introduced.
4. Prefer small, component-scoped CSS changes because `global.css` contains the complete visual system.
5. Check desktop and mobile behavior after responsive changes.
6. Run `npm run build` before considering a code change complete.
7. Do not commit secrets, generated `dist/`, or `node_modules/`.

## Deployment

The site is deployed on Vercel and connected to the `main` branch. Pushing a validated commit to `main` triggers the production deployment.
