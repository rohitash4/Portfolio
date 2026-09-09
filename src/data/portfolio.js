export const portfolio = {
  name: 'Rohit Varma',
  role: 'Creative Developer',
  location: 'Mumbai, India',
  email: 'rohit123209@gmail.com',
  phone: '+91 9820300377',
  linkedin: 'https://linkedin.com/in/rohit-varma-designer',
  summary:
    'I design and build expressive digital experiences across WordPress, interactive front-end, and AI-powered creative tools.',
  highlights: [
    ['130+', 'production websites managed'],
    ['25+', 'custom sites delivered'],
    ['95+', 'mobile PageSpeed scores'],
    ['4+', 'years of experience'],
  ],
  skills: {
    'Core stack': ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'SQL'],
    WordPress: [
      'ACF',
      'Gravity Forms',
      'Elementor',
      'Gutenberg',
      'Divi',
      'WPBakery',
      'Oxygen Builder',
    ],
    'Front-end': ['React', 'Tailwind', 'Bootstrap', 'jQuery'],
    'Performance & ops': [
      'Core Web Vitals',
      'Cloudflare',
      'WP Engine',
      'DNS / SSL',
      'Deployment',
    ],
    'AI & prompt engineering': [
      'ChatGPT',
      'Claude',
      'Gemini',
      'Cursor',
      'GitHub Copilot',
      'Prompt Engineering',
    ],
    'Design & prototyping': ['Figma', 'Adobe XD', 'Responsive UI'],
  },
  experience: [
    {
      period: 'Jul 2025 — Present',
      company: 'Savit Interactive',
      title: 'Senior WordPress Developer · Team Lead',
      points: [
        'Lead a team of developers and coordinate technical execution with Project Managers.',
        'Architect and maintain a portfolio of 130+ production websites with proactive performance improvements.',
        'Build custom PHP solutions and integrations using Gravity Forms, REST APIs, and Webhooks.',
        'Own migrations, DNS, SSL, hosting configuration, and critical production incident response.',
        'Built an AI Product Creative Studio for internal use, combining React, FastAPI, Gemini, Google Cloud Vision, and prompt engineering to turn product images into marketing creatives.',
      ],
    },
    {
      period: 'Nov 2021 — Jun 2025',
      company: 'Amplispot Technologies',
      title: 'WordPress Developer & Technical SEO Specialist',
      points: [
        'Developed responsive, high-performance sites using WordPress, custom PHP, JavaScript, HTML5, and CSS3.',
        'Delivered accessible, mobile-first front-end experiences across browsers and devices.',
        'Led Core Web Vitals, Lighthouse, technical SEO, analytics, and site health initiatives.',
        'Managed migrations, maintenance, and 24/7 production support for a fast-moving startup.',
      ],
    },
  ],
  projects: [
    {
      number: '01',
      title: 'ACF Content Platform',
      description:
        'Scalable, custom-coded WordPress systems using ACF and custom post types for complex data and high-traffic environments.',
      tags: ['WordPress', 'PHP', 'ACF'],
      metric: 'Custom filters + structured content',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    },
    {
      number: '02',
      title: 'Performance Engineering',
      description:
        'Deep-dive performance audits across a 130+ site portfolio, from caching and CDN routing to database query optimization.',
      tags: ['Core Web Vitals', 'Cloudflare', 'Lighthouse'],
      metric: '95+ mobile PageSpeed score',
      image: null,
    },
    {
      number: '03',
      title: 'AI Creative Studio',
      description:
        'A local-first AI product intelligence and creative generation platform built for Savit Interactive.',
      tags: ['React', 'FastAPI', 'Gemini', 'Prompt engineering'],
      metric: 'Product image → marketing creative',
      image:
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      slug: 'ai-product-creative-studio',
    },
  ],
};
