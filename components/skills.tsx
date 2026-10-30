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

export function Skills() {
  return (
    <section className="toolkit-section section-space" id="skills" aria-labelledby="toolkit-title">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow section-kicker">03 / Tools of the trade</p>
            <h2 id="toolkit-title">
              A practical <em>toolkit.</em>
            </h2>
          </div>
          <p>
            The tools change. The goal stays the same:
            <br />
            choose what helps the idea work.
          </p>
        </div>
        <div className="toolkit-grid" data-reveal>
          {toolkit.map((group, index) => (
            <div className="toolkit-group" key={group.label}>
              <span className="toolkit-index">0{index + 1}</span>
              <h3>{group.label}</h3>
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
