import type {
  PageDoc,
  Portfolio,
  ProjectClosing,
  ProjectContent,
  WorkStatus,
} from '@/content/types'

/** Visible card chrome on the homepage rail and work index. Stored on each project. */
export function projectChrome(status: WorkStatus): { statusLabel: string; mediaBadge: string } {
  if (status === 'filled') return { statusLabel: 'Case study', mediaBadge: 'Live' }
  if (status === 'summary') return { statusLabel: 'Résumé summary', mediaBadge: '' }
  if (status === 'card') return { statusLabel: 'Role', mediaBadge: '' }
  if (status === 'tbd') {
    return { statusLabel: 'Case study TBD', mediaBadge: 'Screenshots pending clearance' }
  }
  return { statusLabel: 'Reserved', mediaBadge: '' }
}

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
  primaryLabel: 'Get in touch',
  primaryHref: '/contact',
  secondaryLabel,
  secondaryHref: secondaryLabel ? '/contact' : '',
})

function roleCard(input: {
  index: string
  title: string
  slug: string
  role: string
  years: string
  location: string
  summary: string
  tags: string[]
}): ProjectContent {
  return {
    index: input.index,
    title: input.title,
    client: input.role,
    status: 'card',
    kind: 'card',
    caseSlug: input.slug,
    summary: input.summary,
    tags: input.tags,
    href: `/work#work-card-${input.slug}`,
    imageUrl: '',
    imageAlt: '',
    liveUrl: '',
    liveLabel: '',
    ...projectChrome('card'),
    statusLabel: input.years,
    showOnRail: false,
    railOrder: 0,
    role: input.role,
    year: input.years,
    dates: input.years,
    location: input.location,
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
  ...projectChrome('filled'),
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
  nextTitle: 'AT&T',
  ndaNote: '',
  closing: bookClosing(
    'End of case',
    'That is the BioBuild site.',
    '',
    'The other roles are on the work index.',
  ),
}

const att: ProjectContent = {
  index: '02',
  title: 'AT&T',
  client: 'Principal Software Engineer',
  status: 'filled',
  kind: 'case',
  caseSlug: 'att',
  summary:
    'Two AI toolkits for AT&T Business. On-brand prototypes with validation, and a gated workflow that moved shipping from 5-10 PRs a month to 40.',
  cardSummary:
    'Went from developer to AI systems engineer at AT&T Business, building gated AI workflows that moved shipping from 5-10 PRs a month to 40.',
  tags: ['Design system', 'AI toolkits'],
  href: '/work/att',
  imageUrl: '',
  imageAlt: '',
  liveUrl: '',
  liveLabel: '',
  ...projectChrome('filled'),
  mediaBadge: '',
  showOnRail: true,
  railOrder: 1,
  role: 'Principal Software Engineer',
  year: 'Sep 2023 — Present',
  dates: 'Sep 2023 — Present',
  location: 'Bothell, WA',
  stack: ['React', 'Angular', 'Nx'],
  accent: 'gold',
  log: [
    { stamp: 'LOG 01', label: 'Design toolkit' },
    { stamp: 'LOG 02', label: 'Workflow toolkit' },
    { stamp: 'LOG 03', label: 'Gates' },
    { stamp: 'LOG 04', label: 'Human approval' },
  ],
  sections: [
    {
      anchor: 'problem',
      eyebrow: '01 — Problem',
      title: 'No design system that met the Business org’s needs.',
      body: 'AT&T did not have a design system that met the needs of the Business organization. The system already in place was too rigid.',
    },
    {
      anchor: 'approach',
      eyebrow: '02 — Approach',
      title: 'Two AI toolkits: one for design, one for workflow.',
      body: 'The design toolkit builds brand constraints in, so prototypes come out on-brand. It also validates accessibility, responsive layout, and lint.\n\nThe workflow toolkit runs gated agentic orchestration loops. Features and stories are written as executable specs. Those specs run in parallel and build the code. The gates are brand rules plus the same validations. A human approves every final PR.\n\nProduct owners and designers can set up a demo app, or work directly in a project’s repository.',
    },
    {
      anchor: 'result',
      eyebrow: '03 — Result',
      title: 'In use across AT&T Business.',
      body: 'The toolkits are used across all of AT&T Business. The workflow tools raised shipping from 5-10 PRs a month to 40.',
    },
  ],
  highlights: [
    {
      title: 'Design toolkit',
      body: 'Brand constraints for on-brand prototypes, plus accessibility, responsive, and lint validation.',
    },
    {
      title: 'Workflow toolkit',
      body: 'Executable specs that run in parallel and build the code.',
    },
    {
      title: 'Who can use it',
      body: 'Product owners and designers can set up a demo app or work in a project repo.',
    },
  ],
  facts: [
    'Used across all of AT&T Business',
    'Design toolkit keeps prototypes on-brand',
    'Validation covers accessibility, responsive layout, and lint',
    'Workflow specs run in parallel and build the code',
    'Gates are brand rules plus validation',
    'A human approves every final PR',
    'Velocity: 5-10 PRs a month to 40',
  ],
  gallery: [],
  plates: [],
  nextHref: '/work/t-mobile',
  nextIndex: '03',
  nextTitle: 'T-Mobile',
  ndaNote: '',
  closing: bookClosing(
    'End of case',
    'Thanks for reading.',
    '',
    'The rest of the work is on the index.',
  ),
}

const tmobile: ProjectContent = {
  index: '03',
  title: 'T-Mobile',
  client: 'Front End Developer IV',
  status: 'filled',
  kind: 'case',
  caseSlug: 't-mobile',
  summary:
    'Built the component library for the T-Mobile consumer design system. That library was the bulk of the work, with a Metro theme and color tokens for iOS, Android, and web.',
  cardSummary:
    "Built the component library for T-Mobile's consumer design system, plus a Metro theme and color tokens for iOS, Android, and web.",
  tags: ['Design system', 'Color tokens'],
  href: '/work/t-mobile',
  imageUrl: '',
  imageAlt: '',
  liveUrl: '',
  liveLabel: '',
  ...projectChrome('filled'),
  mediaBadge: '',
  showOnRail: true,
  railOrder: 2,
  role: 'Front End Developer IV',
  year: '2020 — Sep 2023',
  dates: '2020 — Sep 2023',
  location: 'Bellevue, WA',
  stack: ['HTML/CSS', 'Web Components', 'React', 'Angular', 'Node'],
  accent: 'gold',
  log: [
    { stamp: 'LOG 01', label: 'Component library' },
    { stamp: 'LOG 02', label: 'Headless components' },
    { stamp: 'LOG 03', label: 'Metro theme' },
    { stamp: 'LOG 04', label: 'Color tokens' },
  ],
  sections: [
    {
      anchor: 'role',
      eyebrow: '01 — Role',
      title: 'The component library was the bulk of the work.',
      body: 'Front End Developer IV on the consumer design system team, 2020 to Sep 2023, in Bellevue, WA. Building the component library, as part of the full design system, was the bulk of his work. Most elements on the T-Mobile site came from components the team built. Christian had a part in most of them.',
    },
    {
      anchor: 'approach',
      eyebrow: '02 — Approach',
      title: 'Library first, then a theme and tokens.',
      body: 'Built the component library for the consumer design system. Core components were the bulk of the work.\n\nHelped the AEM team make headless core components.\n\nCreated a Metro theme so Metro by T-Mobile could reuse the same component set and switch brands.\n\nBuilt a cross-platform color token tool that outputs tokens for iOS, Android, and web.',
    },
    {
      anchor: 'result',
      eyebrow: '03 — Result',
      title: 'The library, on T-Mobile and Metro.',
      body: 'Building the component library was the bulk of the work. The T-Mobile site drew most of its elements from the team’s components. Metro by T-Mobile reused that set through a theme. Color tokens shipped for iOS, Android, and web.',
    },
  ],
  highlights: [
    {
      title: 'Component library',
      body: 'Core components for the consumer design system. Building that library was the bulk of the work, plus help for the AEM team on headless core components.',
    },
    {
      title: 'Metro theme',
      body: 'Metro by T-Mobile reuses the same component set and switches brands.',
    },
    {
      title: 'Color tokens',
      body: 'One token written for iOS, Android, and web.',
    },
  ],
  facts: [
    'Building the component library was the bulk of the work',
    'Consumer design system team, 2020 — Sep 2023',
    'Most elements on the T-Mobile site came from the team’s components',
    'Built core components for the library',
    'Helped the AEM team make headless core components',
    'Metro theme reuses the same component set',
    'Color tokens output for iOS, Android, and web',
  ],
  gallery: [],
  plates: [],
  nextHref: '',
  nextIndex: '',
  nextTitle: '',
  ndaNote: '',
  closing: bookClosing(
    'End of case',
    'Thanks for reading.',
    '',
    'The rest of the work is on the index.',
  ),
}

const home: PageDoc = {
  slug: 'home',
  title: 'Home',
  blocks: [
    { key: 'hero-eyebrow', label: 'Christian Wallace, principal software engineer' },
    { key: 'hero-line-1', title: 'I make complex products' },
    { key: 'hero-line-2', title: 'feel', kicker: 'simple,', meta: 'and I build' },
    { key: 'hero-line-3', title: 'the systems that keep them that way.' },
    {
      key: 'hero-body',
      body: 'I am a principal software engineer in Lynnwood, Washington. This site is a record of the products and design systems I have worked on.',
    },
    { key: 'hero-primary', title: 'Get in touch', href: '/contact' },
    { key: 'hero-secondary', title: 'See the work', href: '/work' },
    { key: 'hero-status', title: 'Lynnwood, Washington' },
    { key: 'log-heading', label: 'Now' },
    { key: 'scroll-cue', label: 'Selected work' },
    { key: 'session-01', label: 'NOW', title: 'Principal SWE, AT&T' },
    { key: 'session-02', label: 'BUILDING', title: 'BioBuild Systems' },
    { key: 'session-03', label: 'BASED', title: 'Lynnwood / Seattle' },
    { key: 'session-04', label: 'FOCUS', title: 'Web design · Frontend' },
    {
      key: 'selected',
      label: 'Selected work',
      title: 'BioBuild, plus',
      kicker: 'recent roles.',
      body: 'BioBuild, AT&T, and T-Mobile are full case studies. Earlier roles are short cards.',
      href: '/work',
      meta: 'All work',
    },
    {
      key: 'process',
      label: 'Process',
      title: 'How I work.',
      kicker: '',
      body: 'The same sequence each time: plan, design, build, launch, and improve.',
    },
    { key: 'process-prefix', label: 'Step' },
    {
      key: 'form-01',
      label: '01',
      title: 'Plan',
      kicker: 'Listen first',
      body: 'Audit what exists, name the audience, and agree on what the work must do.',
    },
    {
      key: 'form-02',
      label: '02',
      title: 'Design',
      kicker: 'Content and interface',
      body: 'Map the content, then type, color, and layout. Try it in the browser, not only in mockups.',
    },
    {
      key: 'form-03',
      label: '03',
      title: 'Build',
      kicker: 'Production frontend',
      body: 'Accessible, fast, and responsive from the start.',
    },
    {
      key: 'form-04',
      label: '04',
      title: 'Launch',
      kicker: 'Ship it',
      body: 'Put it in front of people and make sure they can use it.',
    },
    {
      key: 'form-05',
      label: '05',
      title: 'Improve',
      kicker: 'Keep tuning',
      body: 'Watch how people use it, and change what needs to change.',
    },
    {
      key: 'closing',
      label: 'Hello',
      title: 'Want to talk?',
      kicker: '',
      body: 'Send a note or email. I read every message and reply myself.',
      href: '/contact',
      meta: 'Get in touch',
    },
  ],
}

const work: PageDoc = {
  slug: 'work',
  title: 'Work',
  eyebrow: 'Work',
  headline: 'The work,',
  headlineAccent: 'on the record.',
  lede: 'BioBuild, AT&T, and T-Mobile are full case studies. Earlier roles are short cards.',
  blocks: [
    { key: 'filter-all', label: 'All' },
    { key: 'filter-filled', label: 'Case studies' },
    { key: 'filter-summary', label: 'Summaries' },
    {
      key: 'closing',
      label: 'Hello',
      title: 'Want to talk?',
      kicker: '',
      body: 'Send a note or email. I read every message and reply myself.',
      href: '/contact',
      meta: 'Get in touch',
    },
  ],
}

const about: PageDoc = {
  slug: 'about',
  title: 'About',
  eyebrow: 'About',
  headline: 'Enterprise discipline.',
  headlineAccent: 'Craftsperson’s care.',
  lede: 'I am Christian Wallace, a principal software engineer in Lynnwood, Washington. I focus on design systems and AI-assisted delivery, after about 26 years shipping production UI, including independent sites.',
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
      title: 'Work history',
      kicker: '',
      body: 'Roles from the current résumé.',
    },
    {
      key: 'exp-01',
      title: 'AT&T',
      label: 'Principal Software Engineer',
      meta: 'Sep 2023 — Present',
      body: 'Bothell, WA.\n• Ship production React, Angular, and Nx. Lead teams and run scrum as an individual contributor who writes the code.\n• Sole contributor (Feb 2026–) on a ground-up internal design system: generators, agentic AI, hooks, skills, and loops. Rebuilt the site.\n• Shipped MCP tooling for components and AI tools, plus a frontend for one-shot branded interactive AI prototypes.\n• Raised shipping velocity from 5-10 PRs a month to 40.',
    },
    {
      key: 'exp-02',
      title: 'T-Mobile',
      label: 'Front End Developer IV',
      meta: '2020 — Sep 2023',
      body: 'Bellevue, WA. Consumer design system team.\n• Design system for T-Mobile and Metro: responsive, accessible, reusable components with docs and usage examples (HTML/CSS, Web Components, React, Angular, Node).\n• Built core components and helped the AEM team make headless core components.\n• Created a Metro theme so Metro by T-Mobile could reuse the same component set.\n• Built a cross-platform color token tool that outputs tokens for iOS, Android, and web.',
    },
    {
      key: 'exp-03',
      title: 'Winshuttle',
      label: 'Senior Software Engineer',
      meta: '2017–2019',
      body: 'Bothell, WA. Built the front-end stack from scratch (React, Redux). Hiring manager for front-end and UI/UX; ran agile ceremonies.',
    },
    {
      key: 'exp-04',
      title: 'Microsoft',
      label: 'Senior Web Application Developer',
      meta: '2017',
      body: 'Redmond, WA. Xbox executive dashboards: 20 dashboards in about 1.5 months via a modular, data-driven AngularJS approach.',
    },
    {
      key: 'exp-05',
      title: 'UnitedHealth Group',
      kicker: 'OptumCare',
      label: 'Senior Web Application Developer',
      meta: '2015–2017',
      body: 'Bothell, WA. Front end of the OptumCare Provider Portal (HTML5, SASS, Angular) across local and remote agile teams.',
    },
    {
      key: 'exp-06',
      title: 'McGraw-Hill Education',
      label: 'Senior Interactive Engineer',
      meta: '2012–2015',
      body: 'Bothell, WA. HTML5 interactive learning (replacing Flash), real-time authoring, and data-driven dashboards.',
    },
    {
      key: 'exp-07',
      title: 'Amazon.com',
      kicker: 'Kindle Fire',
      label: 'Senior Front-End Web Designer/Developer',
      meta: '2011–2012',
      body: 'Seattle, WA. Hand-coded HTML/CSS for Kindle Fire under tight deadlines.',
    },
    {
      key: 'exp-08',
      title: 'Fusion Partners LLC',
      label: 'Web Director',
      meta: '2003–2011',
      body: 'Seattle, WA. Client web and CMS work for Northwest builders. A Seattle Housing Authority campaign sold 19 homes opening weekend.',
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
      title: 'Motion',
      body: 'Movement that guides attention, not decoration for its own sake.',
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
      meta: '2002–2004',
      body: 'Three years toward a B.S. in Computer Information Systems (Web Application Development).',
    },
    {
      key: 'education-02',
      title: 'Victor Valley College',
      meta: '2001–2003',
      body: 'Certificate, Web Authoring.',
    },
    {
      key: 'closing',
      label: 'Hello',
      title: 'Want to talk?',
      kicker: '',
      body: 'Send a note or email. I read every message and reply myself.',
      href: '/contact',
      meta: 'Get in touch',
    },
  ],
}

