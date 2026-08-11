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
}

export const CASES: CaseFile[] = [
  {
    id: 'arth-ai',
    fileNumber: 'CASE 00',
    title: 'ARTH.AI',
    status: 'DEPLOYED · 2026',
    problem:
      'Inbound leads require hours of manual deep-dive research before sales calls, resulting in lost conversions and inefficient resource allocation.',
    challenge: 'Orchestrating multiple LLMs (Gemini/Groq) reliably without hallucination, while maintaining stateful RAG chat and ML-based intent scoring.',
    approach: [
      'Developed an AI-powered Intelligence CRM that autonomously generates comprehensive research reports for inbound leads.',
      'Engineered a multi-agent pipeline utilizing Gemini and Groq, drastically reducing research time while improving data accuracy.',
      'Integrated PGVector and RAG architectures to allow users to dynamically chat with the extracted intelligence.',
      'Deployed a scalable backend using FastAPI, Prisma, and PostgreSQL, serving a responsive Next.js frontend.',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'PGVector',
      'Prisma',
      'Gemini API',
    ],
    github: 'https://github.com/pjha26/arth.ai',
    live: 'https://arth-ai-ruddy.vercel.app',
  },
  {
    id: 'diagramiq',
    fileNumber: 'CASE 01',
    title: 'DIAGRAMIQ',
    status: 'DEPLOYED · 2026',
    problem:
      'Extracting and classifying engineering symbols from complex PDF diagrams is heavily manual, error-prone, and unscalable.',
    challenge: 'Processing unstructured, noisy visual data and handling intensive computer vision tasks without blocking the main thread.',
    approach: [
      'Architected a FastAPI application leveraging OpenCV to automatically detect and classify engineering symbols.',
      'Implemented an asynchronous background processing queue using Celery to handle heavy PDF extractions seamlessly.',
      'Engineered robust computer vision pipelines capable of handling varying resolutions, noise levels, and diagram styles.',
    ],
    stack: [
      'Python',
      'FastAPI',
      'OpenCV',
      'Celery',
      'Computer Vision',
    ],
    github: 'https://github.com/pjha26/DiagramiQ',
  },
  {
    id: 'ghumo',
    fileNumber: 'CASE 02',
    title: 'GHUMO_PROTOCOL',
    status: 'DEPLOYED · 2026',
    problem:
      'Property rental platforms often suffer from clunky navigation and poor reservation state management.',
    challenge: 'Building a responsive, full-stack booking architecture that synchronizes property listings with real-time user reservations.',
    approach: [
      'Developed a seamless, full-stack property rental application inspired by modern booking interfaces.',
      'Engineered complete user authentication flows, dynamic property listings, and a secure reservation management system.',
      'Optimized the React frontend for fluid state transitions and intuitive user experiences across all devices.',
    ],
    stack: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
    ],
    github: 'https://github.com/pjha26/ghumo',
    live: 'https://airbnb-sigma-gilt.vercel.app/',
  },
  {
    id: 'finance-dashboard',
    fileNumber: 'CASE 03',
    title: 'FINANCE_OVERSEER',
    status: 'DEPLOYED · 2026',
    problem:
      'Personal financial data is scattered, making real-time tracking of assets and expenses overly complex.',
    challenge: 'Aggregating financial data streams into a cohesive, highly responsive, and visually digestible dashboard.',
    approach: [
      'Constructed a real-time financial tracking dashboard for precise monitoring of assets, income, and expenses.',
      'Utilized Next.js and React to build a dynamic, client-side interface with minimal latency.',
      'Implemented robust charting and data visualization components for instant financial health assessment.',
    ],
    stack: [
      'Next.js',
      'React',
      'JavaScript',
    ],
    github: 'https://github.com/pjha26/finance-dashboard',
    live: 'https://finance-dashboard-ba1v0z34m-pjha26s-projects.vercel.app/',
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
    role: 'B.Tech in Computer Science',
    company: 'University',
    date: '2021 - 2025',
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
