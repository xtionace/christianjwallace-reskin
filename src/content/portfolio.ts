import type { PageDoc, Portfolio, ProjectClosing, ProjectContent } from '@/content/types'

/** Magic Patterns CDN plates already used by template E. Do not replace with stock photos. */
export const BIOBUILD_HERO =
  'https://cdn.magicpatterns.com/patterns/generated-images/91d926ab-06a2-405d-9115-4b495862080d.jpg'
export const BIOBUILD_MATERIALS =
  'https://cdn.magicpatterns.com/patterns/generated-images/e4dba941-30ad-4bc6-9601-dc4fd970e13a.jpg'
export const BIOBUILD_DETAIL =
  'https://cdn.magicpatterns.com/patterns/generated-images/9952b557-9389-4ff9-bda0-9a072be3b05d.jpg'

const emptyClosing: ProjectClosing = {
  eyebrow: '',
  title: '',
  accent: '',
  body: '',
  primaryLabel: '',
  primaryHref: '',
  secondaryLabel: '',
  secondaryHref: '',
}

const bookClosing = (
  eyebrow: string,
  title: string,
  accent: string,
  body: string,
  secondaryLabel = '',
): ProjectClosing => ({
  eyebrow,
  title,
  accent,
  body,
  primaryLabel: 'Book a call',
  primaryHref: '/contact#book',
  secondaryLabel,
  secondaryHref: secondaryLabel ? '/contact' : '',
})

const corporatePlates: ProjectContent['plates'] = [
  { label: 'Plate 01 — Hero', aspect: 'wide' },
  { label: 'Plate 02 — Detail', aspect: 'landscape' },
  { label: 'Plate 03 — Detail', aspect: 'landscape' },
  { label: 'Plate 04 — Mobile', aspect: 'portrait' },
  { label: 'Plate 05 — Mobile', aspect: 'portrait' },
]

const pendingSections: ProjectContent['sections'] = [
  { anchor: 'problem', eyebrow: '01 — Problem', title: 'Pending clearance', body: '' },
  { anchor: 'approach', eyebrow: '02 — Approach', title: 'Pending clearance', body: '' },
  { anchor: 'result', eyebrow: '03 — Result', title: 'Pending clearance', body: '' },
]

const ndaNote =
  'This page lists the role only. No product details, metrics, or visuals are shown until they are cleared for public use.'

function reserved(index: string): ProjectContent {
  return {
    index,
    title: 'Reserved',
    client: 'Next build',
    status: 'reserved',
    kind: 'reserved',
    caseSlug: '',
    summary: 'Website — case study TBD.',
    tags: ['Open slot'],
    href: '/contact',
    imageUrl: '',
    imageAlt: '',
    liveUrl: '',
    liveLabel: '',
    showOnRail: index === '06',
    railOrder: index === '06' ? 3 : 0,
    role: '',
    year: '',
    dates: '',
    location: '',
    stack: [],
    accent: 'gold',
    log: [],
    sections: [],
    highlights: [],
    facts: [],
    gallery: [],
    plates: [],
    nextHref: '',
    nextIndex: '',
    nextTitle: '',
    ndaNote: '',
    closing: emptyClosing,
  }
}

