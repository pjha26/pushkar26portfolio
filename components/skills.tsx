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
    <section className="reel-toolkit shell" id="skills" aria-labelledby="toolkit-title">
        <div className="reel-toolkit-heading">
          <h1 id="toolkit-title">A practical<br /><span>toolkit.</span></h1>
          <p>
            The tools change. The goal stays the same:
            <br />
            choose what helps the idea work.
          </p>
        </div>
        <div className="reel-toolkit-index">
          {toolkit.map((group, index) => (
            <details className="reel-toolkit-item" name="toolkit" key={group.label} open={index === 0}>
              <summary><span>0{index + 1}</span><h2>{group.label}</h2><span className="reel-disclosure" aria-hidden="true" /></summary>
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
    </section>
  )
}
