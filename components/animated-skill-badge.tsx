'use client'

import { useRef, useEffect, ReactNode } from 'react'
import gsap from 'gsap'
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSocketdotio,
  SiJsonwebtokens,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiScikitlearn,
  SiHuggingface,
  SiLangchain,
  SiOpencv,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiRender,
  SiNetlify,
  SiPostman
} from 'react-icons/si'
import { FaJava, FaHtml5, FaCss3Alt } from 'react-icons/fa'
import { VscCode } from 'react-icons/vsc'
import { Activity, Network, Webhook, Box, Bot } from 'lucide-react'

const ICON_MAP: Record<string, ReactNode> = {
  'Python': <SiPython className="w-3 h-3" />,
  'JavaScript': <SiJavascript className="w-3 h-3" />,
  'TypeScript': <SiTypescript className="w-3 h-3" />,
  'Java': <FaJava className="w-3 h-3" />,
  'SQL': <SiPostgresql className="w-3 h-3" />, // Generic SQL fallback
  'HTML': <FaHtml5 className="w-3 h-3" />,
  'CSS': <FaCss3Alt className="w-3 h-3" />,
  'React.js': <SiReact className="w-3 h-3" />,
  'Next.js': <SiNextdotjs className="w-3 h-3" />,
  'Tailwind CSS': <SiTailwindcss className="w-3 h-3" />,
  'Node.js': <SiNodedotjs className="w-3 h-3" />,
  'Express.js': <SiExpress className="w-3 h-3" />,
  'FastAPI': <SiFastapi className="w-3 h-3" />,
  'REST APIs': <Network className="w-3 h-3" />,
  'WebSockets': <Webhook className="w-3 h-3" />,
  'Socket.io': <SiSocketdotio className="w-3 h-3" />,
  'JWT': <SiJsonwebtokens className="w-3 h-3" />,
  'MongoDB': <SiMongodb className="w-3 h-3" />,
  'PostgreSQL': <SiPostgresql className="w-3 h-3" />,
  'MySQL': <SiMysql className="w-3 h-3" />,
  'Prisma ORM': <SiPrisma className="w-3 h-3" />,
  'Scikit-learn': <SiScikitlearn className="w-3 h-3" />,
  'HuggingFace Transformers': <SiHuggingface className="w-3 h-3" />,
  'LangChain': <SiLangchain className="w-3 h-3" />,
  'OpenCV': <SiOpencv className="w-3 h-3" />,
  'RAG': <Bot className="w-3 h-3" />,
  'Git': <SiGit className="w-3 h-3" />,
  'GitHub': <SiGithub className="w-3 h-3" />,
  'Docker': <SiDocker className="w-3 h-3" />,
  'Vercel': <SiVercel className="w-3 h-3" />,
  'Render': <SiRender className="w-3 h-3" />,
  'Netlify': <SiNetlify className="w-3 h-3" />,
  'Postman': <SiPostman className="w-3 h-3" />,
  'CI/CD': <Activity className="w-3 h-3" />,
  'VS Code': <VscCode className="w-3 h-3" />
}

export function AnimatedSkillBadge({ skill }: { skill: string }) {
  const badgeRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const el = badgeRef.current
    if (!el) return

    // Magnetic effect
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dx = (e.clientX - centerX) * 0.15
      const dy = (e.clientY - centerY) * 0.15
      xTo(dx)
      yTo(dy)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <li
      ref={badgeRef}
      className="skill-badge opacity-0 translate-y-4 flex items-center gap-2 bg-background/50 hover:bg-background px-3 py-1.5 font-mono text-[11px] text-foreground/85 border border-border/50 hover:border-signal/50 hover:text-signal hover:shadow-[0_0_10px_rgba(245,196,0,0.2)] transition-colors cursor-default select-none will-change-transform"
    >
      {ICON_MAP[skill] || <Box className="w-3 h-3" />}
      {skill}
    </li>
  )
}