const biobuild: ProjectContent = {
  index: '01',
  title: 'BioBuild Systems',
  client: 'biobuildsystems.com',
  status: 'filled',
  kind: 'case',
  caseSlug: 'biobuild',
  summary:
    'Natural Building · Philippine-Made. A site for bamboo, ecocrete, and rice-husk block construction out of San Carlos City.',
  tags: ['Founder', 'Brand', 'Web design', 'Frontend'],
  href: '/work/biobuild',
  imageUrl: BIOBUILD_HERO,
  imageAlt: 'Bamboo-framed house with rice-husk block walls set in green Philippine hills at dusk',
  liveUrl: 'https://biobuildsystems.com',
  liveLabel: 'biobuildsystems.com',
  showOnRail: true,
  railOrder: 0,
  role: 'Founder · Design & build',
  year: '2025 — Present',
  dates: '',
  location: 'San Carlos City, Philippines',
  stack: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive', 'Content design'],
  accent: 'moss',
  log: [
    { stamp: 'LOG 01', label: 'Materials & audience' },
    { stamp: 'LOG 02', label: 'Information architecture' },
    { stamp: 'LOG 03', label: 'Visual system' },
    { stamp: 'LOG 04', label: 'Build & launch' },
  ],
  sections: [
    {
      anchor: 'problem',
      eyebrow: '01 — Problem',
      title: 'Unfamiliar materials need a familiar, trustworthy front door.',
      body: 'BioBuild Systems builds with bamboo, ecocrete, and rice-husk blocks — materials most buyers have never specified. The site had to explain them plainly, without sounding like a brochure or a science paper.\n\nIt also had to make one thing unmistakable: this is Philippine-made, produced in San Carlos City, by a real team.',
    },
    {
      anchor: 'approach',
      eyebrow: '02 — Approach',
      title: 'Materials first. Plain language. Earth-toned restraint.',
      body: 'The structure leads with the materials themselves — each one gets its own explainer: what it is, how it performs, where it fits.\n\nA warm, earthy palette and generous photography let the buildings carry the story. Layouts are mobile-first so the site reads cleanly on the phones most visitors arrive on.',
    },
    {
      anchor: 'result',
      eyebrow: '03 — Result',
      title: 'A live site that positions natural building as a credible choice.',
      body: 'The site is live at biobuildsystems.com. It frames the company under a clear line — Natural Building · Philippine-Made — and gives bamboo, ecocrete, and rice-husk blocks each a dedicated place.\n\nVisitors have a direct path from learning about a material to starting an inquiry.',
    },
  ],
  highlights: [
    { title: 'Materials-first IA', body: 'Each material earns its own page and explainer.' },
    { title: 'Plain language', body: 'Performance and fit, without jargon.' },
    { title: 'Mobile-first', body: 'Built for the phones most visitors arrive on.' },
  ],
  facts: [
    'Live at biobuildsystems.com',
    'Positioning: Natural Building · Philippine-Made',
    'Dedicated explainers for bamboo, ecocrete, and rice-husk blocks',
    'Based in San Carlos City, Philippines',
    'Mobile-first, responsive layouts',
    'Direct inquiry path from every material page',
  ],
  gallery: [
    {
      url: BIOBUILD_HERO,
      alt: 'Bamboo-framed house with rice-husk block walls set in green Philippine hills at dusk',
      caption: 'Plate 01 — Visual direction',
      placement: 'hero',
    },
    {
      url: BIOBUILD_MATERIALS,
      alt: 'Bamboo poles, ecocrete bricks, and rice-husk blocks on a dark surface',
      caption: 'Bamboo · Ecocrete · Rice-husk blocks',
      placement: 'problem',
    },
    {
      url: BIOBUILD_DETAIL,
      alt: 'Detail of lashed bamboo beams meeting a rice-husk block wall',
      caption: '',
      placement: 'approach',
    },
  ],
  plates: [],
  nextHref: '/work/att',
  nextIndex: '02',
  nextTitle: 'AT&T — Case study TBD',
  ndaNote: '',
  closing: bookClosing(
    'End of case',
    'Building something',
    'with a story to tell?',
    'Start a project or book a short call — I’ll help shape it from first form to launch.',
    'Start a project',
  ),
}

const attPrimary: ProjectContent = {
  index: '02',
  title: 'AT&T',
  client: 'Case study TBD',
  status: 'tbd',
  kind: 'corporate',
  caseSlug: 'att',
  summary: 'Enterprise frontend work. Details and screenshots pending clearance.',
  tags: ['Principal SWE', 'NDA'],
  href: '/work/att',
  imageUrl: '',
  imageAlt: '',
  liveUrl: '',
  liveLabel: '',
  showOnRail: true,
  railOrder: 1,
  role: 'Principal Software Engineer',
  year: '',
  dates: 'Sep 2023 — Present',
  location: '',
  stack: [],
  accent: 'crimson',
  log: [],
  sections: pendingSections,
  highlights: [],
  facts: [],
  gallery: [],
  plates: corporatePlates,
  nextHref: '',
  nextIndex: '',
  nextTitle: '',
  ndaNote,
  closing: bookClosing(
    'End of case',
    'Need enterprise rigor',
    'on your next site?',
    'Start a project or book a short call to talk through scope.',
    'Start a project',
  ),
}

const attSecondary: ProjectContent = {
  ...reserved('03'),
  title: 'AT&T',
  client: 'Case study TBD',
  status: 'tbd',
  kind: 'corporate',
  caseSlug: 'att',
  summary: 'Second AT&T slot. Details and screenshots pending clearance.',
  tags: ['Principal SWE', 'NDA'],
  href: '/work/att',
  showOnRail: false,
  railOrder: 0,
  accent: 'crimson',
}

