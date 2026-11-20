import { Fragment } from 'react'
import { ArrowUpRight, BookOpen, FileDiff, FilePenLine, Layers3, MessagesSquare, ScanFace } from 'lucide-react'
import styles from './project-diary.module.css'

const entries = [
  {
    title: 'FailFix', repo: 'Failfix', topic: 'Developer tools', icon: FileDiff,
    headline: 'From a red test to a reviewable patch.',
    body: 'FailFix puts the TypeScript source, the Vitest failure, and the proposed change on one desk. Each explanation points back to the line that supports it.',
    note: 'A patch can apply cleanly and still be wrong. FailFix checks that the edits match the source, then exports the patch and a separate regression test for a local run.',
  },
  {
    title: 'SpecForge', repo: 'Spec-Forge', topic: 'Developer tools', icon: FilePenLine,
    headline: 'Give a rough idea a working spec.',
    body: 'Start with a repository or a few sentences. SpecForge drafts a system design, API contract, database schema, or feature specification that a team can edit and share.',
    note: 'Templates make the first draft available without a model key. An optional local Ollama model can write the prose, and the same spec can travel as Markdown or DOCX.',
  },
  {
    title: 'Monocular Depth Estimation', repo: 'FinalProject', topic: 'Computer vision', icon: Layers3,
    headline: 'Read depth from a single frame.',
    body: 'A final-year experiment pairs a driving frame with its relative depth map. The side-by-side view makes it possible to see which surfaces a pretrained model places nearer or farther away.',
    note: 'The original Monodepth2 baseline stayed in place. A research candidate improved mean error on 200 CARLA frames, but scored worse on the 697-frame KITTI evaluation.',
  },
  {
    title: 'Recallio', repo: 'Recallio', topic: 'Conversational AI', icon: MessagesSquare,
    headline: 'Ask an old question in the present tense.',
    body: 'Recallio can reopen an earlier vendor shortlist and check whether a price or release has changed since that conversation. The answer links back to its sources.',
    note: 'Today’s price alone cannot establish when it changed. Recallio looks for dated evidence covering the comparison period and leaves the claim open when that evidence is missing.',
  },
  {
    title: 'ConcentraAI', repo: 'ML-Backend', topic: 'Real-time vision', icon: ScanFace,
    headline: 'Turn webcam cues into a session timeline.',
    body: 'ConcentraAI uses MediaPipe face landmarks and OpenCV to estimate attention-related states from visible cues such as blinks, gaze, and head pose. A React dashboard plots the estimates over time.',
    note: 'The browser captures frames and sends them over a WebSocket. FastAPI returns the current state and measurements on the same connection so the timeline can update during the session.',
  },
]

export function ProjectDiary() {
  return (
    <section id="project-diary" className={styles.diary} aria-labelledby="diary-title">
      <div className="shell">
        <header className={styles.heading}><BookOpen aria-hidden="true" /><h2 id="diary-title">Project diary<span>.</span></h2></header>
        <fieldset className={styles.notebook}>
          <legend className="sr-only">Choose a project diary entry</legend>
          {entries.map(({ title, repo, topic, icon: Icon, headline, body, note }, index) => {
            const id = `diary-${repo}`
            const folio = String(index + 1).padStart(2, '0')
            return (
              <Fragment key={repo}>
                <input className={styles.choice} id={id} type="radio" name="project-diary" defaultChecked={index === 0} aria-controls={`${id}-page`} />
                <label className={styles.ribbon} htmlFor={id}>
                  <span aria-hidden="true">{folio}</span>{title}
                </label>
                <article className={styles.leaf} id={`${id}-page`} aria-labelledby={`${id}-title`}>
                  <div className={styles.folio}><span>{topic}</span><span>{folio} / 05</span></div>
                  <div className={styles.inscription}><Icon size={26} strokeWidth={1.4} aria-hidden="true" /><h3 id={`${id}-title`}>{title}</h3></div>
                  <p className={styles.headline}>{headline}</p>
                  <p className={styles.body}>{body}</p>
                  <aside className={styles.note}><strong>Engineering note</strong><p>{note}</p></aside>
                  <a className={styles.source} href={`https://github.com/pjha26/${repo}#readme`}>Read the README <ArrowUpRight size={16} aria-hidden="true" /></a>
                </article>
              </Fragment>
            )
          })}
        </fieldset>
      </div>
    </section>
  )
}
