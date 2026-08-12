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
    title: 'ARTH.AI',
    status: 'DEPLOYED · 2026',
    problem: 'Manual audit-report generation is slow and unscalable, requiring automation without sacrificing accuracy.',
    challenge: 'Orchestrating complex multi-agent workflows and background jobs reliably while achieving under 500ms response times.',
    approach: [
      'Architected a multi-agent SaaS platform orchestrating Gemini API agents with Groq/Llama 3.3 70B fallback for automated audit-report generation.',
      'Designed scalable FastAPI microservices and a three-stage BullMQ background-job pipeline on Redis.',
      'Built a RAG retrieval pipeline with pgvector/text-embedding-004 for semantic search and engineered PostgreSQL schemas with Prisma ORM compound indexing.',
      'Automated Puppeteer-based PDF reports with CI/CD on Render.'
    ],
    stack: [
      'Next.js',
      'FastAPI',
      'PostgreSQL',
      'BullMQ',
      'Redis',
      'Gemini API'
    ],
    github: 'https://github.com/pjha26',
    live: 'https://arth-ai-ruddy.vercel.app',
    image: '/arthai.png'
  },
  {
    id: 'mockmind',
    fileNumber: 'CASE 01',
    title: 'MOCKMIND',
    status: 'DEPLOYED · 2026',
    problem: 'Candidates lack accessible, realistic voice-based mock interviews for various technical and behavioral formats.',
    challenge: 'Managing conversational state accurately to prevent AI hallucinations and repetitive questioning during live voice interactions.',
    approach: [
      'Built a voice-based AI mock-interview platform delivering live spoken interviews via Vapi WebRTC (STT/TTS) across multiple formats.',
      'Designed a LangGraph multi-node state-machine with separate nodes for answer evaluation, strategy decisions, and question generation to reduce hallucination.',
      'Integrated Groq LLaMA 3.3 70B for low-latency inference.',
      'Implemented HMAC-signed tab-close session authentication for secure state management.'
    ],
    stack: [
      'Next.js',
      'PostgreSQL (Neon)',
      'Prisma',
      'LangGraph',
      'Groq',
      'Vapi',
      'JWT'
    ],
    github: 'https://github.com/pjha26',
    image: '/interviewai.png'
  },
  {
    id: 'expertbook',
    fileNumber: 'CASE 02',
    title: 'EXPERTBOOK',
    status: 'DEPLOYED · 2026',
    problem: 'Booking systems often struggle with concurrency issues, leading to double-booked reservations and poor user experiences.',
    challenge: 'Ensuring concurrency-safe reservations and real-time dashboard synchronization with sub-100ms latency.',
    approach: [
      'Built responsive booking dashboards in React.js with JWT-based authentication and role-based authorization.',
      'Implemented real-time WebSocket updates via Socket.io achieving under 100ms latency.',
      'Applied MongoDB transactions for concurrency-safe reservations with automated rollback on failure.',
      'Automated Zoom/Google Meet link generation and ICS calendar exports upon booking confirmation.'
    ],
    stack: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Socket.io',
      'JWT'
    ],
    github: 'https://github.com/pjha26',
    image: '/ai-concierge.png'
  },
  {
    id: 'promptwatch',
    fileNumber: 'CASE 03',
    title: 'PROMPTWATCH',
    status: 'DEPLOYED · 2026',
    problem: 'Websites lack visibility and control over AI crawler traffic (like GPTBot and ClaudeBot) scraping their content.',
    challenge: 'Intercepting and logging every request pre-page-load without degrading user-facing latency.',
    approach: [
      'Engineered an Edge Middleware layer to intercept requests pre-page-load, detecting AI crawler traffic via User-Agent signature matching.',
      'Implemented high-throughput logging of crawler hits directly to Upstash Redis.',
      'Built a live traffic visibility dashboard reading Redis counters through Supabase-authenticated REST APIs.',
      'Extended detection into a policy control panel allowing users to throttle or block specific AI bots.'
    ],
    stack: [
      'Next.js 15 (Edge)',
      'Upstash Redis',
      'Supabase',
      'Vercel'
    ],
    github: 'https://github.com/pjha26',
    image: '/promptwatch.png'
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
    items: [
      'Node.js',
      'Express.js',
      'FastAPI',
      'REST APIs',
      'WebSockets',
      'Socket.io',
      'JWT',
    ],
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
  }
]

export const TESTIMONIALS = [
  {
    id: 'T-01',
    author: 'Classified Informant',
    title: 'Senior Engineer',
    quote: 'Pushkar is exceptionally driven. His ability to navigate complex backend architectures and deliver performant code is a rare asset.',
  },
  {
    id: 'T-02',
    author: 'Project Lead',
    title: 'BlueYonder',
    quote: 'A problem solver at heart. When we faced a critical database bottleneck, his optimization cut our latency nearly in half.',
  }
]

export const SECTION_IDS = ['about', 'projects', 'skills', 'experience', 'testimonials', 'contact'] as const