const tmobilePrimary: ProjectContent = {
  index: '04',
  title: 'T-Mobile',
  client: 'Case study TBD',
  status: 'tbd',
  kind: 'corporate',
  caseSlug: 't-mobile',
  summary: 'Consumer-facing frontend work. Details and screenshots pending clearance.',
  tags: ['FED IV', 'NDA'],
  href: '/work/t-mobile',
  imageUrl: '',
  imageAlt: '',
  liveUrl: '',
  liveLabel: '',
  showOnRail: true,
  railOrder: 2,
  role: 'Front-End Developer IV',
  year: '',
  dates: 'Dates on request',
  location: '',
  stack: [],
  accent: 'crimson',
  log: [],
  sections: pendingSections,
  highlights: [],
  facts: [],
  gallery: [],
  plates: corporatePlates,
  nextHref: '',
  nextIndex: '',
  nextTitle: '',
  ndaNote,
  closing: bookClosing(
    'End of case',
    'Need enterprise rigor',
    'on your next site?',
    'Start a project or book a short call to talk through scope.',
    'Start a project',
  ),
}

const tmobileSecondary: ProjectContent = {
  ...reserved('05'),
  title: 'T-Mobile',
  client: 'Case study TBD',
  status: 'tbd',
  kind: 'corporate',
  caseSlug: 't-mobile',
  summary: 'Second T-Mobile slot. Details and screenshots pending clearance.',
  tags: ['FED IV', 'NDA'],
  href: '/work/t-mobile',
  showOnRail: false,
  accent: 'crimson',
}

const home: PageDoc = {
  slug: 'home',
  title: 'Home',
  blocks: [
    { key: 'hero-eyebrow', label: 'Christian Wallace — Web design & frontend craft' },
    { key: 'hero-line-1', title: 'Sites that move' },
    { key: 'hero-line-2', title: 'with', kicker: 'purpose', meta: '—' },
    { key: 'hero-line-3', title: 'like a practiced form.' },
    {
      key: 'hero-body',
      body: 'I design and build websites with the discipline of an enterprise engineer and the care of a craftsperson — fast, accessible, and composed down to the last interaction.',
    },
    { key: 'hero-primary', title: 'Book a call', href: '/contact#book' },
    { key: 'hero-secondary', title: 'See the work', href: '/work' },
    { key: 'hero-status', title: 'Open to select projects' },
    { key: 'session-01', label: 'NOW', title: 'Principal SWE, AT&T' },
    { key: 'session-02', label: 'BUILDING', title: 'BioBuild Systems' },
    { key: 'session-03', label: 'BASED', title: 'Lynnwood / Seattle' },
    { key: 'session-04', label: 'FOCUS', title: 'Web design · Frontend' },
    {
      key: 'selected',
      label: 'Selected work',
      title: 'One live build.',
      kicker: 'More in clearance.',
      body: 'Scroll the rail. BioBuild is fully documented; enterprise work is held until screenshots clear NDA review.',
      href: '/work',
      meta: 'All 12 slots',
    },
    {
      key: 'process',
      label: 'Process',
      title: 'Five forms.',
      kicker: 'Practiced every project.',
      body: 'Like a martial form, the process is the same sequence every time — and gets sharper with every repetition.',
    },
    {
      key: 'form-01',
      label: '01',
      title: 'Stance',
      kicker: 'Discover',
      body: 'Listen first. Audit what exists, name the audience, and agree on what the site must do.',
    },
    {
      key: 'form-02',
      label: '02',
      title: 'Footwork',
      kicker: 'Structure',
      body: 'Map the content and flows. Information architecture before pixels — every page earns its place.',
    },
    {
      key: 'form-03',
      label: '03',
      title: 'Strike',
      kicker: 'Design',
      body: 'A focused visual system — type, color, motion — prototyped in the browser, not just in mockups.',
    },
    {
      key: 'form-04',
      label: '04',
      title: 'Flow',
      kicker: 'Build',
      body: 'Production frontend with accessibility, performance, and responsive behavior built in from the start.',
    },
    {
      key: 'form-05',
      label: '05',
      title: 'Return',
      kicker: 'Launch & refine',
      body: 'Ship, watch how people use it, and tune. A practiced form keeps improving with repetition.',
    },
    {
      key: 'closing',
      label: 'Next form',
      title: 'Have a site that needs to',
      kicker: 'move with purpose?',
      body: 'Tell me what you are building. A short intro call is the fastest way to see if we are a fit.',
      href: '/contact#book',
      meta: 'Book a call',
    },
  ],
}

