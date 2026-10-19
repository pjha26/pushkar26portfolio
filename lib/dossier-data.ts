export const LINKS = {
  github: 'https://github.com/pjha26',
  linkedin: 'https://www.linkedin.com/in/pushkar-raj-339988313/',
  leetcode: 'https://leetcode.com/u/pjha2608/',
  email: 'mailto:pushkarraj88313@gmail.com',
}

export type CaseFile = {
  id: string
  fileNumber: string
  title: string
  category: string
  summary: string
  decisions: { title: string; body: string }[]
  flow: string[]
  tradeoff: string
  status: string
  problem: string
  challenge?: string
  approach: string[]
  stack: string[]
  github?: string
  live?: string
  image?: string
}

export const CASES: CaseFile[] = [
  {
    id: 'arth-ai',
    fileNumber: 'CASE 00',
    title: 'ArthAI',
    category: 'AI platform / Full-stack',
    summary:
      'An intelligence CRM that turns a company URL into multi-agent research, actionable reports, and a conversation.',
    flow: [
      'Next.js web app',
      'BullMQ & Node worker',
      'Parallel research agents',
      'Reports, RAG & CRM',
    ],
    tradeoff:
      'Provider fallbacks help the pipeline handle quota limits, but they also introduce more model behaviors and failure paths to observe and test.',
    decisions: [
      {
        title: 'Keep long jobs off the request path.',
        body: 'Report generation belongs in a background queue. BullMQ and Redis separate that work from the interactive application.',
      },
      {
        title: 'Give retrieval its own foundation.',
        body: 'PostgreSQL and pgvector bring structured records and semantic document retrieval into the same data layer.',
      },
    ],
    status: 'DEPLOYED · 2026',
    problem:
      'Researching inbound leads means gathering information from scattered sources and turning it into something a sales team can act on. ArthAI brings that research into a single CRM workflow.',
    challenge:
      'Coordinating parallel research agents, verifying their findings, and generating reports without blocking the user-facing application.',
    approach: [
      'Built a multi-agent intelligence pipeline using Gemini, with Groq/Llama 3.3 70B fallback for report chat.',
      'Separated website research and report generation into a BullMQ background worker, with a FastAPI microservice for ML-based lead intent scoring.',
      'Built a RAG retrieval pipeline with pgvector/text-embedding-004 for semantic search and engineered PostgreSQL schemas with Prisma ORM compound indexing.',
      'Generated PDF reports with Puppeteer and connected report delivery to email and Slack notifications.',
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'BullMQ', 'Redis', 'Gemini API'],
    live: 'https://arth-ai-ruddy.vercel.app',
    github: 'https://github.com/pjha26/arth.ai',
    image: '/arthai.png',
  },
  {
    id: 'mockmind',
    fileNumber: 'CASE 01',
    title: 'MockMind',
    category: 'Voice AI / Interview practice',
    summary:
      'A voice-first interview companion that listens, adapts its questions, and helps candidates practice.',
    flow: [
      'Interview interface',
      'Vapi voice session',
      'LangGraph conversation',
      'Evaluation & feedback',
    ],
    tradeoff:
      'The interview uses a defined pool of topics. Very long sessions can exhaust that pool, so repetition and graceful wrap-up remain important limits to handle.',
    decisions: [
      {
        title: 'Separate asking from evaluating.',
        body: 'LangGraph gives answer evaluation, interview strategy, and question generation distinct steps, making the conversation easier to control.',
      },
      {
        title: 'Treat voice as a conversation.',
        body: 'Vapi handles the live audio layer while the application maintains interview state and the context needed for each next question.',
      },
    ],
    status: 'DEPLOYED · 2026',
    problem:
      'Candidates lack accessible, realistic voice-based mock interviews for various technical and behavioral formats.',
    challenge:
      'Managing conversational state accurately to prevent AI hallucinations and repetitive questioning during live voice interactions.',
    approach: [
      'Built a voice-based AI mock-interview platform delivering live spoken interviews via Vapi WebRTC (STT/TTS) across multiple formats.',
      'Designed a LangGraph multi-node state-machine with separate nodes for answer evaluation, strategy decisions, and question generation to reduce hallucination.',
      'Integrated Groq LLaMA 3.3 70B for low-latency inference.',
      'Implemented HMAC-signed tab-close session authentication for secure state management.',
    ],
    stack: ['Next.js', 'PostgreSQL (Neon)', 'Prisma', 'LangGraph', 'Groq', 'Vapi', 'JWT'],
    github: 'https://github.com/pjha26/mock-mind',
    live: 'https://mock-mind-silk.vercel.app/',
    image: '/interviewai.png',
  },
  {
    id: 'expertbook',
    fileNumber: 'CASE 02',
    title: 'ExpertBook',
    category: 'Real-time web / Booking',
    summary:
      'An expert-booking platform built around reliable reservations and live dashboard updates.',
    flow: [
      'Booking interface',
      'Authenticated API',
      'MongoDB transaction',
      'Live dashboard update',
    ],
    tradeoff:
      'The current project generates placeholder video-meeting links. Creating real Zoom or Google Meet sessions would require a provider integration.',
    decisions: [
      {
        title: 'Make the reservation the source of truth.',
        body: 'MongoDB transactions group reservation writes so a failed operation can roll back rather than leaving a partially completed booking.',
      },
      {
        title: 'Push changes to the dashboard.',
        body: 'Socket.io broadcasts updates to connected clients, keeping the booking experience current without repeated page refreshes.',
      },
    ],
    status: 'DEPLOYED · 2026',
    problem:
      'Booking systems often struggle with concurrency issues, leading to double-booked reservations and poor user experiences.',
    challenge:
      'Keeping reservations consistent when requests overlap and synchronizing booking changes across connected dashboards.',
    approach: [
      'Built responsive booking dashboards in React.js with authentication and role-based authorization.',
      'Implemented real-time WebSocket updates via Socket.io.',
      'Applied MongoDB transactions for concurrency-safe reservations with automated rollback on failure.',
      'Added placeholder meeting links and downloadable ICS calendar exports upon booking confirmation.',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/pjha26/real-time',
    live: 'https://real-time-rho.vercel.app/',
    image: '/ai-concierge.png',
  },
  {
    id: 'promptwatch',
    fileNumber: 'CASE 03',
    title: 'PromptWatch',
    category: 'Developer tools / Observability',
    summary:
      'A live view of AI crawlers visiting a website, built with edge detection and a traffic dashboard.',
    flow: ['Incoming request', 'Crawler detection', 'Redis event counters', 'Traffic dashboard'],
    tradeoff:
      'Detection is based on User-Agent signatures, which can be spoofed. This version observes traffic; per-bot blocking and throttling are still in progress.',
    decisions: [
      {
        title: 'Observe traffic before the page loads.',
        body: 'The middleware checks incoming User-Agent signatures at the request boundary and records recognized crawler activity.',
      },
      {
        title: 'Keep the visibility layer lightweight.',
        body: 'Redis counters support the traffic dashboard, while Supabase authentication controls access to the management interface.',
      },
    ],
    status: 'DEPLOYED · 2026',
    problem:
      'Websites lack visibility and control over AI crawler traffic (like GPTBot and ClaudeBot) scraping their content.',
    challenge:
      'Intercepting and logging every request pre-page-load without degrading user-facing latency.',
    approach: [
      'Engineered an Edge Middleware layer to intercept requests pre-page-load, detecting AI crawler traffic via User-Agent signature matching.',
      'Implemented high-throughput logging of crawler hits directly to Upstash Redis.',
      'Built a live traffic visibility dashboard reading Redis counters through Supabase-authenticated REST APIs.',
      'Scoped per-bot policy controls as the next stage; the current middleware observes traffic without blocking requests.',
    ],
    stack: ['Next.js 15 (Edge)', 'Upstash Redis', 'Supabase', 'Vercel'],
    github: 'https://github.com/pjha26/promptwatch',
    live: 'https://promptwatch.vercel.app/',
    image: '/promptwatch.png',
  },
]

export const SKILL_GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'LANGUAGES',
    items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    label: 'FRONTEND',
    items: ['React.js', 'Next.js', 'Tailwind CSS'],
  },
  {
    label: 'BACKEND',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'WebSockets', 'Socket.io', 'JWT'],
  },
  {
    label: 'DATABASES',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma ORM'],
  },
  {
    label: 'ML & AI',
    items: ['Scikit-learn', 'HuggingFace Transformers', 'LangChain', 'OpenCV', 'RAG'],
  },
  {
    label: 'TOOLS & DEVOPS',
    items: [
      'Git',
      'GitHub',
      'Docker',
      'Vercel',
      'Render',
      'Netlify',
      'Postman',
      'CI/CD',
      'VS Code',
    ],
  },
]

