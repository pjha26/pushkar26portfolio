const toolkit = [
  {
    label: 'The interface',
    description: 'Clear, responsive experiences.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    label: 'Behind the scenes',
    description: 'APIs, data, and real-time systems.',
    skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'A little intelligence',
    description: 'AI that does something useful.',
    skills: ['LangGraph', 'RAG', 'pgvector', 'LLM APIs', 'OpenCV'],
  },
  {
    label: 'Getting it out there',
    description: 'From my machine to the web.',
    skills: ['Git', 'Docker', 'Vercel', 'Render', 'CI/CD'],
  },
]

export function Skills({ embedded = false }: { embedded?: boolean }) {
  const Heading = embedded ? 'h2' : 'h1'
  const GroupHeading = embedded ? 'h3' : 'h2'
  return (
    <section className="studio-toolkit studio-dark" id="skills" aria-labelledby="toolkit-title">
      <div className="studio-toolkit-layout shell">
        <div className="reel-toolkit-heading">
          <Heading id="toolkit-title">A practical<br /><span>toolkit.</span></Heading>
          <p>
            The tools change. The goal stays the same:
            <br />
            choose what helps the idea work.
          </p>
        </div>
        <div className="reel-toolkit-index">
          {toolkit.map((group, index) => (
            <details className="reel-toolkit-item" name="toolkit" key={group.label} open={index === 0}>
              <summary><span>0{index + 1}</span><GroupHeading>{group.label}</GroupHeading><span className="reel-disclosure" aria-hidden="true" /></summary>
              <div className="reel-toolkit-detail">
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