const work: PageDoc = {
  slug: 'work',
  title: 'Work',
  eyebrow: 'Work index · 12 slots',
  headline: 'The work,',
  headlineAccent: 'slot by slot.',
  lede: 'One filled case study, four enterprise slots awaiting clearance, and seven reserved for what comes next.',
  blocks: [
    { key: 'filter-all', label: 'All' },
    { key: 'filter-filled', label: 'Case studies' },
    { key: 'filter-tbd', label: 'Pending clearance' },
    { key: 'filter-reserved', label: 'Reserved' },
    {
      key: 'closing',
      label: 'Open slot',
      title: 'Want to fill slot',
      kicker: '06?',
      body: 'Reserved slots are for the next builds. If yours is one of them, let’s talk.',
      href: '/contact#book',
      meta: 'Book a call',
    },
    { key: 'closing-secondary', title: 'Start a project', href: '/contact' },
  ],
}

const about: PageDoc = {
  slug: 'about',
  title: 'About',
  eyebrow: 'About',
  headline: 'Enterprise discipline.',
  headlineAccent: 'Craftsperson’s care.',
  lede: 'I’m Christian Wallace — a frontend engineer and web designer in the Lynnwood / Seattle area. I’ve spent my career building interfaces at large companies, and I bring that rigor to independent websites built with intent.',
  blocks: [
    {
      key: 'currently',
      label: 'Currently',
      title: 'Principal Software Engineer',
      meta: 'AT&T · Sep 2023 — Present',
      kicker: 'Founder, BioBuild Systems',
    },
    {
      key: 'lineage',
      label: 'Lineage',
      title: 'Where the form was',
      kicker: 'practiced.',
      body: 'Employers listed for lineage only — these are not website case studies.',
    },
    {
      key: 'exp-01',
      title: 'AT&T',
      label: 'Principal Software Engineer',
      meta: 'Sep 2023 — Present',
      body: 'Current role in Bothell, WA. Principal-level frontend on production React, Angular, and Nx.',
    },
    {
      key: 'exp-02',
      title: 'T-Mobile',
      label: 'Front End Developer IV',
      meta: '2020 — Present (May 2022 résumé)',
      body: 'Bellevue, WA. Foundational design system used by T-Mobile and Metro lines of business.',
    },
    {
      key: 'exp-03',
      title: 'Winshuttle',
      label: 'Senior Software Engineer',
      meta: '2017–2019',
      body: 'Bothell, WA. Enterprise SaaS frontend. Defined the stack and built the React application from the ground up.',
    },
    {
      key: 'exp-04',
      title: 'Microsoft',
      label: 'Senior Web Application Developer',
      meta: '2017',
      body: 'Redmond, WA. Interactive tracking tool for Xbox release reporting.',
    },
    {
      key: 'exp-05',
      title: 'UnitedHealth Group',
      kicker: 'OptumCare',
      label: 'Senior Web Application Developer',
      meta: '2015–2017',
      body: 'Bothell, WA. Front-end of the OptumCare provider portal.',
    },
    {
      key: 'exp-06',
      title: 'McGraw-Hill Education',
      label: 'Senior Interactive Engineer',
      meta: '2012–2015',
      body: 'Bothell, WA. Interactive learning experiences that replaced Flash, plus a content authoring system.',
    },
    {
      key: 'exp-07',
      title: 'Amazon.com',
      kicker: 'Kindle Fire',
      label: 'Senior Front-End Web Designer/Developer',
      meta: '2011–2012',
      body: 'Seattle, WA. Hand-coded screen content for Kindle Fire.',
    },
    {
      key: 'exp-08',
      title: 'Fusion Partners LLC',
      label: 'Web Director',
      meta: '2003–2011',
      body: 'Seattle, WA. Websites for builders and master-planned communities, integrated with a CMS.',
    },
    {
      key: 'exp-09',
      title: 'Computer Horizons Corporation',
      label: 'Help Desk Agent',
      meta: '2000–2001',
      body: 'Raleigh, NC. Developed the company intranet and provided help desk support for Nortel Networks employees.',
    },
    {
      key: 'exp-10',
      title: 'Organizational Counselor & Technical Lead',
      meta: '1995–2000',
      body: 'Taught and counseled adults and youth for non-profit organizations, and built standards-focused websites.',
    },
    {
      key: 'discipline-01',
      title: 'Web design',
      body: 'Layout, type, and visual systems that make a brand legible in seconds.',
    },
    {
      key: 'discipline-02',
      title: 'Frontend craft',
      body: 'Production React and TypeScript, accessible and fast by default.',
    },
    {
      key: 'discipline-03',
      title: 'Motion with purpose',
      body: 'Movement that guides attention — never decoration for its own sake.',
    },
    {
      key: 'study',
      label: 'Study',
      title: 'Formal coursework,',
      kicker: 'as printed on the résumé.',
    },
    {
      key: 'education-01',
      title: 'Capella University',
      meta: '2002–2004 · Minneapolis, MN',
      body: 'Three years toward a bachelor’s in Computer Information Systems, specializing in web application development. 160+ credits in 20 months. 3.78 GPA or higher; President’s List and Dean’s List.',
    },
    {
      key: 'education-02',
      title: 'Victor Valley College',
      meta: '2001–2003 · Victorville, CA',
      body: 'Certificate — Web Authoring.',
    },
    {
      key: 'closing',
      label: 'Next form',
      title: 'Have a site that needs to',
      kicker: 'move with purpose?',
      body: 'Tell me what you are building. A short intro call is the fastest way to see if we are a fit.',
      href: '/contact#book',
      meta: 'Book a call',
    },
  ],
}