export const PRINCIPLES: { code: string; title: string; body: string }[] = [
  {
    code: 'FN-01',
    title: 'DESIGN FOR FAILURE',
    body: 'Every external dependency is a liability until proven otherwise. Groq/Llama fallback logic in ArthAI and MockMind means a provider outage degrades gracefully instead of taking the product down.',
  },
  {
    code: 'FN-02',
    title: 'SHIP END-TO-END BEFORE OPTIMIZING',
    body: 'A working pipeline beats a perfect component. CI/CD on Render and Vercel, Docker for reproducible environments — get the whole system live, then tighten the bottlenecks the data reveals.',
  },
  {
    code: 'FN-03',
    title: 'LET DATA DRIVE DECISIONS',
    body: 'Claims require evidence. 88% classification accuracy and sub-500ms latency are not aspirations — they are measured, monitored numbers that decide what gets built next.',
  },
]

export const EXPERIENCE = [
  {
    id: 'EXP-01',
    role: 'Architected ARTH.AI',
    company: 'Intelligence CRM',
    date: '2026',
    details: [
      'Built an AI-powered Intelligence CRM with a multi-agent Gemini/Groq pipeline.',
      'Implemented RAG chat capabilities using PGVector and PostgreSQL.',
      'Developed ML-based intent scoring to automate inbound lead deep-dive research.',
    ],
  },
  {
    id: 'EXP-02',
    role: 'Developed DIAGRAMIQ',
    company: 'Computer Vision',
    date: '2026',
    details: [
      'Engineered a FastAPI application using OpenCV to automatically extract engineering symbols from PDFs.',
      'Integrated Celery for robust background processing of heavy visual workloads.',
    ],
  },
  {
    id: 'EDU-01',
    role: 'B.E in Computer Science Engineering (AI & ML)',
    company: 'VTU',
    date: '2023 - 2027',
    details: [
      'Specialized heavily in AI, Machine Learning, and Full-Stack Engineering.',
      'Continuously built and shipped production-ready scalable applications.',
    ],
  },
]

export const TESTIMONIALS = [
  {
    id: 'T-01',
    author: 'Classified Informant',
    title: 'Senior Engineer',
    quote:
      'Pushkar is exceptionally driven. His ability to navigate complex backend architectures and deliver performant code is a rare asset.',
  },
  {
    id: 'T-02',
    author: 'Project Lead',
    title: 'BlueYonder',
    quote:
      'A problem solver at heart. When we faced a critical database bottleneck, his optimization cut our latency nearly in half.',
  },
]

export const SECTION_IDS = [
  'about',
  'projects',
  'skills',
  'experience',
  'testimonials',
  'contact',
] as const