const contact: PageDoc = {
  slug: 'contact',
  title: 'Contact',
  eyebrow: 'Contact',
  headline: 'Get in touch',
  headlineAccent: '',
  lede: 'Send a note or email me directly. I reply myself.',
  blocks: [
    {
      key: 'book',
      title: 'A short call',
      body: '30-minute intro if a call is easier than email.',
      meta: 'Request a time',
    },
    { key: 'book-point-01', title: 'Video call, your choice of platform' },
    { key: 'book-point-02', title: 'Pacific time, flexible hours' },
    { key: 'book-point-03', title: 'Follow-up summary by email' },
    {
      key: 'form',
      title: 'Send a note',
      body: 'A few details are enough. I reply within two business days.',
    },
    { key: 'project-type-01', title: 'Saying hello' },
    { key: 'project-type-02', title: 'A question about the work' },
    { key: 'project-type-03', title: 'Design systems' },
    { key: 'project-type-04', title: 'Frontend' },
    { key: 'project-type-05', title: 'Something else' },
    { key: 'form-note', body: 'No phone needed. Email only.' },
    {
      key: 'form-success',
      title: 'Message saved.',
      body: 'Thanks. I will reply personally from',
    },
  ],
}

export const defaultPortfolio: Portfolio = {
  settings: {
    name: 'Christian Wallace',
    roleLine: 'Web design · Frontend craft',
    email: 'xtionace@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/christianjwallace',
    linkedinLabel: 'in/christianjwallace',
    location: 'Lynnwood / Seattle area',
    previewBadge: 'Private preview',
    primaryCtaLabel: 'Get in touch',
    primaryCtaHref: '/contact',
    footerBlurb: 'A portfolio of design systems, frontend, and the products behind them.',
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
    att,
    tmobile,
    roleCard({
      index: '04',
      title: 'Microsoft',
      slug: 'xbox',
      role: 'Senior Web Application Developer',
      years: '2017',
      location: 'Redmond, WA',
      summary:
        'Xbox executive dashboards: 20 dashboards in about 1.5 months, using a modular, data-driven AngularJS approach.',
      tags: ['AngularJS', 'Xbox'],
    }),
    roleCard({
      index: '05',
      title: 'Winshuttle',
      slug: 'winshuttle',
      role: 'Senior Software Engineer',
      years: '2017–2019',
      location: 'Bothell, WA',
      summary:
        'Built the front-end stack from scratch (React, Redux). Hiring manager for front-end and UI/UX, and ran agile ceremonies.',
      tags: ['React', 'Redux'],
    }),
    roleCard({
      index: '06',
      title: 'OptumCare',
      slug: 'optumcare',
      role: 'Senior Web Application Developer',
      years: '2015–2017',
      location: 'Bothell, WA',
      summary:
        'Front end of the OptumCare Provider Portal, and Receipt Vault, a tool for Optum Bank customers to record paper receipts (HTML5, SASS, Angular).',
      tags: ['HTML5', 'Angular'],
    }),
    roleCard({
      index: '07',
      title: 'McGraw-Hill',
      slug: 'mcgraw-hill',
      role: 'Senior Interactive Engineer',
      years: '2012–2015',
      location: 'Bothell, WA',
      summary:
        'Built interactive HTML5 learning games that replaced Flash, plus real-time authoring tools and data-driven dashboards.',
      tags: ['HTML5'],
    }),
    roleCard({
      index: '08',
      title: 'Amazon',
      slug: 'kindle',
      role: 'Senior Front-End Web Designer/Developer',
      years: '2011–2012',
      location: 'Seattle, WA',
      summary:
        'Converted print books and comic books into digital editions for Kindle Fire, hand-coding HTML and CSS under tight deadlines.',
      tags: ['Kindle Fire', 'HTML/CSS'],
    }),
    roleCard({
      index: '09',
      title: 'Fusion Partners',
      slug: 'fusion',
      role: 'Web Director',
      years: '2003–2011',
      location: 'Seattle, WA',
      summary:
        'Web Director at a marketing agency for master-planned real estate communities. Client sites and CMS work, including a Seattle Housing Authority campaign that sold 19 homes opening weekend.',
      tags: ['CMS'],
    }),
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