const contact: PageDoc = {
  slug: 'contact',
  title: 'Contact',
  eyebrow: 'Contact',
  headline: 'Let’s start',
  headlineAccent: 'the first form.',
  lede: 'Book a short intro call, send a note, or email directly. I reply personally.',
  blocks: [
    {
      key: 'book',
      title: 'Book a call',
      body: '30-minute intro. Scope, timing, and whether we’re a fit — no pitch deck.',
      meta: 'Request a time',
    },
    { key: 'book-point-01', title: 'Video call — your choice of platform' },
    { key: 'book-point-02', title: 'Pacific time, flexible hours' },
    { key: 'book-point-03', title: 'Follow-up summary by email' },
    {
      key: 'form',
      title: 'Start a project',
      body: 'Share a few details and I’ll get back within two business days.',
    },
    { key: 'project-type-01', title: 'New website' },
    { key: 'project-type-02', title: 'Redesign' },
    { key: 'project-type-03', title: 'Frontend build' },
    { key: 'project-type-04', title: 'Design system' },
    { key: 'project-type-05', title: 'Not sure yet' },
    { key: 'form-note', body: 'No phone needed. Email only.' },
    {
      key: 'form-success',
      title: 'Message saved.',
      body: 'Thanks — I’ll reply personally from',
    },
  ],
}

export const defaultPortfolio: Portfolio = {
  settings: {
    name: 'Christian Wallace',
    roleLine: 'Web design · Frontend craft',
    email: 'xtionace@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/christianshepard',
    linkedinLabel: 'in/christianshepard',
    location: 'Lynnwood / Seattle area',
    previewBadge: 'Private preview',
    primaryCtaLabel: 'Book a call',
    primaryCtaHref: '/contact#book',
    footerBlurb:
      'Web design and frontend craft. Sites that move with purpose — like a practiced form.',
    copyright: '© 2026 christianjwallace.com',
    footerNote: 'Private prototype — not indexed',
    navLinks: [
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    footerLinks: [
      { label: 'Work', href: '/work' },
      { label: 'BioBuild case', href: '/work/biobuild' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  pages: [home, work, about, contact],
  projects: [
    biobuild,
    attPrimary,
    attSecondary,
    tmobilePrimary,
    tmobileSecondary,
    reserved('06'),
    reserved('07'),
    reserved('08'),
    reserved('09'),
    reserved('10'),
    reserved('11'),
    reserved('12'),
  ],
}

export function caseProject(projects: ProjectContent[], slug: string) {
  const matches = projects.filter((project) => project.caseSlug === slug)
  return (
    matches.find((project) => project.sections.length > 0) ??
    matches.find((project) => project.kind !== 'reserved')
  )
}

export function caseSlots(projects: ProjectContent[], slug: string) {
  return projects.filter((project) => project.caseSlug === slug).map((project) => project.index)
}
