export const LINKS = {
  github: 'https://github.com/pjha26',
  linkedin: 'https://www.linkedin.com/in/pushkar-raj',
  leetcode: 'https://leetcode.com/pushkar-raj',
  email: 'mailto:pushkarraj@example.com',
}

export type CaseFile = {
  fileNumber: string
  title: string
  status: string
  problem: string
  approach: string[]
  stack: string[]
  github?: string
  live?: string
}

export const CASES: CaseFile[] = [
  {
    fileNumber: 'CASE 00',
    title: 'SPECFORGE',
    status: 'DEPLOYED · 2026',
    problem:
      'Developers, students, and hackathon builders need professional technical specs but writing them from scratch is slow and inconsistent.',
    approach: [
      'AI-powered spec generator — GitHub URL or plain-text input, streams structured specs via Server-Sent Events, auto-generated Mermaid diagrams, AI complexity scoring.',
      'Multi-model generation (GPT-5, Gemini 2.5 Pro/Flash). GitHub sync with HMAC-SHA256-verified webhook auto-regeneration.',
      'Real-time presence, versioned history with diffs, team workspaces with role-based access.',
      'Export to PDF/DOCX/Notion/Markdown plus code scaffold ZIP generator. OpenAPI 3.1 + Orval codegen for typed React Query hooks and Zod schemas.',
    ],
    stack: [
      'React',
      'Vite',
      'TypeScript',
      'Express',
      'PostgreSQL (Drizzle)',
      'OpenAI',
      'Gemini',
      'SSE',
      'OpenAPI/Orval',
    ],
    github: 'https://github.com/pjha26/Spec-Forge',
  },
  {
    fileNumber: 'CASE 01',
    title: 'MOCKMIND',
    status: 'DEPLOYED · 2026',
    problem:
      'Candidates need realistic, adaptive interview practice across Behavioral, Technical, System Design, and HR/Culture Fit formats.',
    approach: [
      'Voice-based AI mock interview platform — live spoken interviews via Vapi WebRTC (STT/TTS).',
      'LangGraph state machine (not a single prompt) — separate nodes evaluate answers, decide strategy, generate questions, preventing repetition/hallucination.',
      'Groq LLaMA 3.3 70B inference. HMAC-signed beacon token for tab-close auth (sendBeacon cannot set headers), backed by a 30-minute staleness sweep.',
      'Post-session structured feedback report.',
    ],
    stack: ['Next.js', 'PostgreSQL (Prisma, Neon)', 'LangGraph', 'Groq', 'Vapi', 'JWT'],
    github: 'https://github.com/pjha26/mock-mind',
    live: 'https://mock-mind-silk.vercel.app',
  },
  {
    fileNumber: 'CASE 02',
    title: 'ARTHAI',
    status: 'DEPLOYED · 2026',
    problem: 'Audit teams lose hours manually reviewing financial documents.',
    approach: [
      'Multi-agent SaaS platform orchestrating Gemini API agents, Groq/Llama 3.3 70B fallback, auto-generates AI audit reports.',
      'FastAPI microservices under 500ms response times, three-stage BullMQ email pipeline, RAG chat-with-report using pgvector + text-embedding-004.',
      'PostgreSQL + Prisma ORM with compound indexing. Puppeteer PDF generation, logistic regression intent-scoring microservice, CI/CD on Render.',
    ],
    stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'BullMQ', 'Redis', 'Gemini API'],
    github: 'https://github.com/pjha26/arth.ai',
    live: 'https://arth-ai-nu.vercel.app',
  },
  {
    fileNumber: 'CASE 03',
    title: 'EXPERTBOOK',
    status: 'LIVE · 2026',
    problem:
      'Booking platforms need real-time reliability with zero double-booking across multiple user roles.',
    approach: [
      'React.js dashboards, Socket.io real-time updates under 100ms latency, role-based access (User/Expert).',
      'MongoDB transactions for concurrency-safe reservations with rollback.',
      'Automated Zoom/Google Meet generation + ICS calendar exports.',
    ],
    stack: ['React.js', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/pjha26/real-time',
    live: 'https://real-time-rho.vercel.app',
  },
  {
    fileNumber: 'CASE 04',
    title: 'PROMPTWATCH',
    status: 'LIVE (ACTIVE DEVELOPMENT) · 2026',
    problem:
      'AI bots (GPTBot, ClaudeBot, PerplexityBot) crawl websites with zero owner visibility or control.',
    approach: [
      'Edge Middleware intercepts every request pre-page-load, checks User-Agent against known bot signatures, logs hits in real time to Upstash Redis (keyed by bot + date).',
      'Dashboard reads Redis counters via Supabase-authenticated API routes, showing live non-synthetic traffic.',
      'Detection-only currently; policy panel (allow/throttle/block) in progress.',
    ],
    stack: ['Next.js 15 (Edge Middleware)', 'Upstash Redis', 'Supabase', 'Vercel'],
    live: 'https://promptwatch.vercel.app',
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

export const SECTION_IDS = ['about', 'projects', 'skills', 'resume', 'contact'] as const
